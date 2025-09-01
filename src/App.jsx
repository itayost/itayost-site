// src/App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import LazySection from './components/common/LazySection';
import ScrollToTop from './components/common/ScrollToTop';
import Analytics from './components/Analytics/Analytics';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import './App.css';
import './styles/accessibility.css';

// Lazy load heavy components
const Services = lazy(() => import('./components/Services/Services'));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const Features = lazy(() => import('./components/Features/Features'));
const Process = lazy(() => import('./components/Process/Process'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const WhatsAppFAB = lazy(() => import('./components/WhatsAppFAB/WhatsAppFAB'));

function App() {
  useKeyboardNavigation();

  useEffect(() => {
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-main';
    skipLink.textContent = 'דלג לתוכן הראשי';
    skipLink.setAttribute('aria-label', 'דלג לתוכן הראשי');
    document.body.insertBefore(skipLink, document.body.firstChild);

    return () => {
      if (skipLink.parentNode) {
        skipLink.parentNode.removeChild(skipLink);
      }
    };
  }, []);

  return (
    <div className="App">
      <Analytics />
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Hero />
      
      <LazySection>
        <Services />
      </LazySection>
      
      <LazySection>
        <Portfolio />
      </LazySection>
      
      <LazySection>
        <Features />
      </LazySection>
      
      <LazySection>
        <Process />
      </LazySection>
      
      <LazySection>
        <Contact />
      </LazySection>
      
      <LazySection>
        <Footer />
      </LazySection>
      </main>
      
      <Suspense fallback={null}>
        <WhatsAppFAB />
      </Suspense>
      
      <ScrollToTop />
    </div>
  );
}

export default App;