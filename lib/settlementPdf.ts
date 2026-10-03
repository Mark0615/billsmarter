import type { Payment, Person } from "./bills";
import { describeRate, formatMoney } from "./bills";

type Transfer = { fromId: string; toId: string; amt: number };
type Report = {
  people: Person[];
  payments: Payment[];
  currency: string;
  transfers: Transfer[];
};

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

function text(parent: HTMLElement, value: string, style: Partial<CSSStyleDeclaration> = {}) {
  const node = document.createElement("div");
  node.textContent = value;
  Object.assign(node.style, style);
  parent.appendChild(node);
  return node;
}

function page(title: string, subtitle: string) {
  const node = document.createElement("div");
  Object.assign(node.style, {
    width: `${PAGE_WIDTH}px`,
    height: `${PAGE_HEIGHT}px`,
    boxSizing: "border-box",
    padding: "46px 52px",
    background: "#ffffff",
    color: "#202b2b",
    fontFamily: 'Arial, "PingFang TC", "Noto Sans CJK TC", sans-serif',
    fontSize: "14px",
    lineHeight: "1.5",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "-1",
    pointerEvents: "none",
  } satisfies Partial<CSSStyleDeclaration>);
  text(node, "BILLSMART / SETTLEMENT RECORD", {
    color: "#637675", fontSize: "12px", fontWeight: "700", letterSpacing: "1px",
  });
  text(node, title, { fontSize: "28px", fontWeight: "700", marginTop: "14px", overflowWrap: "anywhere" });
  text(node, subtitle, { color: "#526261", fontSize: "13px", marginTop: "5px" });
  const rule = document.createElement("hr");
  Object.assign(rule.style, { border: "0", borderTop: "1px solid #ccd5d2", margin: "22px 0" });
  node.appendChild(rule);
  document.body.appendChild(node);
  return node;
}

function chunks(value: string, size: number) {
  const parts: string[] = [];
  for (const line of value.split(/\r?\n/)) {
    const chars = Array.from(line);
    if (!chars.length) parts.push("");
    for (let index = 0; index < chars.length; index += size) {
      parts.push(chars.slice(index, index + size).join(""));
    }
  }
  return parts;
}

export async function createSettlementPdf(report: Report): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const documentPdf = new jsPDF({ orientation: "portrait", unit: "px", format: [PAGE_WIDTH, PAGE_HEIGHT], hotfixes: ["px_scaling"] });
  const money = (value: number, currency: string) => `${currency} ${formatMoney(value, currency)}`;
  const name = (id: string) => {
    const index = report.people.findIndex((person) => person.id === id);
    if (index < 0) return "Unknown person";
    const person = report.people[index];
    return report.people.filter((other) => other.name.trim().toLocaleLowerCase() === person.name.trim().toLocaleLowerCase()).length > 1
      ? `${person.name} (#${index + 1})`
      : person.name;
  };
  const date = new Date().toLocaleDateString("en-CA");
  const pages: HTMLElement[] = [];
  const contentBottom = (node: HTMLElement) => {
    const children = Array.from(node.children) as HTMLElement[];
    const last = children.filter(child => getComputedStyle(child).position !== "absolute").at(-1);
    return last ? last.getBoundingClientRect().bottom - node.getBoundingClientRect().top : 0;
  };

  async function addPage(node: HTMLElement, index: number, totalPages: number) {
    text(node, `Page ${index + 1} of ${totalPages}`, {
      position: "absolute", right: "52px", bottom: "38px", fontSize: "11px", color: "#637675",
    });
    await document.fonts.ready;
    const canvas = await html2canvas(node, {
      backgroundColor: "#ffffff", scale: 2, useCORS: false, logging: false,
      width: PAGE_WIDTH, height: PAGE_HEIGHT, scrollX: 0, scrollY: 0,
    });
    if (index > 0) documentPdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    documentPdf.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  }

  let current: HTMLElement;
  let currentTitle = "Payment details";
  const newPage = (title: string) => {
    currentTitle = title;
    current = page(title, `${date}  |  Settlement currency: ${report.currency}`);
    pages.push(current);
  };
  const append = (value: string, style: Partial<CSSStyleDeclaration> = {}) => {
    const block = text(current, value, {
      marginBottom: "10px", overflowWrap: "anywhere", whiteSpace: "pre-wrap", ...style,
    });
    if (contentBottom(current) > PAGE_HEIGHT - 68) {
      block.remove();
      newPage(currentTitle);
      current.appendChild(block);
    }
  };

  try {
    newPage("Payment details");
    for (const [index, payment] of report.payments.entries()) {
      append(`Payment ${index + 1} of ${report.payments.length}: ${name(payment.payerId)} paid ${money(payment.amount, payment.currency)}`, {
        fontSize: "16px", fontWeight: "700", marginTop: "18px", marginBottom: "5px",
      });
      for (const [part, value] of chunks(payment.beneficiaryIds.map(name).join(", "), 150).entries()) {
        append(`${part ? "For (continued)" : "For"}: ${value}`);
      }
      append(`Counted as: ${money(payment.baseAmount, report.currency)}`);
      const rate = describeRate(payment);
      if (rate) append(rate, { color: "#526261", fontSize: "12px" });
      for (const [part, value] of chunks(payment.note ?? "", 150).entries()) {
        if (value) append(`${part ? "Note (continued)" : "Note"}: ${value}`, { color: "#526261" });
      }
    }

    newPage("Settlement record");
    append("Who pays whom", { fontSize: "21px", fontWeight: "700", marginTop: "18px" });
    append(`${report.people.length} people  |  ${report.payments.length} payments`, { marginBottom: "22px" });
    if (report.transfers.length === 0) {
      append("All settled. No transfers needed.", { fontSize: "18px", fontWeight: "700" });
    } else {
      for (const transfer of report.transfers) {
        append(`${name(transfer.fromId)} pays ${name(transfer.toId)}  —  ${money(transfer.amt, report.currency)}`, {
          fontSize: "16px", padding: "10px 0", borderBottom: "1px solid #e0e6e3",
        });
      }
    }
    append("Each payment was shared equally among the people listed for it. Rounding remainders follow the people list. Check the final amounts before transferring money.", {
      color: "#526261", marginTop: "28px", fontSize: "12px",
    });
    // html2canvas can crop later pages when several absolute-positioned page
    // elements overlap in the document. Render one attached page at a time.
    for (const node of pages) node.remove();
    for (const [index, node] of pages.entries()) {
      document.body.appendChild(node);
      await addPage(node, index, pages.length);
      node.remove();
    }
    return documentPdf.output("blob");
  } finally {
    for (const node of pages) node.remove();
  }
}
