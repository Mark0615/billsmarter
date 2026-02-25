"use client";

import Link from "next/link";
import { Rajdhani } from "next/font/google";
import { useState } from "react";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["700"],
});

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <Link href="/" className="brand" aria-label="BillSmart home">
            <span className={`${rajdhani.className} brandText`}>BillSmart</span>
          </Link>

          <nav className="navLinks" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="mobileToggle"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="mobileToggleBars" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* 關鍵修正 1：將遮罩與側邊欄移出 header 外，避免受 backdrop-filter 影響 */}
      <div 
        className={`mobileBackdrop${mobileOpen ? " isOpen" : ""}`} 
        onClick={() => setMobileOpen(false)} // 點擊旁邊黑色遮罩也能關閉
      />

      <aside
        id="mobile-nav-panel"
        className={`mobilePanel${mobileOpen ? " isOpen" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobilePanelHead">
          <button
            type="button"
            className="mobileClose"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="mobileNavLinks" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}