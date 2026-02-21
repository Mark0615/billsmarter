export const metadata = {
  title: "Contact | BillSmart",
  description: "Contact BillSmart for feedback, issues, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>

      <p>
        Have feedback or found a bug? Reach out and we’ll do our best to help.
      </p>

      <div className="rounded-xl border p-4 space-y-2">
        <p className="font-semibold">Email</p>
        <p>
          {/* TODO: 換成你的信箱 */}
          <a className="underline" href="mailto:hello@yourdomain.com">
            hello@yourdomain.com
          </a>
        </p>
      </div>

      <p className="text-sm opacity-80">
        Note: Please avoid sharing sensitive personal information.
      </p>
    </main>
  );
}