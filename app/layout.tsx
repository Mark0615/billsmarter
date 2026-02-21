import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL("https://YOUR_DOMAIN.com"),
  title: {
    default: "BillSmart - Travel Expense Calculator",
    template: "%s | BillSmart",
  },
  description:
    "Split travel expenses fairly in seconds. Smart group expense settlement tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}