import fetchNormalizedPageData from "./fetchNormalizedPageData";

const fetchHomePageData = async () => {
  return await fetchNormalizedPageData('/');
};

export default fetchHomePageData;