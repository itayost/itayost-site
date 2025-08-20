// useIntersectionObserver.js - Optimized to prevent animation flickering
import { useEffect, useRef, useState, useCallback } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  // Memoize the callback to prevent unnecessary re-renders
  const handleIntersection = useCallback(([entry]) => {
    // Only trigger animation once to prevent flickering
    if (entry.isIntersecting && !hasAnimated) {
      setIsIntersecting(true);
      setHasAnimated(true);
      
      // Disconnect observer after animation triggers if once is true (default)
      if (options.once !== false && observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    } else if (!entry.isIntersecting && options.once === false) {
      // Only update if we're allowing re-animation
      setIsIntersecting(false);
    }
  }, [hasAnimated, options.once]);

  useEffect(() => {
    const target = targetRef.current;
    
    // Don't create observer if there's no target or if already animated (and once is true)
    if (!target || (hasAnimated && options.once !== false)) {
      return;
    }

    // Create intersection observer with optimized settings
    const observerOptions = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      // Add root if provided (for custom scroll containers)
      ...(options.root && { root: options.root })
    };

    try {
      observerRef.current = new IntersectionObserver(
        handleIntersection,
        observerOptions
      );

      observerRef.current.observe(target);
    } catch (error) {
      // Fallback for older browsers
      console.warn('IntersectionObserver not supported:', error);
      setIsIntersecting(true);
      setHasAnimated(true);
    }

    // Cleanup function
    return () => {
      if (observerRef.current && target) {
        try {
          observerRef.current.unobserve(target);
        } catch (error) {
          // Target might be removed from DOM
          console.warn('Failed to unobserve target:', error);
        }
      }
    };
  }, [handleIntersection, hasAnimated, options.once, options.threshold, options.rootMargin, options.root]);

  // Reset function for cases where you might want to re-trigger animation
  const resetAnimation = useCallback(() => {
    setIsIntersecting(false);
    setHasAnimated(false);
  }, []);

  return [targetRef, isIntersecting, resetAnimation];
};

// Optimized hook for multiple elements with shared observer
export const useIntersectionObserverBatch = (options = {}) => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef(new Map());

  useEffect(() => {
    // Create a single observer for all elements
    const observerOptions = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      ...(options.root && { root: options.root })
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const elementId = elementsRef.current.get(entry.target);
        
        if (entry.isIntersecting && elementId) {
          setVisibleElements(prev => new Set(prev).add(elementId));
          
          // Unobserve after animation if once is true
          if (options.once !== false) {
            observerRef.current.unobserve(entry.target);
          }
        } else if (!entry.isIntersecting && options.once === false && elementId) {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            newSet.delete(elementId);
            return newSet;
          });
        }
      });
    }, observerOptions);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options.threshold, options.rootMargin, options.root, options.once]);

  const observe = useCallback((element, id) => {
    if (element && observerRef.current) {
      elementsRef.current.set(element, id);
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(element);
    }
  }, []);

  return { observe, unobserve, visibleElements };
};

// Default export for backward compatibility
export default useIntersectionObserver;