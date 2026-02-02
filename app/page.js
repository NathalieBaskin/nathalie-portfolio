"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  const latestDevProjects = [
    { src: "/videos/backend-ett.mp4", title: "RIFTHUB" },
    { src: "/videos/javascript-2.mp4", title: "NABASKI" },
    { src: "/videos/javascript-3.mp4", title: "Derma Nordic Med Spa" },
    { src: "/videos/javascript-1.mp4", title: "Freaky Fashion" },
  ];

  const latestPhotoProjects = [
    {
      key: "wedding",
      slug: "brollop-och-forlovning",
      cover: "/fotografi/brollop-och-forlovning/cover.brollop-och-forlovning.jpg",
      title: t("photo.categories.wedding"),
      caption: t("photo.categoryCaptions.wedding"),
    },
    {
      key: "children",
      slug: "barn",
      cover: "/fotografi/barn/cover.barn.jpg",
      title: t("photo.categories.children"),
      caption: t("photo.categoryCaptions.children"),
    },
    {
      key: "family",
      slug: "familj",
      cover: "/fotografi/familj/cover.familj.jpg",
      title: t("photo.categories.family"),
      caption: t("photo.categoryCaptions.family"),
    },
    {
      key: "model",
      slug: "modell",
      cover: "/fotografi/modell/cover.modell.jpg",
      title: t("photo.categories.model"),
      caption: t("photo.categoryCaptions.model"),
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative mt-[14px] pt-[56px] pb-0 px-0 overflow-x-hidden">
        <div
          className="
            relative ml-auto
            w-screen max-w-none
            md:w-full md:max-w-[1000px]
            lg:max-w-[1600px]
            xl:max-w-[1800px]
            2xl:max-w-[2000px]
          "
        >
          <Image
            src="/hero.png"
            alt={t("home.heroAlt")}
            width={2000}
            height={1000}
            priority
            className="
              w-full
              h-[25vh]
              sm:h-auto
              object-cover
            "
            sizes="(min-width:1536px) 2000px, (min-width:1280px) 1800px, (min-width:1024px) 1600px, (min-width:768px) 1000px, 100vw"
          />

     
          <div className="hidden md:flex absolute inset-y-0 left-0 items-center pointer-events-none">
            <h1
              className="
                font-extrabold text-black leading-none font-photo
                text-[clamp(26px,3.2vw,72px)]
                ml-16 lg:ml-28
              "
            >
              {t("home.photographer")}
            </h1>
          </div>

          {/* Right */}
          <div className="hidden md:flex absolute inset-y-0 right-0 items-center pointer-events-none">
            <h1
              className="
                font-extrabold text-black leading-none font-code
                text-[clamp(26px,3.2vw,72px)]
                mr-16 lg:mr-28
              "
            >
              {t("home.coder")}
            </h1>
          </div>
        </div>
      </section>

      {/* Latest projects */}
      <section className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
          {t("home.latestProjects")}
          </h2>

          <p className="text-xl font-bold mb-4 text-center md:text-left font-code text-white">
            {t("home.development")}
          </p>

          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {latestDevProjects.map((p) => (
              <li key={p.src} className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-white/5 border border-white/10">
                  <video
                    className="h-full w-full"
                    autoPlay
                    muted
                    loop
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src={p.src} type="video/mp4" />
                    {t("common.videoFallback")}
                  </video>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">{p.title}</h3>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-xl font-bold mb-4 text-center md:text-left font-photo text-white">
            {t("home.photography")}
          </p>

          <ul className="grid gap-8 md:grid-cols-2">
            {latestPhotoProjects.map((p) => (
              <li key={p.key}>
                <Link
                  href={`/photo/${p.slug}`}
                  className="group block space-y-4"
                  aria-label={p.title}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                        {t("home.photoLabel")}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {p.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
