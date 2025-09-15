// app/layout.js
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Nathalie Baskin – Frontend Developer",
  description:
    "Portfolio av Nathalie Baskin: projekt, tekniker och kontakt. Frontendutvecklare med fokus på React, Next.js och modern webbutveckling.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" className="scroll-smooth scroll-pt-14">
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden">
        {/* Split Navbar med icons från /public */}
        <nav className="fixed inset-x-0 top-0 h-14 bg-black text-white shadow-md z-50">
          <div className="relative mx-auto h-full flex items-center justify-between px-3 sm:px-6">
            {/* Vänster halva (Photo) */}
            <div className="flex w-1/2 items-center gap-3 pr-3 sm:gap-4 sm:pr-6">
              <Image
                src="/camera-icon.png"
                alt="Photo icon"
                width={32}
                height={32}
                className="h-8 w-8 md:h-8 md:w-8 object-contain"
                priority
              />
              <div className="ml-auto flex items-center gap-4 sm:gap-6 whitespace-nowrap">
                <Link href="/photo/portfolio" className="hover:text-indigo-400">
                  Portfolio
                </Link>
                <Link href="/photo/contact" className="hover:text-indigo-400">
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Mitt-ikon (ersätter strecket) */}
            <Image
              src="/middle-icon.png"
              alt=""
              width={28}
              height={28}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 md:h-7 md:w-7 object-contain pointer-events-none"
              priority
            />

            {/* Höger halva (Code) */}
            <div className="flex w-1/2 items-center gap-3 pl-3 sm:gap-4 sm:pl-6">
              <div className="mr-auto flex items-center gap-4 sm:gap-6 whitespace-nowrap">
                <Link href="/code/portfolio" className="hover:text-indigo-400">
                  Portfolio
                </Link>
                <Link href="/code/contact" className="hover:text-indigo-400">
                  Kontakt
                </Link>
              </div>
              <Image
                src="/code-icon.png"
                alt="Code icon"
                width={28}
                height={28}
                className="h-6 w-6 md:h-7 md:w-7 object-contain"
                priority
              />
            </div>
          </div>
        </nav>

        {/* Innehåll under navbaren (56px = h-14) */}
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
