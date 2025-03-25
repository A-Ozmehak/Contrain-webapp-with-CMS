import { getStrapiURL, getStrapiMedia } from "@/utils";

const fetchArticlePageData = async () => {
  const apiUrl = getStrapiURL(`/api/article-page?populate[Hero][populate]=*`);
  const articlesUrl = getStrapiURL(`/api/articles?populate=*`); 
  const categoriesUrl = getStrapiURL(`/api/article-categories?populate=*`);

  try {
    const [pageRes, articlesRes, categoriesRes] = await Promise.all([
      fetch(apiUrl, { cache: "no-store" }),
      fetch(articlesUrl, { cache: "no-store" }),
      fetch(categoriesUrl, { cache: "no-store" }),
    ]);

    if (!pageRes.ok || !articlesRes.ok || !categoriesRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const pageJson = await pageRes.json();
    const articlesJson = await articlesRes.json();
    const categoriesJson = await categoriesRes.json();

    const articlePageData = pageJson.data;
    if (!articlePageData) return null;

    // ✅ Extract Hero with image URL
    const heroRaw = articlePageData.Hero || null;
    const heroData = {
      ...heroRaw,
      BackgroundImageUrl: heroRaw?.BackgroundImage?.url
        ? getStrapiMedia(heroRaw.BackgroundImage.formats?.large?.url || heroRaw.BackgroundImage.url)
        : null,
    };

    // ✅ Format articles with full image URL
    const formattedArticles = articlesJson.data.map((item: any) => {
      const rawImageUrl =
        item.Image?.formats?.medium?.url || item.Image?.url || "";
      const fullImageUrl = rawImageUrl
        ? getStrapiMedia(rawImageUrl)
        : "/default-article-image.webp";

      return {
        id: item.id,
        Image: fullImageUrl,
        Author: item.Author || "Unknown",
        Date: item.Date
          ? new Date(item.Date).toLocaleDateString("sv-SE")
          : "",
        Categories: item.Categories || [],
        Title: item.Title || "No Title",
        Text: item.Text || "No content available.",
      };
    });

        // ✅ Format categories
        const formattedCategories = categoriesJson.data.map((cat: any) => ({
          id: cat.id,
          name: cat.Category || "Unnamed",
        }));

    return { heroData, articles: formattedArticles, categories: formattedCategories, };
  } catch (error) {
    console.error("Error fetching Article Page:", error);
    return null;
  }
};

export default fetchArticlePageData;
