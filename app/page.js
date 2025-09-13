export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hej, jag heter <span className="text-indigo-400">Nathalie</span> 👋
      </h1>
      <p className="text-lg text-slate-300 max-w-xl text-center">
        Jag är en frontend-utvecklare som bygger moderna och responsiva webbappar 
        med React, Next.js och Tailwind CSS.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com/ditt-github"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-200"
        >
          GitHub
        </a>
        <a
          href="mailto:dinmail@example.com"
          className="px-4 py-2 rounded-lg border border-slate-700 font-medium hover:bg-slate-900"
        >
          Kontakt
        </a>
      </div>
    </main>
  );
}
