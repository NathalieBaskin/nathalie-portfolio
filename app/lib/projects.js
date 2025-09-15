export const allProjects = [
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
  {
    src: "/videos/javascript-1.mp4",
    title: "Freaky Fashion",
    caption:
      "JavaScript 1. Webshop byggd i ren JavaScript med SQLite3 som databas.",
  },
  {
    src: "/videos/agila.mp4",
    title: "BLITZ",
    caption:
      "Agila projektmetoder / UX & UI. Grupprojekt: väderapp i ren JavaScript med SQLite3; exponerar ett REST-API och hämtar data från extern väder-API.",
  },
];

// Plocka ut de tre du vill visa på startsidan – i vald ordning
export const latestProjects = [
  "/videos/backend-ett.mp4",
  "/videos/javascript-2.mp4",
  "/videos/javascript-3.mp4",
].map((src) => allProjects.find((p) => p.src === src)).filter(Boolean);
