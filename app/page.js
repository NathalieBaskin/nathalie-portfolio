import Image from "next/image";

// Data till "Senaste projekt"
const latestProjects = [
  {
    src: "/videos/backend-ett.mp4",
    title: "RIFTHUB",
    caption:
      "Backend 1. Socialt community byggt i React med SQLite3 (relationsdatabas) och Tailwind: användarhantering (skapa/uppdatera/radera), in-/utloggning, vänner, chatt, forum, livestreaming och adminpanel.",
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
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      {/* -mt-[46px] + pt-[10px] = ~10px under navbar (om nav-höjd ≈ 56px / h-14) */}
      <section className="relative mt-[14px] pt-[56px] pb-8 px-0 overflow-x-hidden">
        {/* Bild-wrapper: högerställd (ml-auto) så bordet nuddar högerkanten.
           Mobil: full-bleed (w-screen), iPad: mindre, desktop/monitor: större */}
        <div
          className="
            relative ml-auto
            w-screen max-w-none
            md:w-full md:max-w-[1000px]
            lg:max-w-[1600px]
            xl:max-w-[1800px]
            2xl:max-w-[2000px]
          "
        >
          {/* Bilden – vi rör inte dess vertikala position, bara storlek per breakpoint */}
          <Image
            src="/hero.png"
            alt="Nathalie photographer and coder"
            width={2000}
            height={1000}
            priority
            className="
    w-full
    h-[25vh]        /* 📱 Mobil: större hero-bild */
    sm:h-auto       /* 💻 iPad & uppåt: normal auto-höjd */
    object-cover    /* beskär kanter snyggt */
  "
            sizes="(min-width:1536px) 2000px, (min-width:1280px) 1800px, (min-width:1024px) 1600px, (min-width:768px) 1000px, 100vw"
          />

          {/* TEXTER – alltid mitt i bildens höjd, med trygg inre marginal */}
          {/* Visa från iPad (md) och uppåt; göm på mobil */}
          {/* Vänster */}
          <div className="hidden md:flex absolute inset-y-0 left-0 items-center pointer-events-none">
            <h1
              className="
                font-extrabold text-black leading-none
                text-[clamp(22px,2.4vw,56px)]
                ml-10 lg:ml-16        /* INRE marginal från vänster kant av bilden */
              "
            >
              photographer
            </h1>
          </div>

          {/* Höger */}
          <div className="hidden md:flex absolute inset-y-0 right-0 items-center pointer-events-none">
            <h1
              className="
                font-extrabold text-black leading-none
                text-[clamp(22px,2.4vw,56px)]
                mr-10 lg:mr-20        /* INRE marginal från höger kant av bilden */
              "
            >
              &lt;coder&gt;
            </h1>
          </div>
        </div>
      </section>

      {/* Senaste projekt */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
          Senaste projekt
        </h2>

        {/* Grid: 1 kolumn på mobil, 3 kolumner från iPad och uppåt */}
        <ul className="grid gap-8 md:grid-cols-3">
          {latestProjects.map((p) => (
            <li
              key={p.src}
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
                  <source src={p.src} type="video/mp4" />
                  Din webbläsare kan tyvärr inte spela upp videon.
                </video>
              </div>

              {/* Titel + text */}
              <h3 className="mt-4 text-xl font-bold text-black">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.caption}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
