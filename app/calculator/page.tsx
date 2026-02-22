import CalculatorClient from "./CalculatorClient";

export const metadata = {
  title: "BillSmart Calculator | Split travel expenses",
  description: "Split group expenses fairly with multi-beneficiary payments and optional FX display.",
};

export default function Page() {
  return <CalculatorClient />;
}