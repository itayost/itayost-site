// Contact.jsx - Optimized with anti-flickering and mobile performance
import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Contact.css';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use intersection observer for form animation
  const [formRef, isFormVisible] = useIntersectionObserver({
    threshold: 0.1,
    once: true // Critical: only animate once
  });

  // Form animation variants with hardware acceleration
  const formVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 30,
      translateZ: 0,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      translateZ: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  // Form field animation variants
  const fieldVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: -20,
      translateZ: 0
    },
    visible: {
      opacity: 1,
      x: 0,
      translateZ: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  // Subtitle animation variants
  const subtitleVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 20,
      translateZ: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      translateZ: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), []);

  // Memoized change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle form submission here
      console.log('Form submitted:', formData);
      alert('תודה על פנייתך! אחזור אליך בהקדם.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      alert('אירעה שגיאה. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting]);

  // Memoize viewport settings
  const viewportSettings = useMemo(() => ({
    once: true,
    amount: 0.1,
    margin: "0px 0px -50px 0px"
  }), []);

  return (
    <section 
      className="contact" 
      id="contact"
      style={{
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="contact-container">
        <SectionTitle>מוכנים להתחיל?</SectionTitle>
        
        <motion.p 
          className="contact-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          בואו נבנה יחד את הפתרון הדיגיטלי המושלם לעסק שלכם
        </motion.p>
        
        <motion.form 
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate={isFormVisible ? "visible" : "hidden"}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div 
            className="form-group"
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <label htmlFor="name">שם מלא</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <label htmlFor="phone">טלפון</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <label htmlFor="projectType">סוג הפרויקט</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <option value="">בחר סוג פרויקט</option>
              <option value="website">אתר אינטרנט</option>
              <option value="app">אפליקציה</option>
              <option value="system">מערכת עסקית</option>
              <option value="other">אחר</option>
            </select>
          </motion.div>
          
          <motion.div 
            className="form-group"
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <label htmlFor="message">הודעה (אופציונלי)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ספרו לי קצת על הפרויקט שלכם..."
              rows="5"
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </motion.div>
          
          <motion.div
            variants={fieldVariants}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <Button 
              type="submit" 
              variant="primary" 
              className="submit-btn"
              disabled={isSubmitting}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'שולח...' : 'שלח פנייה'}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default React.memo(Contact);