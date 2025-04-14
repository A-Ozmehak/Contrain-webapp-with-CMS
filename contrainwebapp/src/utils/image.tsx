// utils/image.ts
import { getStrapiMedia } from './index';

export function normalizeImageFromBlock(imageInput: any, fallback = '/fallback.webp') {
  if (!imageInput) return fallback;

  if (typeof imageInput === 'string') return imageInput;

  const image = Array.isArray(imageInput) ? imageInput[0] : imageInput;

  return getStrapiMedia(
    image?.formats?.medium?.url || image?.url || fallback
  );
}
