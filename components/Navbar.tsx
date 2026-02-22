import Image from "next/image";
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
        <Link href="/" className="brandWrap" aria-label="BillSmart home">
          <Image src="https://cdn-icons-png.flaticon.com/128/7839/7839025.png" alt="BillSmart logo" width={34} height={34} className="brandLogo" unoptimized />
          <video
            className="brandMotion"
            src="https://cdn-icons-mp4.flaticon.com/512/19032/19032464.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <span className="brandText">BillSmart</span>
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
