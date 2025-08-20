// Portfolio.jsx - Optimized parent component with anti-flickering
import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import PortfolioItem from './PortfolioItem';
import { portfolioData } from '../../data/portfolio';
import './Portfolio.css';

const Portfolio = () => {
  // Memoize container variants to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      // Force hardware acceleration
      translateZ: 0
    },
    visible: {
      opacity: 1,
      translateZ: 0,
      transition: {
        staggerChildren: 0.15, // Stagger children animations
        delayChildren: 0.1, // Small delay before children start
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  // Memoize viewport settings
  const viewportSettings = useMemo(() => ({
    once: true, // Critical: Only animate once to prevent flickering
    amount: 0.05, // Start animation when 5% is visible
    margin: "0px 0px -100px 0px" // Trigger slightly before element is visible
  }), []);

  // Render portfolio items with proper index for staggering
  const renderPortfolioItems = useCallback(() => {
    return portfolioData.map((project, index) => (
      <PortfolioItem 
        key={project.id} 
        project={project} 
        index={index}
      />
    ));
  }, []);

  return (
    <section 
      className="portfolio" 
      id="portfolio"
      style={{
        // Prevent layout shifts
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="container">
        <SectionTitle>פרויקטים שהובלתי להצלחה</SectionTitle>
        
        <motion.div 
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          // Force hardware acceleration
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {renderPortfolioItems()}
        </motion.div>
      </div>
    </section>
  );
};

// Memoize the entire component
export default React.memo(Portfolio);