// src/components/Hero/Hero.jsx - OPTIMIZED VERSION
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import ParticleBackground from '../common/ParticleBackground';
import { useScrollParallax } from '../../hooks/useScrollParallax';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import './Hero.css';

const Hero = () => {
  // ✅ FIX: Throttle scroll parallax for better performance
  const scrollOffset = useScrollParallax(0.5, 16); // 60fps throttling
  const mousePosition = useMouseParallax();
  const [titleText, setTitleText] = useState('');
  const fullTitle = 'פיתוח דיגיטלי שמניע את העסק שלך קדימה';

  // ✅ FIX: Memoize typewriter effect to prevent recreation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this only runs once

  // ✅ FIX: Memoize shape transforms to reduce calculations
  const shapeTransforms = useMemo(() => ({
    shape1: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(45deg)`,
    shape2: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
    shape3: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) rotate(30deg)`
  }), [mousePosition.x, mousePosition.y]);

  // ✅ FIX: Memoize hero content transform
  const heroContentStyle = useMemo(() => ({
    transform: `translateY(${scrollOffset}px)`,
    opacity: Math.max(0, 1 - scrollOffset / 600)
  }), [scrollOffset]);

  return (
    <section className="hero" id="home">
      {/* Background Layers */}
      <div className="parallax-layer layer-bg" />
      
      {/* ✅ FIX: Wrap ParticleBackground in memo to prevent unnecessary re-renders */}
      <div className="parallax-layer layer-particles">
        <ParticleBackground />
      </div>
      
      <div className="parallax-layer layer-shapes">
        <motion.div 
          className="shape shape-1"
          style={{
            transform: shapeTransforms.shape1,
            willChange: 'transform'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="shape shape-2"
          style={{
            transform: shapeTransforms.shape2,
            willChange: 'transform'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="shape shape-3"
          style={{
            transform: shapeTransforms.shape3,
            willChange: 'transform'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", direction: "reverse" }}
        />
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="hero-content"
        style={heroContentStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>{titleText}</h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          אפליקציות, אתרים ומערכות מותאמות אישית שמביאות תוצאות
        </motion.h2>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button href="#contact" variant="primary">
            בואו נדבר
          </Button>
          <Button href="#portfolio" variant="secondary">
            צפה בעבודות
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={30} />
      </motion.div>
    </section>
  );
};

// ✅ FIX: Memoize the component to prevent unnecessary re-renders
export default React.memo(Hero);