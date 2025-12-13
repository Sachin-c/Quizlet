// Image service - currently uses emojis
// Can be extended with real image APIs in the future

/**
 * Get image for a vocabulary word
 * Currently returns emoji - no external API to avoid auth issues
 */
export const getImageForWord = async (
  _word: string,
  emoji: string
): Promise<string> => {
  return emoji;
};

/**
 * Preload images (placeholder)
 */
export const preloadImagesForWords = () => {
  // Placeholder for future image preloading
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
