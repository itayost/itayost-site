// PortfolioItem.jsx - Optimized for mobile with anti-flickering
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const PortfolioItem = ({ project, index = 0 }) => {
  // Detect if device supports hover (desktop) or not (mobile/tablet)
  const supportsHover = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  }, []);

  // Optimized animation variants with hardware acceleration
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      // Force hardware acceleration
      translateZ: 0,
      rotateX: 0,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      translateZ: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1, // Stagger based on index
        ease: [0.4, 0, 0.2, 1], // Cubic-bezier for smooth animation
        // Optimize for mobile
        type: "tween"
      }
    }
  };

  // Hover animation only for devices that support it
  const hoverAnimation = supportsHover ? {
    y: -10,
    scale: 1.02,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  } : {};

  return (
    <motion.div
      className="portfolio-item"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={hoverAnimation}
      // Force hardware acceleration through style
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
      // Prevent re-animation on viewport re-entry
      viewport={{ 
        once: true,
        amount: 0.1,
        margin: "0px 0px -50px 0px"
      }}
    >
      <motion.div 
        className="portfolio-image"
        // Subtle image animation
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1 + 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy" // Lazy load images
            decoding="async" // Async decoding for better performance
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          />
        ) : (
          <span className="portfolio-placeholder">תמונת פרויקט</span>
        )}
      </motion.div>
      
      <motion.div 
        className="portfolio-content"
        // Content animation
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1 + 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.technologies.map((tech, techIndex) => (
            <motion.span 
              key={techIndex} 
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 + 0.4 + techIndex * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(PortfolioItem);