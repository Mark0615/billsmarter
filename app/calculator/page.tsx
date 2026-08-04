import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "BillSmart Calculator | Split travel expenses",
  description:
    "Split group expenses fairly with multi-beneficiary payments and optional FX display.",
  // The homepage renders the same calculator, so this route points at it
  // instead of competing with it as duplicate content.
  alternates: { canonical: "/" },
};

export default function Page() {
  return <CalculatorClient />;
}
