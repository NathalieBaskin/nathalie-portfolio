import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO – desktop-position behålls; mobil: bara bild; iPad fixar vi höjden */}
      <section className="relative px-4 md:px-6 pt-0 pb-10 -mt-2 md:-mt-[40px] lg:-mt-[100px] overflow-x-hidden">
        {/* Wrapper runt bild + texter (så texter följer bilden) */}
        <div className="relative mx-auto w-full max-w-[100vw] md:max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2000px] translate-x-4 md:translate-x-10">
          {/* Bild (oförändrad desktop-position) */}
          <Image
            src="/hero.png"
            alt="Nathalie photographer and coder"
            width={1600}
            height={800}
            className="w-full rounded-lg"
            sizes="(min-width:1536px) 2000px, (min-width:1280px) 1800px, (min-width:1024px) 1600px, (min-width:768px) 90vw, 100vw"
            priority
          />

          {/* Vänster text – MITTEN av bilden. GÖMS på mobil, mindre på iPad, större på stora skärmar */}
          <h1
            className="
              hidden md:block absolute
              right-[1005px] top-[70%] -translate-y-1/2 translate-y-6
              text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl
              font-extrabold text-black z-10 select-none
            "
          >
            photographer
          </h1>

          {/* Höger text – flyttad in mot mitten (din siffra behålls), lika responsiva storlekar */}
          <h1
            className="
              hidden md:block absolute
              right-[110px] top-[69%] -translate-y-1/2 translate-y-6
              text-2xl lg:text-3xl xl:text-5xl 2xl:text-6xl
              font-extrabold text-black z-10 select-none
            "
          >
            &lt;coder&gt;
          </h1>
        </div>

        {/* Mobil: visa bara bilden (inga texter) */}
        {/* (Med hidden md:block på texterna ovan visas de inte på mobil) */}
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
