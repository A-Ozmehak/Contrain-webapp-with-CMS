import { getStrapiURL } from "@/utils";

const fetchArticlePageData = async () => {
  const apiUrl = getStrapiURL(`/api/article-page?populate[Hero][populate]=*`);
  const articlesUrl = getStrapiURL(`/api/articles?populate=*`); // ✅ Fetch articles separately

  try {
    const [pageRes, articlesRes] = await Promise.all([
      fetch(apiUrl, { cache: "no-store" }),
      fetch(articlesUrl, { cache: "no-store" }),
    ]);

    if (!pageRes.ok || !articlesRes.ok) throw new Error("Failed to fetch data");

    const pageJson = await pageRes.json();
    const articlesJson = await articlesRes.json();

    const articlePageData = pageJson.data;
    if (!articlePageData) return null;

    // ✅ Extract Hero block correctly
    const heroData = articlePageData.Hero || null;

    // ✅ Format articles properly
    const formattedArticles = articlesJson.data.map((item: any) => ({
      id: item.id,
      Image: item.Image?.url || "/default-article-image.webp",
      Author: item.Author || "Unknown",
      Date: new Date(item.Date).toLocaleDateString(),
      Categories: item.Categories || [],
      Title: item.Title || "No Title",
      Text: item.Text || "No content available.",
    }));

    return { heroData, articles: formattedArticles };
  } catch (error) {
    console.error("Error fetching Article Page:", error);
    return null;
  }
};

export default fetchArticlePageData;
