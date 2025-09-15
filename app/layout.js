// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Nathalie Baskin – Frontend Developer",
  description:
    "Portfolio av Nathalie Baskin: projekt, tekniker och kontakt. Frontendutvecklare med fokus på React, Next.js och modern webbutveckling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" className="scroll-smooth scroll-pt-14">
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden">
        {/* Fixed navbar (56px hög = h-14) */}
        <nav className="fixed inset-x-0 top-0 h-14 bg-black text-white px-6 flex items-center justify-between shadow-md z-50">
          <div className="font-bold text-lg">Nathalie</div>
          <ul className="flex gap-6 text-sm">
            <li>
              <a href="#projects" className="hover:text-indigo-400">
                Projekt
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-400">
                Om mig
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400">
                Kontakt
              </a>
            </li>
          </ul>
        </nav>

        {/* Starta innehållet direkt under navbaren */}
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
