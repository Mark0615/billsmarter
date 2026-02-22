import Link from "next/link";

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="siteHeader">
      <nav className="siteNav">
        <Link href="/" className="brand">
          BillSmart
        </Link>
        <div className="navLinks">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
