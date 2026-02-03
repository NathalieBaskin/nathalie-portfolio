import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata = {
  title: "Nathalie Baskin",
  description: "Portfolio by Nathalie Baskin: projects, photography, and contact.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth scroll-pt-36 sm:scroll-pt-24"
      data-scroll-behavior="smooth"
    >
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden">
        <LanguageProvider>
          <Navbar />
          <div className="pt-36 sm:pt-24">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
