import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4 flex justify-between">
      <Link href="/" className="font-bold text-xl">
        BillSmart
      </Link>
      <div className="space-x-4">
        <Link href="/calculator">Calculator</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </nav>
  );
}