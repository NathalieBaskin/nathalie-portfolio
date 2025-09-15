// app/code/portfolio/page.js
export const metadata = {
  title: "Portfolio | Nathalie",
  description: "Utvalda kodvideor av Nathalie.",
};

// Redigera titlar & beskrivningar här
const videos = [
  {
    src: "/videos/javascript-1.mp4",
    title: "Freaky Fashion",
    caption:
      "JavaScript 1. Webshop byggd i ren JavaScript med SQLite3 som databas.",
  },
  {
    src: "/videos/agila.mp4",
    title: "BLITZ",
    caption:
      "Agila projektmetoder / UX & UI. Grupprojekt: väderapp i ren JavaScript med SQLite3; exponerar ett REST-API (lista/hämta/skapa/radera) och hämtar data från extern väder-API.",
  },
  {
    src: "/videos/javascript-2.mp4",
    title: "NABASKI",
    caption:
      "JavaScript 2. Eget projekt: portfolio byggt i React med bokningssystem, kopplat till SQLite3.",
  },
  {
    src: "/videos/javascript-3.mp4",
    title: "Derma Nordic Med Spa",
    caption:
      "JavaScript 3. SPA för en spa-klinik byggt i Angular (TypeScript) med bokningssystem och webbshop, kopplat till SQLite3.",
  },
  {
    src: "/videos/backend-ett.mp4",
    title: "RIFTHUB",
    caption:
      "Backend 1. Socialt community byggt i React med SQLite3 (relationsdatabas) och Tailwind: användarhantering (skapa/uppdatera/radera), in-/utloggning, vänner, chatt, forum, livestreaming och adminpanel.",
  },
];

export default function CodePortfolioPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Portfolio</h1>
      <p className="text-slate-600 mb-8">
       Projekt från skolarbeten.
      </p>

      {/* 1 kolumn på mobil/iPad, 2 kolumner på större skärmar */}
      <ul className="grid gap-8 lg:grid-cols-2">
        {videos.map((v) => (
          <li
            key={v.src}
            className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Videoyta */}
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-100">
              <video
                className="h-full w-full"
                controls
                preload="metadata"
                playsInline
              >
                <source src={v.src} type="video/mp4" />
                Din webbläsare kan tyvärr inte spela upp videon.
              </video>
            </div>

            {/* Titel (svart) och beskrivning (mer plats, bättre läsbarhet) */}
            <h3 className="mt-4 text-2xl font-bold text-black">{v.title}</h3>
            {v.caption && (
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {v.caption}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
