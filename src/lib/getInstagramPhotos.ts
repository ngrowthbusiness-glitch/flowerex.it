import fs from "fs";
import path from "path";

const INSTAGRAM_DIR = path.join(process.cwd(), "public", "instagram");
const VALID_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export function getInstagramPhotos(): string[] {
  if (!fs.existsSync(INSTAGRAM_DIR)) return [];

  return fs
    .readdirSync(INSTAGRAM_DIR)
    .filter((file) => VALID_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => `/instagram/${file}`);
}
