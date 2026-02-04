"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";
import { r2 } from "../../lib/media";

function getCategoryLabel(category, t) {
  const labels = {
    wedding: t("photo.categories.wedding"),
    "brollop-och-forlovning": t("photo.categories.wedding"),
    children: t("photo.categories.children"),
    barn: t("photo.categories.children"),
    family: t("photo.categories.family"),
    familj: t("photo.categories.family"),
    model: t("photo.categories.model"),
    modell: t("photo.categories.model"),
  };

  return labels[category] || category;
}

const PRICE_ALIASES = {
  wedding: "brollop-och-forlovning",
  children: "barn",
  family: "familj",
  model: "modell",
};

const PRICE_DATA = {
  "brollop-och-forlovning": {
    title: "Bröllop och förlovning",
    blocks: [
      {
        title: "Lilla paketet",
        subtitle: "Vigsel & porträtt",
        price: "5 000 kr",
        duration: "Upp till 2 timmar",
        includesTitle: "Vad ingår?",
        includes: [
          "Upp till 50st redigerade bilder",
          "Levererade via WeTransfer",
          "Lösenordsskyddat onlinegalleri att dela med nära och kära",
        ],
      },
      {
        title: "Mellan paketet",
        subtitle: "Förberedelser, vigsel, porträtt, gästfotografering",
        price: "12 000 kr",
        duration: "Upp till 5 timmar",
        includesTitle: "Vad ingår?",
        includes: [
          "Upp till 100st redigerade bilder",
          "Levererade via WeTransfer",
          "Lösenordsskyddat onlinegalleri att dela med nära och kära",
        ],
      },
      {
        title: "Stora paketet",
        subtitle:
          "Förberedelser, vigsel, porträtt, gästfotografering, mingel, middag & fest",
        price: "18 000 kr",
        duration: "Upp till 10 timmar",
        includesTitle: "Vad ingår?",
        includes: [
          "Lösenordsskyddat onlinegalleri att dela med nära och kära",
          "Kortare video",
          "Upp till 500st redigerade bilder levererade via WeTransfer & USB",
          "10st utskrivna bilder (10x13) och 1st inramad förstoring (40x60)",
        ],
      },
    ],
  },
  familj: {
    title: "Familj",
    blocks: [
      {
        title: "Small",
        price: "2 000 kr",
        duration: "2 timmar",
        description:
          "Passar för familj på 2-4 personer/gravidfoto med 1-2 fotoplatser i näravstånd.",
      },
      {
        title: "Medium",
        price: "3 500 kr",
        duration: "4 timmar",
        description:
          "Passar för familj på 4-6 med 2-4 fotoplatser i näravstånd.",
      },
    ],
  },
  barn: {
    title: "Barn",
    blocks: [
      {
        title: "Ett barn",
        lines: ["2 timmar - 1 500 kr"],
      },
      {
        title: "Två barn",
        lines: ["2 timmar - 2 500 kr", "4 timmar - 4 000 kr"],
      },
      {
        title: "Tre barn",
        lines: ["2 timmar - 4 000 kr", "4 timmar - 5 500 kr"],
      },
      {
        title: "Fyra barn",
        lines: ["2 timmar - 6 000 kr", "4 timmar - 7 500 kr"],
      },
    ],
    footnote: "Fler än 4 barn - tillägg 1 500 kr per barn.",
  },
  modell: {
    title: "Modell",
    blocks: [
      {
        title: "En person",
        lines: ["2 timmar - 2 000 kr", "4 timmar - 3 500 kr"],
      },
      {
        title: "Två personer",
        lines: ["2 timmar - 3 000 kr", "4 timmar - 4 500 kr"],
      },
      {
        title: "Tre personer",
        lines: ["2 timmar - 4 500 kr", "4 timmar - 6 000 kr"],
      },
    ],
    footnote: "Fler än 3 personer - 1 000 kr tillägg per person.",
  },
};

function getPriceData(category) {
  const key = PRICE_ALIASES[category] || category;
  return PRICE_DATA[key] || null;
}

