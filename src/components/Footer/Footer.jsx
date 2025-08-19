import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <motion.div 
          className="footer-logo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {SITE_CONFIG.name}
        </motion.div>
        <motion.div 
          className="social-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a 
            href={SITE_CONFIG.social.email}
            aria-label="Email"
            whileHover={{ y: -5, color: 'var(--secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <Mail size={24} />
          </motion.a>
          <motion.a 
            href={SITE_CONFIG.social.linkedin}
            aria-label="LinkedIn"
            whileHover={{ y: -5, color: 'var(--secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a 
            href={SITE_CONFIG.social.github}
            aria-label="GitHub"
            whileHover={{ y: -5, color: 'var(--secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <Github size={24} />
          </motion.a>
          <motion.a 
            href={`tel:${SITE_CONFIG.phone}`}
            aria-label="Phone"
            whileHover={{ y: -5, color: 'var(--secondary)' }}
            transition={{ duration: 0.3 }}
          >
            <Phone size={24} />
          </motion.a>
        </motion.div>
        <motion.div 
          className="copyright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          © {currentYear} {SITE_CONFIG.name}. כל הזכויות שמורות.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;