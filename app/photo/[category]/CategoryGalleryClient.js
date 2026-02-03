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
    if (!albums[index]?.images?.length) return;
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
            {albums.map((album, index) => (
              <button
                key={album.id}
                type="button"
                onClick={() => openAlbum(index)}
                className="group text-left"
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

          {albums.length === 0 ? (
            <p className="text-sm text-white/60">{t("photo.emptyCategory")}</p>
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
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              onClick={goPrev}
              aria-label={t("photo.previousImageAria")}
              className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={t("photo.nextImageAria")}
              className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/60"
            >
              <ArrowRightIcon />
            </button>

            <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 py-10">
              <div className="mb-4 flex w-full items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
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
