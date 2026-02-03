import fs from "fs";
import path from "path";
import CategoryGalleryClient from "./CategoryGalleryClient";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

function isSafeSegment(value) {
  return (
    typeof value === "string" &&
    !value.includes("..") &&
    !value.includes("/") &&
    !value.includes("\\")
  );
}

function isImageFile(name) {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function extractNumber(name) {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function sortByNumber(names) {
  return [...names].sort((a, b) => {
    const aNum = extractNumber(a);
    const bNum = extractNumber(b);
    if (aNum !== null && bNum !== null && aNum !== bNum) {
      return aNum - bNum;
    }
    if (aNum !== null && bNum === null) return -1;
    if (aNum === null && bNum !== null) return 1;
    return a.localeCompare(b, "sv", { numeric: true, sensitivity: "base" });
  });
}

export function generateStaticParams() {
  const baseDir = path.join(process.cwd(), "public", "fotografi");
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  return fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ category: entry.name }));
}

function getCategoryData(category) {
  if (!isSafeSegment(category)) {
    return { categoryCover: null, albums: [] };
  }

  const categoryDir = path.join(process.cwd(), "public", "fotografi", category);
  if (!fs.existsSync(categoryDir)) {
    return { categoryCover: null, albums: [] };
  }

  const entries = fs.readdirSync(categoryDir, { withFileTypes: true });
  const coverEntry = entries.find(
    (entry) =>
      entry.isFile() &&
      entry.name.toLowerCase().startsWith(`cover.${category.toLowerCase()}.`)
  );
  const categoryCover = coverEntry
    ? `/fotografi/${category}/${coverEntry.name}`
    : null;

  const albumDirs = entries
    .filter((entry) => entry.isDirectory())
    .sort((a, b) =>
      a.name.localeCompare(b.name, "sv", { numeric: true, sensitivity: "base" })
    );

  const albums = albumDirs
    .map((dir) => {
      const albumDir = path.join(categoryDir, dir.name);
      const files = fs
        .readdirSync(albumDir, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter(isImageFile);

      const coverFile = files.find((name) =>
        /^\d+\.cover\./i.test(name)
      );
      const images = sortByNumber(
        files.filter((name) => !name.toLowerCase().startsWith("cover."))
      );
      const cover = coverFile
        ? `/fotografi/${category}/${dir.name}/${coverFile}`
        : images[0]
          ? `/fotografi/${category}/${dir.name}/${images[0]}`
          : null;

      return {
        id: dir.name,
        title: dir.name,
        cover,
        images: images.map(
          (name) => `/fotografi/${category}/${dir.name}/${name}`
        ),
      };
    })
    .filter((album) => album.images.length > 0);

  return { categoryCover, albums };
}

export default function PhotoCategoryPage({ params }) {
  const { category: categoryParam } = params || {};
  const category = decodeURIComponent(categoryParam || "");
  const { categoryCover, albums } = getCategoryData(category);

  return (
    <CategoryGalleryClient
      category={category}
      categoryCover={categoryCover}
      albums={albums}
    />
  );
}
