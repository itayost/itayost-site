// Fixed useIntersectionObserver.js - Prevents re-triggering animations
import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger animation once to prevent flickering
        if (entry.isIntersecting && !hasAnimated) {
          setIsIntersecting(true);
          setHasAnimated(true);
          
          // Optionally disconnect observer after animation triggers
          if (options.once !== false) {
            observer.disconnect();
          }
        } else if (!entry.isIntersecting && options.once === false) {
          setIsIntersecting(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasAnimated, options]);

  return [targetRef, isIntersecting];
};