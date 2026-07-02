import CategoryGalleryClient from "./CategoryGalleryClient";
import photoIndex from "../../data/photo-index.json";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(photoIndex).map((category) => ({ category }));
}

export default async function PhotoCategoryPage({ params }) {
  const { category: categoryParam } = (await params) || {};
  const category = decodeURIComponent(categoryParam || "");
  const entry = photoIndex[category] || { cover: null, images: [] };

  return (
    <CategoryGalleryClient
      category={category}
      cover={entry.cover}
      images={entry.images}
    />
  );
}
