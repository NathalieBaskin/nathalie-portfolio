"use client";

import { useLanguage } from "./components/LanguageProvider";
import { r2 } from "./lib/media";

export default function Home() {
  const { t } = useLanguage();
  const heroVersion = "v3";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative mt-0 pt-0 pb-0 px-0 overflow-x-hidden">
        <div
          className="
            hero-frame relative ml-auto
            w-screen max-w-none
            md:w-full md:max-w-[1000px]
            lg:max-w-[1600px]
            xl:max-w-[1800px]
            2xl:max-w-[2000px]
          "
        >
          <div className="hero-split">
            <div className="hero-left">
              <img
                src={r2(`/hero.left.png?${heroVersion}`)}
                alt="Hero left"
                className="hero-img hero-img-left"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="hero-right">
              <img
                src={r2(`/hero.right.jpg?${heroVersion}`)}
                alt="Hero right"
                className="hero-img hero-img-right"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
            {t("home.welcomeTitle")}
          </h1>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>{t("home.aboutIntro")}</p>
            <p>{t("home.aboutP1")}</p>
            <p>{t("home.aboutP2")}</p>
            <p>{t("home.aboutContact")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
