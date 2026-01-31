"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function PhotoPage() {
  const { t } = useLanguage();

  const categories = [
    {
      id: "photo-wedding",
      title: t("photo.categories.wedding"),
      caption: t("photo.categoryCaptions.wedding"),
    },
    {
      id: "photo-children",
      title: t("photo.categories.children"),
      caption: t("photo.categoryCaptions.children"),
    },
    {
      id: "photo-event",
      title: t("photo.categories.event"),
      caption: t("photo.categoryCaptions.event"),
    },
    {
      id: "photo-model",
      title: t("photo.categories.model"),
      caption: t("photo.categoryCaptions.model"),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <section id="photo-portfolio" className="scroll-mt-36">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            {t("photo.pageTitle")}
          </h1>
          <h2 className="text-2xl font-bold mb-2">
            {t("photo.portfolioTitle")}
          </h2>
          <p className="text-white/70">{t("photo.portfolioIntro")}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article
                key={category.id}
                id={category.id}
                className="space-y-3 scroll-mt-36"
              >
                <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {t("home.photoLabel")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {category.caption}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="photo-prices" className="mt-16 scroll-mt-36">
          <h2 className="text-2xl font-bold mb-2">{t("photo.pricesTitle")}</h2>
          <p className="text-white/70">{t("photo.pricesIntro")}</p>
          <p className="mt-4 text-white/70">{t("photo.pricesNote")}</p>
        </section>
      </div>
    </main>
  );
}
