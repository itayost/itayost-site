import { useEffect } from 'react';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch(e.key) {
        // Press 'H' to go to Hero/Home
        case 'h':
        case 'H':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;

        // Press 'S' to go to Services
        case 's':
        case 'S':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const services = document.getElementById('services');
            if (services) {
              services.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          break;

        // Press 'P' to go to Portfolio
        case 'p':
        case 'P':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const portfolio = document.getElementById('portfolio');
            if (portfolio) {
              portfolio.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          break;

        // Press 'C' to go to Contact
        case 'c':
        case 'C':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const contact = document.getElementById('contact');
            if (contact) {
              contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          break;

        // Press 'Escape' to close any modals or return to top
        case 'Escape':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;

        // Tab navigation enhancement
        case 'Tab':
          // Add visible focus indicator
          document.body.classList.add('keyboard-nav');
          break;

        default:
          break;
      }
    };

    // Remove keyboard navigation class on mouse click
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-nav');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

// Skip to main content link for screen readers
export const createSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-main';
  skipLink.textContent = 'דלג לתוכן הראשי';
  skipLink.setAttribute('aria-label', 'דלג לתוכן הראשי');
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  });

  return skipLink;
};