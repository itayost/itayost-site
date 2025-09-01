import React, { Suspense } from 'react';
import './LazySection.css';

const LoadingFallback = () => (
  <div className="lazy-section-loading">
    <div className="lazy-section-spinner"></div>
  </div>
);

const LazySection = ({ children, fallback = <LoadingFallback /> }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default LazySection;