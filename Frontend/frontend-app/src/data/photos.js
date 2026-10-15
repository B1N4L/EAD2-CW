// Every image in src/assets/photos and src/assets/gallery, found at build time.
// Drop a file in with the expected name and it shows up; until then pages show a placeholder.

const photoFiles = import.meta.glob("../assets/photos/*.{jpg,jpeg,png,webp,avif}", { eager: true, query: "?url", import: "default" });
const galleryFiles = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,avif}", { eager: true, query: "?url", import: "default" });

const fileName = (path) => path.split("/").pop();

const PHOTOS = Object.fromEntries(Object.entries(photoFiles).map(([path, url]) => [fileName(path), url]));

export const photoUrl = (name) => (name ? PHOTOS[name] ?? null : null);

// Gallery photos, sorted by file name (2.webp before 10.webp).
export const GALLERY = Object.entries(galleryFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => ({ name: fileName(path), url }));
