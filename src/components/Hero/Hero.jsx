import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import ParticleBackground from '../common/ParticleBackground';
import { useScrollParallax } from '../../hooks/useScrollParallax';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import './Hero.css';

const Hero = () => {
  const scrollOffset = useScrollParallax(0.5);
  const mousePosition = useMouseParallax();
  const [titleText, setTitleText] = useState('');
  const fullTitle = 'פיתוח דיגיטלי שמניע את העסק שלך קדימה';

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
  }, []);

  return (
    <section className="hero" id="home">
      {/* Background Layers */}
      <div className="parallax-layer layer-bg" />
      
      <div className="parallax-layer layer-particles">
        <ParticleBackground />
      </div>
      
      <div className="parallax-layer layer-shapes">
        <motion.div 
          className="shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(45deg)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) rotate(30deg)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", direction: "reverse" }}
        />
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="hero-content"
        style={{
          transform: `translateY(${scrollOffset}px)`,
          opacity: 1 - scrollOffset / 600
        }}
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

export default Hero;