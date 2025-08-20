// src/components/common/ParticleBackground.jsx - FIXED VERSION
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './ParticleBackground.css';

const ParticleBackground = () => {
  // ✅ FIX: Memoize particles to prevent regeneration on re-renders
  const particles = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: i * 2,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100
    })), []
  );

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -30, 30, 0],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          // ✅ FIX: Add layout props to prevent layout thrashing
          layout={false}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;