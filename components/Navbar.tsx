import Link from "next/link";

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="nav">
      <div className="navInner">
        <Link href="/" className="brand" aria-label="BillSmart home">
          <span className="brandText">BillSmart</span>
        </Link>

        <nav className="navLinks" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}