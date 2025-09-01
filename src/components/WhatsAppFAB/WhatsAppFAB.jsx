// src/components/WhatsAppFAB/WhatsAppFAB.jsx
import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../../utils/constants';
import './WhatsAppFAB.css';

const WhatsAppFAB = () => {

  useEffect(() => {
    const createFAB = () => {
      // Inject CSS fixes for fixed positioning
      const fixedPositionFixes = document.createElement('style');
      fixedPositionFixes.id = 'whatsapp-fab-position-fixes';
      fixedPositionFixes.textContent = `
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
      document.head.appendChild(fixedPositionFixes);

      // Remove any existing FAB
      const existingContainer = document.getElementById('whatsapp-fab-container');
      if (existingContainer) {
        existingContainer.remove();
      }

      // Create container for FAB and tooltip
      const container = document.createElement('div');
      container.id = 'whatsapp-fab-container';
      container.className = 'whatsapp-fab-container';

      // Create the FAB button
      const fab = document.createElement('a');
      fab.href = SITE_CONFIG.social.whatsapp;
      fab.target = '_blank';
      fab.rel = 'noopener noreferrer';
      fab.className = 'whatsapp-fab';
      fab.setAttribute('aria-label', 'Contact us on WhatsApp');
      
      // WhatsApp SVG icon
      fab.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span class="whatsapp-pulse"></span>
      `;

      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'whatsapp-tooltip';
      tooltip.innerHTML = `
        <span>זמינים לשיחה! 💬</span>
        <div class="tooltip-arrow"></div>
      `;
      tooltip.style.display = 'none';

      // Add hover events
      let hoverTimeout;
      
      fab.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        tooltip.style.display = 'block';
        setTimeout(() => {
          tooltip.classList.add('show');
        }, 10);
      });

      fab.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
        hoverTimeout = setTimeout(() => {
          tooltip.style.display = 'none';
        }, 300);
      });

      // Show tooltip automatically after 3 seconds
      setTimeout(() => {
        if (!tooltip.classList.contains('show')) {
          tooltip.style.display = 'block';
          setTimeout(() => {
            tooltip.classList.add('show');
          }, 10);
          
          // Hide after 5 seconds
          setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => {
              tooltip.style.display = 'none';
            }, 300);
          }, 5000);
        }
      }, 3000);

      // Assemble and append to body
      container.appendChild(fab);
      container.appendChild(tooltip);
      document.body.appendChild(container);

      // Add entrance animation
      setTimeout(() => {
        container.classList.add('show');
      }, 100);
    };

    // Run after page loads
    if (document.readyState === 'complete') {
      createFAB();
    } else {
      window.addEventListener('load', createFAB);
    }

    // Cleanup
    return () => {
      const container = document.getElementById('whatsapp-fab-container');
      const styles = document.getElementById('whatsapp-fab-position-fixes');
      if (container) container.remove();
      if (styles) styles.remove();
    };
  }, []);

  return null;
};

export default WhatsAppFAB;