const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MAX_WIDTH = 2000;
const JPEG_QUALITY = 80;
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

function collectImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImages(full));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function compress(file) {
  const dir = path.dirname(file);
  const base = path.parse(file).name;
  const outFile = path.join(dir, `${base}.jpg`);

  const buffer = await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  const tmpFile = `${outFile}.tmp`;
  fs.writeFileSync(tmpFile, buffer);
  fs.rmSync(file);
  fs.renameSync(tmpFile, outFile);
  return buffer.length;
}

async function main() {
  const baseDir = path.join(process.cwd(), "public", "fotografi");
  const images = collectImages(baseDir);

  let before = 0;
  let after = 0;

  for (const file of images) {
    const originalSize = fs.statSync(file).size;
    const newSize = await compress(file);
    before += originalSize;
    after += newSize;
    console.log(
      `${path.relative(baseDir, file)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB`
    );
  }

  console.log(
    `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`
  );
}

main();
