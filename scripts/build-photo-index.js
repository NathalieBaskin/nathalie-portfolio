const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

function isImageFile(name) {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function isCoverFile(name) {
  return /cover/i.test(path.parse(name).name);
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

async function describeImage(category, name, filePath) {
  const { width, height } = await sharp(filePath).metadata();
  return { src: `/fotografi/${category}/${name}`, width, height };
}

async function buildIndex() {
  const baseDir = path.join(process.cwd(), "public", "fotografi");
  if (!fs.existsSync(baseDir)) {
    return {};
  }

  const categories = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const index = {};

  for (const category of categories) {
    const categoryDir = path.join(baseDir, category);
    const files = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter(isImageFile);

    const coverFile = files.find(isCoverFile);
    const restSorted = sortByNumber(
      files.filter((name) => name !== coverFile)
    );
    const orderedFiles = coverFile ? [coverFile, ...restSorted] : restSorted;

    const images = [];
    for (const name of orderedFiles) {
      images.push(
        await describeImage(category, name, path.join(categoryDir, name))
      );
    }

    index[category] = {
      cover: images[0] || null,
      images,
    };
  }

  return index;
}

async function main() {
  const index = await buildIndex();
  const outDir = path.join(process.cwd(), "app", "data");
  const outFile = path.join(outDir, "photo-index.json");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(index, null, 2));

  console.log(`Wrote ${outFile}`);
}

main();
