import { GetStaticPaths, GetStaticProps } from 'next';
import { getStrapiURL } from '../utils';
import BlockManager from '../src/components/shared/BlockManager/index';

interface PageData {
  Title: string;
  Blocks: any[]; // Replace `any[]` with a proper block type if you have it
}

interface UniversalsProps {
  pageData: PageData;
}

interface Page {
  id: number;
  Title: string;
  Slug: string | null;
  Blocks: Array<{ __component: string; id: number; Title?: string; SubText?: string }>;
}

interface StrapiResponse {
  data: Page[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Universals: React.FC<UniversalsProps> = ({ pageData }) => {
  const { Title, Blocks } = pageData;

  return (
    <div>
      <h1>{Title}</h1>
      <BlockManager blocks={Blocks} />
    </div>
  );
};

// Generate static paths for all pages
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(getStrapiURL('/api/pages?populate=*'));
  const data: StrapiResponse = await res.json(); // Explicitly type the response

  const paths = data.data.map((page) => ({
    params: { slug: page.Slug?.replace(/^\//, '').split('/') || [] },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

// Fetch data for each page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ? `/${(params.slug as string[]).join('/')}` : '/';

  const res = await fetch(getStrapiURL(`/api/pages?populate=*&filters[Slug][$eq]=${slug}`));
  const data = await res.json();

  if (data.data.length === 0) {
    return { notFound: true };
  }

  const pageData = data.data[0]; // Strapi returns an array even for single results

  return {
    props: { pageData },
  };
};

export default Universals;
