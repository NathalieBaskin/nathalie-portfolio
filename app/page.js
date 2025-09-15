import Image from "next/image";

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
            className="w-full"
            sizes="(min-width:1536px) 2000px, (min-width:1280px) 1800px, (min-width:1024px) 1600px, (min-width:768px) 1000px, 100vw"
            priority
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

      {/* Projekt */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6">Projekt</h2>
        <p className="text-slate-600">Här kommer jag visa mina projekt (t.ex. RiftHub, portfolio, m.m.)</p>
      </section>

      {/* Om mig */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6">Om mig</h2>
        <p className="text-slate-600">
          Jag är en frontend-utvecklare som älskar att bygga moderna, responsiva webblösningar och experimentera med design.
        </p>
      </section>

      {/* Kontakt */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-16 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6">Kontakt</h2>
        <p className="text-slate-600">
          Maila mig på{" "}
          <a href="mailto:dinmail@example.com" className="underline text-indigo-500">dinmail@example.com</a>{" "}
          eller hitta mig på{" "}
          <a href="https://github.com/ditt-github" target="_blank" className="underline text-indigo-500">GitHub</a>.
        </p>
      </section>
    </main>
  );
}
