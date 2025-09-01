import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

const LazyImage = React.memo(({ 
  src, 
  alt, 
  placeholder,
  className = '',
  onLoad,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || null);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    if (!imageRef) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.01, rootMargin: '50px' }
    );

    observerRef.current.observe(imageRef);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [imageRef]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
  }, [isInView, src, onLoad]);

  return (
    <div className={`lazy-image-wrapper ${className}`}>
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        className={`lazy-image ${isLoaded ? 'lazy-image--loaded' : 'lazy-image--loading'}`}
        loading="lazy"
        {...props}
      />
      {!isLoaded && (
        <div className="lazy-image-placeholder" aria-hidden="true">
          <div className="lazy-image-spinner"></div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;