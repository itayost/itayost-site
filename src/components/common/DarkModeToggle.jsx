import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <motion.button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? 'הפעל מצב בהיר' : 'הפעל מצב כהה'}
      title={isDarkMode ? 'עבור למצב בהיר' : 'עבור למצב כהה'}
    >
      <motion.div
        className="dark-mode-toggle__icon"
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;