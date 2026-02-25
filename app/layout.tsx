import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  metadataBase: new URL("https://billsmarter.app"),
  title: {
    default: "BillSmart - The Smartest Split For Any Expense",
    template: "%s | BillSmart",
  },
  description:
    "BillSmart helps groups split expenses with live exchange rates, clear settlement results, and travel budgeting guides.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9974301999021865"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="siteMain">{children}</main>
      </body>
    </html>
  );
}
