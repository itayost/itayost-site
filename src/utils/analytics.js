// Analytics helper functions
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const trackEvent = (action, category, label, value) => {
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackClick = (buttonName, section) => {
  trackEvent('click', 'UI', `${buttonName}_${section}`);
};

export const trackFormSubmit = (formName) => {
  trackEvent('form_submit', 'Form', formName);
};

export const trackOutboundLink = (url) => {
  trackEvent('click', 'Outbound', url);
};

export const trackWhatsAppClick = () => {
  trackEvent('click', 'Contact', 'WhatsApp_FAB');
};

export const trackPhoneClick = () => {
  trackEvent('click', 'Contact', 'Phone_Number');
};

export const trackEmailClick = () => {
  trackEvent('click', 'Contact', 'Email_Address');
};

export const trackSocialClick = (platform) => {
  trackEvent('click', 'Social', platform);
};

export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', 'Engagement', `${percentage}%`);
};