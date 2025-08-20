// Features.jsx - Optimized with anti-flickering and mobile performance
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { featuresData } from '../../data/features';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Features.css';

// FeatureCard as a separate memoized component
const FeatureCard = React.memo(({ feature, index }) => {
  // Use the optimized intersection observer hook
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    once: true // Critical: only animate once to prevent flickering
  });

  // Detect hover support for proper touch device handling
  const supportsHover = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  }, []);

  // Card animation variants with hardware acceleration
  const cardVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 30,
      translateZ: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      translateZ: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1, // Stagger based on index
        ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
        type: "tween"
      }
    }
  }), [index]);

  // Icon animation variants
  const iconVariants = useMemo(() => ({
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1 + 0.2,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }), [index]);

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
      ref={ref}
      className="feature-card"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={hoverAnimation}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div 
        className="feature-icon"
        variants={iconVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {feature.icon}
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { 
          opacity: 1, 
          x: 0,
          translateZ: 0
        } : {}}
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
        {feature.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1 + 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {feature.description}
      </motion.p>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Main Features component
const Features = () => {
  // Memoize container variants
  const containerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      translateZ: 0
    },
    visible: {
      opacity: 1,
      translateZ: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  // Memoize viewport settings
  const viewportSettings = useMemo(() => ({
    once: true, // Critical: Only animate once
    amount: 0.05, // Start when 5% visible
    margin: "0px 0px -100px 0px" // Trigger before fully visible
  }), []);

  // Render feature cards
  const renderFeatureCards = useCallback(() => {
    return featuresData.map((feature, index) => (
      <FeatureCard 
        key={feature.id} 
        feature={feature} 
        index={index} 
      />
    ));
  }, []);

  return (
    <section 
      className="features" 
      id="features"
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="container">
        <SectionTitle>למה לבחור ב-ItayOst?</SectionTitle>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {renderFeatureCards()}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Features);