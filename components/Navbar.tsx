"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "/", label: "Calculator" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {setMobileOpen(false);toggleRef.current?.focus();}
      if (event.key === "Tab") {
        const nodes = panelRef.current?.querySelectorAll<HTMLElement>("a,button");
        if (!nodes?.length) return;
        const first=nodes[0],last=nodes[nodes.length-1];
        if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
      }
    };
    document.addEventListener("keydown",keydown);
    return ()=>document.removeEventListener("keydown",keydown);
  },[mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <Link href="/" className="brand" aria-label="BillSmart home">
            <span className="brandText">BillSmart</span>
          </Link>

          <nav className="navLinks" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? "isActive" : undefined}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="mobileToggle"
            ref={toggleRef}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <List size={22} weight="light" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div 
        className={`mobileBackdrop${mobileOpen ? " isOpen" : ""}`} 
        onClick={() => setMobileOpen(false)}
      />

      <aside
        id="mobile-nav-panel"
        ref={panelRef}
        inert={!mobileOpen}
        className={`mobilePanel${mobileOpen ? " isOpen" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobilePanelHead">
          <button
            type="button"
            className="mobileClose"
            aria-label="Close navigation"
            onClick={() => {setMobileOpen(false);toggleRef.current?.focus();}}
          >
            <X size={22} weight="light" aria-hidden="true" />
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
