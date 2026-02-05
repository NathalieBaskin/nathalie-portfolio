"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { r2 } from "../lib/media";

export default function PhotoPage() {
  const { t } = useLanguage();

  const categories = [
    {
      id: "photo-wedding",
      slug: "brollop-och-forlovning",
      cover: r2("/fotografi/brollop-och-forlovning/Luisa och Muslim/13.jpg"),
      title: t("photo.categories.wedding"),
      caption: t("photo.categoryCaptions.wedding"),
    },
    {
      id: "photo-children",
      slug: "barn",
      cover: r2("/fotografi/barn/cover.barn.jpg"),
      title: t("photo.categories.children"),
      caption: t("photo.categoryCaptions.children"),
    },
    {
      id: "photo-family",
      slug: "familj",
      cover: r2("/fotografi/familj/Isabelle och Joakim/Bella-22.jpg"),
      title: t("photo.categories.family"),
      caption: t("photo.categoryCaptions.family"),
    },
    {
      id: "photo-model",
      slug: "modell",
      cover: r2("/fotografi/modell/Cassie och Sofia/sofia.jpg"),
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
              <Link
                key={category.id}
                id={category.id}
                href={`/photo/${category.slug}`}
                className="group block space-y-3 scroll-mt-36"
                aria-label={category.title}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                  {category.cover ? (
                    <Image
                      src={category.cover}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                      {t("home.photoLabel")}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section id="photo-prices" className="mt-16 scroll-mt-36">
          <h2 className="text-2xl font-bold mb-2">{t("photo.pricesTitle")}</h2>
          <p className="text-white/70">{t("photo.pricesIntro")}</p>
          <p className="mt-4 text-white/70">{t("photo.pricesNote")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={`price-${category.id}`}
                href={`/photo/${category.slug}#category-prices`}
                className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-white/50 hover:text-white"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
