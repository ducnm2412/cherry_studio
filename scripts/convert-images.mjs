// Chuyển ảnh JPG trong public/ sang WebP, phân loại theo thư mục album.
// Giữ nguyên độ phân giải gốc, chất lượng cao để ảnh rõ nét nhất.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const SRC = path.join(ROOT, "drive-download-20261028T030748Z-1-001");
const OUT = path.join(ROOT, "images");

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function convert(input, output) {
  await sharp(input)
    .rotate() // xoay đúng theo EXIF
    .sharpen({ sigma: 0.5 }) // làm nét nhẹ, không tạo viền
    .webp({ quality: 95, effort: 6, smartSubsample: true })
    .toFile(output);
}

const manifest = [];

const albums = (await fs.readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory());
for (const album of albums) {
  const slug = slugify(album.name);
  const dir = path.join(OUT, slug);
  await fs.mkdir(dir, { recursive: true });
  const files = (await fs.readdir(path.join(SRC, album.name)))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();
  const images = [];
  for (const [i, file] of files.entries()) {
    const name = `${slug}-${String(i + 1).padStart(2, "0")}.webp`;
    const out = path.join(dir, name);
    await convert(path.join(SRC, album.name, file), out);
    const { width, height } = await sharp(out).metadata();
    images.push({ src: `/images/${slug}/${name}`, width, height });
  }
  manifest.push({ slug, title: album.name, images });
  console.log(`${album.name} → ${slug}: ${images.length} ảnh`);
}

// Ảnh lẻ ở gốc public/
const loose = (await fs.readdir(ROOT)).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (loose.length) {
  const dir = path.join(OUT, "khac");
  await fs.mkdir(dir, { recursive: true });
  const images = [];
  for (const [i, file] of loose.entries()) {
    const name = `khac-${String(i + 1).padStart(2, "0")}.webp`;
    await convert(path.join(ROOT, file), path.join(dir, name));
    const { width, height } = await sharp(path.join(dir, name)).metadata();
    images.push({ src: `/images/khac/${name}`, width, height });
  }
  manifest.push({ slug: "khac", title: "Khác", images });
  console.log(`Khác: ${images.length} ảnh`);
}

await fs.mkdir("src/data", { recursive: true });
await fs.writeFile("src/data/gallery.json", JSON.stringify(manifest, null, 2));
console.log("Đã ghi src/data/gallery.json");
