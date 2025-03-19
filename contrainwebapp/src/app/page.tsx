import BlockManager from '@/components/shared/BlockManager';
import fetchHomePageData from '@/utils/fetchHomePageData';

export default async function HomePage() {
  const pageData = await fetchHomePageData();

  if (!pageData) {
    return <div>Error: Home data not found.</div>;
  }

  return <BlockManager blocks={pageData.Blocks} />;
}
