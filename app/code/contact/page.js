// app/code/contact/page.js
export const metadata = {
  title: "Kontakt | Nathalie",
  description: "Kontakta Nathalie för frontend-utveckling.",
};

// ⇣ BYT TILL DINA UPPGIFTER ⇣
const EMAIL = "namahka@hotmail.com";
const GITHUB_URL = "https://github.com/NathalieBaskin";
const LINKEDIN_URL = "https://www.linkedin.com/in/nathalie-baskin-b61790193/";
// ⇡ BYT TILL DINA UPPGIFTER ⇡

export default function CodeContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Kontakt</h1>

      {/* Kort med e-post */}
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent("Förfrågan – Frontend")}`}
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

      {/* Ikoner för sociala länkar */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-sm">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition"
          aria-label="Öppna GitHub i ny flik"
        >
          <GitHubIcon className="h-7 w-7 text-black group-hover:opacity-80" />
          <span className="font-medium text-black">GitHub</span>
        </a>

        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition"
          aria-label="Öppna LinkedIn i ny flik"
        >
          <LinkedInIcon className="h-7 w-7 text-black group-hover:opacity-80" />
          <span className="font-medium text-black">LinkedIn</span>
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

function GitHubIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* GitHub “mark” */}
      <path d="M12 .297C5.37.297 0 5.67 0 12.3c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.41 3-.4 1.02 0 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63.297 12 .297z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LinkedIn logo */}
      <path d="M22.23 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.46c.97 0 1.77-.78 1.77-1.74V1.74C24 .78 23.2 0 22.23 0zM7.06 20.45H3.56v-11h3.5v11zM5.31 7.43a2.03 2.03 0 110-4.06 2.03 2.03 0 010 4.06zM20.45 20.45h-3.49v-5.36c0-1.28-.02-2.93-1.79-2.93-1.8 0-2.07 1.4-2.07 2.84v5.45h-3.5v-11h3.36v1.5h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.2 2.33 4.2 5.35v5.98z" />
    </svg>
  );
}
