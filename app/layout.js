export const metadata = {
  title: "Nathalie Baskin – Frontend Developer",
  description: "Portfolio av Nathalie Baskin: projekt, tekniker och kontakt. Frontendutvecklare med fokus på React, Next.js och modern webbutveckling.",
  openGraph: {
    title: "Nathalie Baskin – Frontend Developer",
    description: "Se mina projekt, tekniker och kontaktinformation. Portfolio byggd med Next.js och Tailwind CSS.",
    url: "https://nathalie-portfolio.vercel.app",
    siteName: "Nathalie Portfolio",
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