export default function CategoryGalleryClient({
  category,
  categoryCover,
  albums,
}) {
  const { t } = useLanguage();
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categoryLabel = useMemo(
    () => getCategoryLabel(category, t),
    [category, t]
  );
  const priceData = useMemo(() => getPriceData(category), [category]);

  const normalizedAlbums = useMemo(
    () =>
      albums.map((album) => ({
        ...album,
        cover: album.cover ? r2(album.cover) : album.cover,
        images: (album.images || []).map((image) => r2(image)),
      })),
    [albums]
  );

  const activeAlbum =
    activeAlbumIndex !== null ? normalizedAlbums[activeAlbumIndex] : null;
  const images = activeAlbum?.images ?? [];
  const totalImages = images.length;
  const currentImage = totalImages ? images[activeImageIndex] : null;

  const categoryCoverUrl = categoryCover ? r2(categoryCover) : categoryCover;

  const openAlbum = (index) => {
    if (!normalizedAlbums[index]?.images?.length) return;
    setActiveAlbumIndex(index);
    setActiveImageIndex(0);
  };

  const closeAlbum = () => {
    setActiveAlbumIndex(null);
  };

  const goNext = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  const goPrev = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    if (activeAlbumIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeAlbumIndex]);

  useEffect(() => {
    if (activeAlbumIndex === null) return;
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAlbum();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeAlbumIndex, totalImages]);

  useEffect(() => {
    if (!currentImage || !totalImages) return;
    if (typeof window === "undefined") return;

    const preload = (src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };

    const nextImage = images[(activeImageIndex + 1) % totalImages];
    const prevImage =
      images[(activeImageIndex - 1 + totalImages) % totalImages];

    preload(nextImage);
    preload(prevImage);
  }, [currentImage, activeImageIndex, totalImages, images]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <Link
          href="/photo"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white"
        >
          <span aria-hidden="true">&lt;</span>
          <span>{t("photo.backToGallery")}</span>
        </Link>

        <header className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            {t("photo.pageTitle")}
          </p>
          {categoryCoverUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
              <Image
                src={categoryCoverUrl}
                alt={categoryLabel}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-75"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <h1 className="px-6 text-6xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow">
                  {categoryLabel}
                </h1>
              </div>
            </div>
          ) : (
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {categoryLabel}
            </h1>
          )}
        </header>

        <section className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {normalizedAlbums.map((album, index) => (
              <button
                key={album.id}
                type="button"
                onClick={() => openAlbum(index)}
                className="group text-left cursor-pointer"
                aria-label={t("photo.openAlbumAria", { title: album.title })}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  {album.cover ? (
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-white/50">
                      {t("home.photoLabel")}
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                  <span className="font-semibold">{album.title}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {t("photo.albumCount", { count: album.images.length })}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {normalizedAlbums.length === 0 ? (
            <p className="text-sm text-white/60">{t("photo.emptyCategory")}</p>
          ) : null}

          {priceData ? (
            <div
              id="category-prices"
              className="mt-12 border-t border-white/10 pt-10 scroll-mt-36"
            >
              <h2 className="text-2xl font-bold mb-2">
                {t("photo.pricesTitle")}
              </h2>
              <p className="text-white/60">{priceData.title}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {priceData.blocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {block.title}
                        </h3>
                        {block.subtitle ? (
                          <p className="mt-1 text-sm text-white/70">
                            {block.subtitle}
                          </p>
                        ) : null}
                      </div>
                      {block.price ? (
                        <span className="text-sm font-semibold text-white">
                          {block.price}
                        </span>
                      ) : null}
                    </div>

                    {block.duration ? (
                      <p className="mt-2 text-sm text-white/70">
                        {block.duration}
                      </p>
                    ) : null}

                    {block.description ? (
                      <p className="mt-3 text-sm text-white/70">
                        {block.description}
                      </p>
                    ) : null}

                    {block.lines?.length ? (
                      <ul className="mt-3 space-y-1 text-sm text-white/70">
                        {block.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}

                    {block.includes?.length ? (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                          {block.includesTitle || "Vad ingår?"}
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-white/70">
                          {block.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {priceData.footnote ? (
                <p className="mt-4 text-xs text-white/50">
                  {priceData.footnote}
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>

      {activeAlbum && currentImage ? (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          onClick={closeAlbum}
        >
          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeAlbum}
              aria-label={t("photo.closeModalAria")}
              className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60 cursor-pointer"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label={t("photo.previousImageAria")}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60 cursor-pointer"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={t("photo.nextImageAria")}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60 cursor-pointer"
            >
              <ArrowRightIcon />
            </button>

            <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 py-10">
              <div className="mb-4 flex w-full items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60 z-20">
                <span>{activeAlbum.title}</span>
                <span>
                  {activeImageIndex + 1}/{totalImages}
                </span>
              </div>

              <div className="relative w-full flex-1 max-h-[70vh]">
                <Image
                  src={currentImage}
                  alt={`${activeAlbum.title} ${activeImageIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
