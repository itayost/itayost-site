import React from 'react';
import './Skeleton.css';

const Skeleton = ({ 
  variant = 'text', 
  width, 
  height, 
  className = '',
  animation = 'pulse'
}) => {
  const skeletonClass = `skeleton skeleton--${variant} skeleton--${animation} ${className}`;
  
  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1.2em' : undefined),
  };

  return <div className={skeletonClass} style={style} aria-hidden="true" />;
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <Skeleton variant="rectangular" height="200px" className="skeleton-card__image" />
    <div className="skeleton-card__content">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

export const SkeletonServiceCard = ({ className = '' }) => (
  <div className={`skeleton-service-card ${className}`}>
    <Skeleton variant="circular" width="60px" height="60px" className="skeleton-service-card__icon" />
    <Skeleton variant="text" width="70%" className="skeleton-service-card__title" />
    <div className="skeleton-service-card__items">
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="85%" />
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="text" width="80%" />
    </div>
  </div>
);

export const SkeletonPortfolioItem = ({ className = '' }) => (
  <div className={`skeleton-portfolio-item ${className}`}>
    <Skeleton variant="rectangular" height="250px" className="skeleton-portfolio-item__image" />
    <div className="skeleton-portfolio-item__content">
      <Skeleton variant="text" width="60%" height="1.5em" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="90%" />
      <div className="skeleton-portfolio-item__tags">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="80px" height="24px" />
        <Skeleton variant="rectangular" width="70px" height="24px" />
      </div>
    </div>
  </div>
);

export default Skeleton;