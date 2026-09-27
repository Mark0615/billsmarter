import type { Payment, Person } from "./bills";
import { formatMoney } from "./bills";

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
  const chars = Array.from(value);
  if (!chars.length) return [""];
  const parts: string[] = [];
  for (let index = 0; index < chars.length; index += size) {
    parts.push(chars.slice(index, index + size).join(""));
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
    return report.people.filter((other) => other.name === person.name).length > 1
      ? `${person.name} (#${index + 1})`
      : person.name;
  };
  const date = new Date().toLocaleDateString("en-CA");
  const notes: Array<{ payment: Payment; note: string; continuation: boolean }> = [];
  for (const payment of report.payments) {
    chunks(payment.note ?? "", 320).forEach((note, index) => notes.push({ payment, note, continuation: index > 0 }));
  }
  const batches: typeof notes[] = [];
  for (let index = 0; index < notes.length; index += 4) batches.push(notes.slice(index, index + 4));
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
      width: PAGE_WIDTH, height: PAGE_HEIGHT,
    });
    if (index > 0) documentPdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    documentPdf.addImage(canvas.toDataURL("image/jpeg", 0.9), "JPEG", 0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  }

  try {
  for (const [index, batch] of batches.entries()) {
    const node = page("Payment details", `${date}  |  Settlement currency: ${report.currency}`);
    text(node, `Payment entries ${index * 4 + 1}-${Math.min(index * 4 + batch.length, notes.length)}`, {
      fontSize: "17px", fontWeight: "700", marginBottom: "16px",
    });
    for (const { payment, note, continuation } of batch) {
      const card = document.createElement("div");
      Object.assign(card.style, {
        border: "1px solid #d6ddda", borderRadius: "9px", padding: "15px 17px",
        marginBottom: "12px", overflowWrap: "anywhere", breakInside: "avoid",
      });
      node.appendChild(card);
      text(card, continuation ? "Note (continued)" : `${name(payment.payerId)} paid ${money(payment.amount, payment.currency)}`, {
        fontWeight: "700", fontSize: "16px",
      });
      if (!continuation) {
        text(card, `For: ${payment.beneficiaryIds.map(name).join(", ")}`, { marginTop: "4px" });
        text(card, `Counted as: ${money(payment.baseAmount, report.currency)}`, { marginTop: "4px" });
      }
      if (note) text(card, `Note: ${note}`, { color: "#526261", marginTop: "7px", whiteSpace: "pre-wrap" });
    }
    pages.push(node);
    if (contentBottom(node) > PAGE_HEIGHT - 60) {
      throw new Error("A payment note is too long for the PDF page. Shorten the note and try again.");
    }
  }

  const settlement = document.createElement("section");
  Object.assign(settlement.style, { marginTop: "28px" });
  text(settlement, "Who pays whom", { fontSize: "21px", fontWeight: "700", marginBottom: "10px" });
  text(settlement, `${report.people.length} people  |  ${report.payments.length} payments`, {
    fontSize: "15px", marginBottom: "22px",
  });
  if (report.transfers.length === 0) {
    text(settlement, "All settled. No transfers needed.", { fontSize: "18px", fontWeight: "700" });
  } else {
    for (const transfer of report.transfers) {
      const row = document.createElement("div");
      Object.assign(row.style, {
        display: "flex", justifyContent: "space-between", gap: "20px",
        padding: "10px 0", borderBottom: "1px solid #e0e6e3", fontSize: "16px",
      });
      settlement.appendChild(row);
      text(row, `${name(transfer.fromId)} pays ${name(transfer.toId)}`);
      text(row, money(transfer.amt, report.currency), { fontWeight: "700", whiteSpace: "nowrap" });
    }
  }
  text(settlement, "Each payment was shared equally among the people listed for it. Rounding remainders follow the people list. Check the final amounts before transferring money.", {
    color: "#526261", marginTop: "28px", fontSize: "12px",
  });
  let lastPage = pages.at(-1);
  if (!lastPage) {
    lastPage = page("Settlement record", `${date}  |  Settlement currency: ${report.currency}`);
    pages.push(lastPage);
  }
  lastPage.appendChild(settlement);
  if (contentBottom(lastPage) > PAGE_HEIGHT - 60) {
    settlement.remove();
    const separate = page("Settlement record", `${date}  |  Settlement currency: ${report.currency}`);
    pages.push(separate);
    separate.appendChild(settlement);
    if (contentBottom(separate) > PAGE_HEIGHT - 60) {
      throw new Error("Settlement is too long for one PDF page.");
    }
  }
  for (const [index, node] of pages.entries()) {
    await addPage(node, index, pages.length);
  }
  return documentPdf.output("blob");
  } finally {
    for (const node of pages) node.remove();
  }
}
