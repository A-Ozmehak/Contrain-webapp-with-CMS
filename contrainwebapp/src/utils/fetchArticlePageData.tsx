import { getStrapiURL, getStrapiMedia } from "@/utils";

export interface ArticleItem {
  id: number;
  Image: string;
  Author: string;
  Date: string;
  Category: string;
  Title: string;
  Text: string;
  Tags: string;
  Slug: string;
}

export interface TagItem {
  id: number;
  name: string;
}

export interface CategoryItem {
  id: number;
  name: string;
}

export interface ArticlePageData {
  heroData: {
    Title?: string;
    SubText?: string;
  };
  articles: ArticleItem[];
  categories: CategoryItem[];
  tags: TagItem[];
}

const fetchArticlePageData = async (): Promise<ArticlePageData | null> => {
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

    const heroRaw = articlePageData.Hero || null;
    const heroData = {
      ...heroRaw,
      BackgroundImageUrl: heroRaw?.BackgroundImage?.url
        ? getStrapiMedia(heroRaw.BackgroundImage.formats?.large?.url || heroRaw.BackgroundImage.url)
        : null,
    };

    const formattedArticles: ArticleItem[] = articlesJson.data.map((item: any) => {
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
        Category: item.Category || "Uncategorized",
        Title: item.Title || "No Title",
        Text: item.Text || "No content available.",
        Tags: item.Tags || "",
        Slug: item.Slug
      };
    });

    const rawTags = formattedArticles
      .map((article) => article.Tags)
      .filter(Boolean)
      .flatMap((tagString) =>
        tagString.split(",").map((tag) => tag.trim())
      );

    const uniqueTags = [...new Set(rawTags)];

    const formattedTags: TagItem[] = uniqueTags.map((tag, index) => ({
      id: index,
      name: tag,
    }));

    const formattedCategories: CategoryItem[] = categoriesJson.data.map((cat: any) => ({
      id: cat.id,
      name: cat.Category || "Unnamed",
    }));

    return {
      heroData,
      articles: formattedArticles,
      categories: formattedCategories,
      tags: formattedTags,
    };
  } catch (error) {
    console.error("Error fetching Article Page:", error);
    return null;
  }
};

export default fetchArticlePageData;
