// Utility function to handle both URL and base64 image sources
export const getImageSrc = (imageData) => {
  // Return empty string if no image data
  if (!imageData || imageData.trim() === '') {
    return '';
  }
  
  // If it's already a complete URL, return as is
  if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
    return imageData;
  }
  
  // If it's already a complete base64 data URL, return as is
  if (imageData.startsWith('data:image/')) {
    return imageData;
  }
  
  // If it's raw base64 data (without data: prefix), add the prefix
  // Assume JPEG format by default, but you could enhance this to detect format
  if (imageData.length > 50 && !imageData.includes('/') && !imageData.includes('\\')) {
    return `data:image/jpeg;base64,${imageData}`;
  }
  
  // If it looks like a relative path, return as is (for local assets)
  return imageData;
};

// Utility function to check if an image source is valid
export const isValidImageSrc = (imageData) => {
  const src = getImageSrc(imageData);
  return src !== '';
};
