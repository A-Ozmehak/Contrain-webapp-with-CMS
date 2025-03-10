import { getStrapiURL } from '@/utils';
import BlockManager from '@/components/shared/BlockManager';


// ✅ Fetch home page data
const fetchHomePageData = async () => {
  const res = await fetch(getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`), {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.data.length > 0 ? data.data[0] : null;
};

export default async function HomePage() {
  const pageData = await fetchHomePageData();

  if (!pageData) {
    return <div>Error: Home data not found.</div>;
  }

  return <BlockManager blocks={pageData.Blocks} />;
}
