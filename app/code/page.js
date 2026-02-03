"use client";

import { useLanguage } from "../components/LanguageProvider";
import { r2 } from "../lib/media";

export default function CodePage() {
  const { t } = useLanguage();

  const projects = [
    {
      src: r2("/videos/javascript-1.mp4"),
      title: "Freaky Fashion",
      caption: t("projects.freaky"),
    },
    {
      src: r2("/videos/agila.mp4"),
      title: "BLITZ",
      caption: t("projects.blitz"),
    },
    {
      src: r2("/videos/javascript-2.mp4"),
      title: "NABASKI",
      caption: t("projects.nabaski"),
    },
    {
      src: r2("/videos/javascript-3.mp4"),
      title: "Derma Nordic Med Spa",
      caption: t("projects.derma"),
    },
    {
      src: r2("/videos/backend-ett.mp4"),
      title: "RIFTHUB",
      caption: t("projects.rifthub"),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section id="code-portfolio" className="scroll-mt-36">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {t("code.pageTitle")}
          </h1>
          <h2 className="text-2xl font-bold mb-2">
            {t("code.portfolioTitle")}
          </h2>
          <p className="text-white/70 mb-8">{t("code.portfolioIntro")}</p>

          <ul className="grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <li
                key={project.src}
                className="rounded-2xl border border-white/10 p-6 bg-white/5 shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <video
                    className="h-full w-full"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={project.src} type="video/mp4" />
                    {t("common.videoFallback")}
                  </video>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/70">
                  {project.caption}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
