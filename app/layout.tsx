import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL("https://billsmarter.app"),
  title: {
    default: "BillSmart - The smartest split for any expense",
    template: "%s | BillSmart",
  },
  description:
    "BillSmart helps groups split expenses with live exchange rates, clear settlement results, and travel budgeting guides.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "https://cdn-icons-png.flaticon.com/128/7839/7839025.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="siteMain">{children}</main>
      </body>
    </html>
  );
}
