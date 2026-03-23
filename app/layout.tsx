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
  other: {
    "monetag" : "2eb2d660667a4d2aece6dc3bf3083799",
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
        <Script
          src="https://nap5k.com/tag.min.js"
          data-zone="10767896"
          strategy="lazyOnload" 
        />
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=10767892"
          data-cfasync="false"
          strategy="lazyOnload" 
        />
        <Navbar />
        <main className="siteMain">{children}</main>
      </body>
    </html>
  );
}