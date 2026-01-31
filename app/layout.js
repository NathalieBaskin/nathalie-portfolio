import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata = {
  title: "Nathalie Baskin - Photographer & Developer",
  description: "Portfolio by Nathalie Baskin: projects, photography, and contact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-36 sm:scroll-pt-24">
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <div className="pt-36 sm:pt-24">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
