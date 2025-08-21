// Services.jsx - Optimized with anti-flickering and mobile performance
import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { servicesData } from '../../data/services';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Services.css';

// ServiceCard as a separate memoized component
const ServiceCard = React.memo(({ service, index }) => {
  // Use the optimized intersection observer hook
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1,
    once: true // Critical: only animate once
  });

  // Detect hover support
  const supportsHover = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  }, []);

  // Check if we should disable infinite animations on mobile
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  }, []);

  // Card animation variants
  const cardVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      scale: 0.9,
      translateZ: 0,
      rotateX: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      translateZ: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), [index]);

  // Icon animation - disabled on mobile for performance
  const iconAnimation = !isMobile ? {
    scale: [1, 1.05, 1]
  } : {};

  const iconTransition = !isMobile ? {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  } : {};

  // Hover animation only for desktop
  const hoverAnimation = supportsHover ? {
    scale: 1.02,
    y: -10,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  } : {};

  // Get the Icon component
  const IconComponent = service.Icon;

  return (
    <motion.div
      ref={ref}
      className="service-card"
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
        className="service-icon"
        animate={iconAnimation}
        transition={iconTransition}
        style={{
          willChange: isMobile ? 'auto' : 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <IconComponent size={48} strokeWidth={1.5} />
      </motion.div>
      
      <h3>{service.title}</h3>
      
      <ul className="service-list">
        {service.items.map((item, i) => (
          <motion.li 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { 
              opacity: 1, 
              x: 0,
              translateZ: 0
            } : {}}
            transition={{ 
              delay: index * 0.15 + i * 0.1,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// Main Services component
const Services = () => {
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

  // Render service cards
  const renderServiceCards = useCallback(() => {
    return servicesData.map((service, index) => (
      <ServiceCard 
        key={service.id} 
        service={service} 
        index={index} 
      />
    ));
  }, []);

  return (
    <section 
      className="services" 
      id="services"
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="container">
        <SectionTitle>תחומי התמחות</SectionTitle>
        
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true,
            amount: 0.05,
            margin: "0px 0px -100px 0px"
          }}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {renderServiceCards()}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Services);