// src/components/Portfolio/PortfolioItem.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, FileText } from 'lucide-react';

const PortfolioItem = ({ project, index = 0 }) => {
  // Detect if device supports hover (desktop) or not (mobile/tablet)
  const supportsHover = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  }, []);

  // Get the appropriate icon based on link type
  const getLinkIcon = (linkType) => {
    switch(linkType) {
      case 'github':
        return <Github size={18} />;
      case 'demo':
        return <Play size={18} />;
      case 'case-study':
        return <FileText size={18} />;
      case 'live':
      default:
        return <ExternalLink size={18} />;
    }
  };

  // Get the appropriate button text based on link type
  const getLinkText = (linkType) => {
    switch(linkType) {
      case 'github':
        return 'קוד מקור';
      case 'demo':
        return 'דמו';
      case 'case-study':
        return 'מקרה בוחן';
      case 'live':
      default:
        return 'צפה באתר';
    }
  };

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
        
        {/* Project Link Button */}
        {project.link && (
          <motion.div 
            className="portfolio-link-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1 + 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <motion.a
              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
              whileHover={supportsHover ? { scale: 1.05, y: -2 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span>{getLinkText(project.linkType)}</span>
              {getLinkIcon(project.linkType)}
            </motion.a>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(PortfolioItem);