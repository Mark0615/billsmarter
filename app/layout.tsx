import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9974301999021865"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <main className="siteMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
