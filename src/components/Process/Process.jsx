// Process.jsx - Optimized with anti-flickering and mobile performance
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { processData } from '../../data/process';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Process.css';

// ProcessItem as a separate memoized component
const ProcessItem = React.memo(({ item, index }) => {
  // Use the optimized intersection observer hook
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    once: true // Critical: only animate once to prevent flickering
  });
  
  // Determine if this is an even or odd item for alternating layout
  const isEven = index % 2 === 0;
  
  // Detect hover support for proper touch device handling
  const supportsHover = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  }, []);

  // Item animation variants with hardware acceleration
  const itemVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: isEven ? -50 : 50,
      translateZ: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      translateZ: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      }
    }
  }), [index, isEven]);

  // Number badge animation
  const numberVariants = useMemo(() => ({
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
        delay: index * 0.15 + 0.2,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }), [index]);

  // Hover animation only for devices that support it
  const hoverAnimation = supportsHover ? {
    scale: 1.05,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  } : {};

  return (
    <motion.div
      ref={ref}
      className={`process-item ${isEven ? 'even' : 'odd'}`}
      variants={itemVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <motion.div 
        className="process-number"
        variants={numberVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        style={{
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {item.number}
      </motion.div>
      
      <motion.div 
        className="process-content"
        whileHover={hoverAnimation}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0,
            translateZ: 0
          } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15 + 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {item.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15 + 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {item.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
});

ProcessItem.displayName = 'ProcessItem';

// Main Process component
const Process = () => {
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  // Timeline line animation
  const timelineVariants = useMemo(() => ({
    hidden: {
      scaleY: 0,
      opacity: 0
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  // Render process items
  const renderProcessItems = useCallback(() => {
    return processData.map((item, index) => (
      <ProcessItem 
        key={item.id} 
        item={item} 
        index={index} 
      />
    ));
  }, []);

  return (
    <section 
      className="process" 
      id="process"
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="container">
        <SectionTitle>איך זה עובד?</SectionTitle>
        
        <motion.div 
          className="process-timeline"
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
          {/* Animated timeline line */}
          <motion.div
            className="timeline-line"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%) translateZ(0)',
              width: '2px',
              height: '100%',
              background: 'linear-gradient(180deg, var(--secondary) 0%, transparent 100%)',
              transformOrigin: 'top center',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
          
          {renderProcessItems()}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Process);