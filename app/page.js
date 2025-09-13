import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO – bilden lämnas exakt där den är */}
      <section className="relative flex items-center justify-center px-4 md:px-6 pt-0 pb-10 -mt-2 md:-mt-100">
        {/* Wrapper runt bild + texter (så texter följer bilden) */}
        <div className="relative mx-auto w-full max-w-[95vw] md:max-w-[1600px] translate-x-4 md:translate-x-10">
          {/* Bild (oförändrad position) */}
          <Image
            src="/hero.png"
            alt="Nathalie photographer and coder"
            width={1600}
            height={800}
            className="w-full rounded-lg"
            sizes="(min-width: 768px) 1600px, 95vw"
            priority
          />

          {/* Vänster text – MITTEN av bilden, lite längre ner */}
          <h1 className="hidden md:block absolute right-[1005px] top-[70%] -translate-y-1/2 translate-y-6 text-3xl font-extrabold text-black z-10 select-none">
            photographer
          </h1>

          {/* Höger text – flyttad in mot mitten + lite längre ner */}
          <h1 className="hidden md:block absolute right-[110px] top-[69%] -translate-y-1/2 translate-y-6 text-3xl font-extrabold text-black z-10 select-none">
            &lt;coder&gt;
          </h1>
        </div>

        {/* Mobil: texter under bilden */}
        <div className="md:hidden flex flex-col items-center gap-2 mt-4">
          <h1 className="text-2xl font-bold text-black">photographer</h1>
          <h1 className="text-2xl font-bold text-black">&lt;coder&gt;</h1>
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
