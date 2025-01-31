import { getStrapiURL } from '../../../utils';
import BlockManager from "@/components/shared/BlockManager";

const fetchPageData = async () => {
    try {
      const apiUrl = getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=/articles`);
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
        console.warn('No page data found');
        return null;
      }
    
      return data.data[0];
    } catch (error) {
      console.error('Fetch Error:', error);
      return null;
    }
};
    
export default async function Articles() {
    const pageData = await fetchPageData();

    if (!pageData) {
        return <div>Error: Page data not found.</div>;
      }
    
      const { Blocks } = pageData;

    return (
        <div>
            <BlockManager blocks={Blocks} />
        </div>
    )   
}
