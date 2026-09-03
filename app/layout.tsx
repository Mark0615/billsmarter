import type { Metadata } from "next";
import { Doto, Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Container ID is public (it ships in the page source), so it lives here as the
// default. Set NEXT_PUBLIC_GTM_ID to point a preview deploy at another container.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-PK4CMHRF";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const doto = Doto({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-doto",
});

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Plain <script>, not next/script: React hoists this into the static
          <head> so it is present in the server-rendered HTML immediately —
          required for AdSense's "AdSense code snippet" site-ownership check
          and for crawlers that don't wait on hydration. next/script's
          afterInteractive strategy only injects it client-side post-hydrate.
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9974301999021865"
          crossOrigin="anonymous"
        />
      </head>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body className={`${inter.variable} ${doto.variable}`}>
        <Navbar />
        <main className="siteMain">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
