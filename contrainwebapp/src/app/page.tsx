import BlockManager from '../components/shared/BlockManager/index';
import { getStrapiURL } from '../../utils';
import HeroComponent from '@/reusableComponents/hero/hero';

 const fetchHomePageData = async () => {
  try {
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      // next: { revalidate: 60 }, // Revalidate the data every 60 seconds
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch data (${res.status}): ${errorMessage}`);
    }
  
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      console.warn('No home page data found');
      return null;
    }
  
    return data.data[0];
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
};

export default async function HomePage() {
  const pageData = await fetchHomePageData();

  if (!pageData) {
    return <div>Error: Home data not found.</div>;
  }

  const { Blocks } = pageData;

  console.log('Blocks from API:', Blocks);

  // Find the Hero block
  const heroBlock = Blocks.find((block: any) => block.__component === 'blocks.hero');

  if (!heroBlock) {
    console.warn('Hero block not found');
    return <div>Error: Hero block missing.</div>;
  }

  // Extract TypewriterTexts from inside Hero block
  const typewriterTexts = heroBlock.TypewriterTexts
    ? heroBlock.TypewriterTexts.map((item: any) => ({ id: item.id, Text: item.Text }))
    : [];

  console.log('Extracted TypewriterTexts:', typewriterTexts); // ✅ Check if texts are found

  return (
    <div>
      <BlockManager blocks={Blocks} />
    </div>
  );
}
