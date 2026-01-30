export const metadata = {
  title: "Photo – Kontakt | Nathalie",
  description: "Kontakta Nathalie för fotojobb.",
};

export default function PhotoContactPage() {
  const EMAIL = "namahka@hotmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/namahka/";

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Kontakt</h1>

      {/* Kort med e-post */}
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent("Förfrågan – Foto")}`}
        className="group block rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition"
        aria-label={`Skicka e-post till ${EMAIL}`}
      >
        <div className="flex items-center gap-4">
          <MailIcon className="h-8 w-8 text-black group-hover:opacity-80" />
          <div>
            <div className="text-sm text-slate-500">E-post</div>
            <div className="font-semibold text-black">{EMAIL}</div>
          </div>
        </div>
      </a>

      {/* Ikon för Instagram */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-sm">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition"
          aria-label="Öppna Instagram i ny flik"
        >
          <InstagramIcon className="h-7 w-7 text-black group-hover:opacity-80" />
          <span className="font-medium text-black">Instagram @namahka</span>
        </a>
      </div>
    </main>
  );
}

/* --------- Ikoner (inline SVG – inga extra paket behövs) --------- */
function MailIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M22 8l-9.2 6.9a2 2 0 0 1-1.6 0L2 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
