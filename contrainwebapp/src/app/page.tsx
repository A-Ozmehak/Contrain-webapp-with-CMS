import BlockManager from '../components/shared/BlockManager/index';
import { getStrapiURL } from '../../utils';
import HeroComponent from '@/reusableComponents/hero/hero';

 const fetchHomePageData = async () => {
  try {
    const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/`);
    console.log('Fetching from:', apiUrl);

    const res = await fetch(apiUrl, {
      cache: 'no-store',
      // next: { revalidate: 60 }, // Revalidate the data every 60 seconds
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch data (${res.status}): ${errorMessage}`);
    }
  
    const data = await res.json();
    console.log('API Response:', data);

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

  // Find the Hero block
  const heroBlock = Blocks.find((block: any) => block.__component === 'blocks.hero');
  // Find the TypewriterTexts block
  const typewriterTextsBlock = Blocks.find(
    (block: any) => block.__component === 'blocks.typewriter-texts'
  );

  // Prepare TypewriterTexts data
  const typewriterTexts = typewriterTextsBlock ? [{ id: typewriterTextsBlock.id, Text: typewriterTextsBlock.Text }] : [];

  return (
    <div>
      <BlockManager blocks={Blocks} />
      <HeroComponent
        Title={heroBlock?.Title}
        SubText={heroBlock?.SubText}
        TypewriterTexts={typewriterTexts}
        BackgroundImage="/path-to-your-image.jpg"
      />
    </div>
  );
}
