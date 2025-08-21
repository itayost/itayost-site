// src/components/Navbar/Navbar.jsx
import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../utils/constants';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const createNavbar = () => {
      // Inject CSS fixes FIRST (same as FAB)
      if (!document.getElementById('navbar-fixes-style')) {
        const fixStyles = document.createElement('style');
        fixStyles.id = 'navbar-fixes-style';
        fixStyles.textContent = `
          /* Fix CSS properties that break fixed positioning */
          html, body {
            transform: none !important;
            perspective: none !important;
            transform-style: flat !important;
            filter: none !important;
            backdrop-filter: none !important;
            will-change: auto !important;
            contain: none !important;
          }
        `;
        document.head.appendChild(fixStyles);
      }

      // Remove existing navbar if any
      const existingNavbar = document.getElementById('navbar-simple-fixed');
      if (existingNavbar) {
        existingNavbar.remove();
      }

      // Create navbar element
      const navbar = document.createElement('nav');
      navbar.id = 'navbar-simple-fixed';
      navbar.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        background: rgba(10, 25, 47, 0.95) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid rgba(100, 255, 218, 0.1) !important;
        z-index: 999990 !important;
        padding: 1.2rem 0 !important;
        transition: all 0.3s ease !important;
        transform: none !important;
        filter: none !important;
        contain: none !important;
        will-change: auto !important;
      `;

      // Create container
      const container = document.createElement('div');
      container.style.cssText = `
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `;

      // Create logo
      const logo = document.createElement('a');
      logo.href = '#';
      logo.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #64FFDA;
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
      `;
      logo.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <span>${SITE_CONFIG.name}</span>
      `;

      // Create contact button
      const contactBtn = document.createElement('a');
      contactBtn.href = '#contact';
      contactBtn.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.7rem 1.8rem;
        background: linear-gradient(135deg, #64FFDA 0%, #4AC9B0 100%);
        color: #0A192F;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        cursor: pointer;
      `;
      contactBtn.innerHTML = `
        <span>בואו נדבר</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;

      // Assemble navbar
      container.appendChild(logo);
      container.appendChild(contactBtn);
      navbar.appendChild(container);

      // Append to body
      document.body.appendChild(navbar);

      // Add scroll effect
      const handleScroll = () => {
        if (window.scrollY > 50) {
          navbar.style.padding = '0.8rem 0';
          navbar.style.background = 'rgba(10, 25, 47, 0.98)';
          navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.padding = '1.2rem 0';
          navbar.style.background = 'rgba(10, 25, 47, 0.95)';
          navbar.style.boxShadow = 'none';
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Add hover effects
      logo.addEventListener('mouseenter', () => {
        logo.style.color = '#4AC9B0';
        logo.style.transform = 'translateY(-2px)';
      });

      logo.addEventListener('mouseleave', () => {
        logo.style.color = '#64FFDA';
        logo.style.transform = 'translateY(0)';
      });

      contactBtn.addEventListener('mouseenter', () => {
        contactBtn.style.transform = 'translateY(-2px)';
        contactBtn.style.boxShadow = '0 8px 20px rgba(100, 255, 218, 0.3)';
      });

      contactBtn.addEventListener('mouseleave', () => {
        contactBtn.style.transform = 'translateY(0)';
        contactBtn.style.boxShadow = 'none';
      });

      // Handle clicks
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const offsetTop = contactSection.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });

      // Mobile responsive adjustments
      const applyMobileStyles = () => {
        if (window.innerWidth <= 768) {
          container.style.padding = '0 1rem';
          logo.style.fontSize = '1.2rem';
          contactBtn.style.padding = '0.6rem 1.2rem';
          contactBtn.style.fontSize = '0.95rem';
          
          const svg = logo.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '24');
            svg.setAttribute('height', '24');
          }
        } else {
          container.style.padding = '0 2rem';
          logo.style.fontSize = '1.5rem';
          contactBtn.style.padding = '0.7rem 1.8rem';
          contactBtn.style.fontSize = '1rem';
          
          const svg = logo.querySelector('svg');
          if (svg) {
            svg.setAttribute('width', '28');
            svg.setAttribute('height', '28');
          }
        }
      };

      // Apply mobile styles on load and resize
      applyMobileStyles();
      window.addEventListener('resize', applyMobileStyles);
    };

    // Create navbar after DOM is ready
    if (document.readyState === 'complete') {
      createNavbar();
    } else {
      window.addEventListener('load', createNavbar);
    }

    // Cleanup
    return () => {
      const navbar = document.getElementById('navbar-simple-fixed');
      const styles = document.getElementById('navbar-fixes-style');
      if (navbar) navbar.remove();
      if (styles) styles.remove();
    };
  }, []);

  // Return null - everything is handled with vanilla JS
  return null;
};

export default Navbar;