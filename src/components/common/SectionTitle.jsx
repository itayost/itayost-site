import React from 'react';
import { motion } from 'framer-motion';
import './SectionTitle.css';

const SectionTitle = ({ children, className = '' }) => {
  return (
    <motion.h2 
      className={`section-title ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;