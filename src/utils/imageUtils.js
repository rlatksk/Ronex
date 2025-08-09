// Utility function to handle both URL and base64 image sources with performance optimization
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
  // Assume JPEG format by default for better compression
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

// Utility function to preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Utility function to get image dimensions without loading the full image
export const getImageDimensions = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error('Failed to get image dimensions'));
    img.src = src;
  });
};

// Memory management - create object URL for large base64 images to reduce memory usage
export const optimizeImageSrc = (imageData) => {
  const src = getImageSrc(imageData);
  
  // If it's a large base64 image, consider converting to blob URL for better memory usage
  if (src.startsWith('data:image/') && src.length > 100000) { // 100KB threshold
    try {
      // Convert base64 to blob
      const response = fetch(src);
      response.then(res => res.blob()).then(blob => {
        return URL.createObjectURL(blob);
      });
    } catch (error) {
      // Fallback to original src
      return src;
    }
  }
  
  return src;
};
