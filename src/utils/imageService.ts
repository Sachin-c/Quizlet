// Image service - uses emojis for vocabulary images

/**
 * Get image for a vocabulary word
 * Returns emoji
 */
export const getImageForWord = async (
  _word: string,
  emoji: string | undefined
): Promise<string | undefined> => {
  return emoji;
};

/**
 * Preload images (placeholder)
 */
export const preloadImagesForWords = () => {
  // Placeholder
};

/**
 * Clear image cache (placeholder)
 */
export const clearImageCache = (): void => {
  // Placeholder
};

/**
 * Get cache statistics (placeholder)
 */
export const getImageCacheStats = (): { cached: number; size: string } => {
  return { cached: 0, size: "0 KB" };
};
