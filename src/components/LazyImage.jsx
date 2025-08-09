import { useState, useEffect, useRef } from 'react';
import { getImageSrc } from '../utils/imageUtils';

const LazyImage = ({ src, alt, className, style = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={className}
      style={{
        ...style,
        backgroundColor: isLoaded ? 'transparent' : '#f0f0f0',
        minHeight: isLoaded ? 'auto' : '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!isInView && !isLoaded && (
        <div style={{ color: '#999', fontSize: '14px' }}>Loading...</div>
      )}
      
      {isInView && !hasError && (
        <img
          src={getImageSrc(src)}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      )}
      
      {hasError && (
        <div style={{ 
          color: '#999', 
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px'
        }}>
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default LazyImage;
