// utils/fetchLatestArticles.ts
import { getStrapiURL, getStrapiMedia } from '@/utils';

export default async function fetchLatestArticles() {
  const res = await fetch(getStrapiURL('/api/articles?sort=Date:desc&populate=*'), {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.data.map((article: any) => ({
    id: article.id,
    Title: article.Title,
    Slug: article.Slug,
    Date: article.Date,
    Author: article.Author,
    Category: article.Category,
    Tags: article.Tags,
    Text: article.Text,
    Image: getStrapiMedia(
      article.Image?.formats?.medium?.url || article.Image?.url || '/fallback-image.webp'
    ),
  }));
}
