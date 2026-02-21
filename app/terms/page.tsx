export const metadata = {
  title: "Terms of Service | BillSmart",
  description: "Terms of Service for using BillSmart.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Terms of Service</h1>

      <p>
        BillSmart is provided “as is” for informational purposes. You are responsible
        for verifying calculations and results before making payments.
      </p>

      <h2 className="text-xl font-semibold">No warranties</h2>
      <p>
        We make no guarantees about accuracy, availability, or fitness for a particular
        purpose.
      </p>

      <h2 className="text-xl font-semibold">Limitation of liability</h2>
      <p>
        BillSmart is not liable for any loss or damages arising from use of this tool.
      </p>

      <h2 className="text-xl font-semibold">Contact</h2>
      <p>
        If you have questions, add a contact method on your site (e.g., an email address)
        and link it here.
      </p>
    </main>
  );
}