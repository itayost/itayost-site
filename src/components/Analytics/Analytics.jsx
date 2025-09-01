import { useEffect } from 'react';
import { trackEvent } from '../../utils/analytics';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const Analytics = () => {
  useEffect(() => {
    // Only initialize if GA ID is provided
    if (!GA_MEASUREMENT_ID) {
      console.log('Google Analytics ID not configured');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Track 25%, 50%, 75%, and 100% scroll milestones
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        if ([25, 50, 75, 100].includes(scrollPercentage)) {
          trackEvent('scroll_depth', 'Engagement', `${scrollPercentage}%`);
        }
      }
    };

    // Debounced scroll tracking
    let scrollTimer;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(trackScrollDepth, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return null;
};

export default Analytics;