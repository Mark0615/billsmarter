import Link from "next/link";

const productLinks = [
  { href: "/", label: "Calculator" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
];

const readingLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/blog/how-to-split-group-expense-fairly", label: "Splitting expenses fairly" },
  { href: "/blog/cash-vs-card-payments-when-traveling", label: "Cash vs. card abroad" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <div className="siteFooterBrand">
          <p className="siteFooterName">BillSmart</p>
          <p className="siteFooterBlurb">
            A free, no-signup calculator for splitting group expenses across multiple
            currencies — and guides on doing it without awkwardness.
          </p>
        </div>

        <nav className="siteFooterNav" aria-label="Footer">
          <div>
            <p className="siteFooterHeading">Product</p>
            <ul>
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="siteFooterHeading">Guides</p>
            <ul>
              {readingLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="siteFooterHeading">Site</p>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="siteFooterBase">
        <p>© {new Date().getFullYear()} BillSmart</p>
        <p>
          Results are suggestions, not financial advice. Always confirm amounts before
          transferring money.
        </p>
      </div>
    </footer>
  );
}
