export const metadata = {
  title: "Photo – Kontakt | Nathalie",
  description: "Kontakta Nathalie för fotojobb."
};

export default function PhotoContactPage() {
  const EMAIL = "photo@example.com"; // <-- byt till din adress
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Photo – Kontakt</h1>
      <p className="text-slate-600 mb-6">
        Maila mig så återkommer jag snarast.
      </p>
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent("Förfrågan – Foto")}`}
        className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-800"
      >
        Skicka e-post
      </a>
    </main>
  );
}
