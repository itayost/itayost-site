import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Check, AlertCircle, Loader } from 'lucide-react';
import { trackFormSubmit } from '../../utils/analytics';
import './ContactForm.css';

const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null); // 'loading', 'success', 'error'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitStatus('loading');
    
    try {
      // Initialize EmailJS with public key
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        console.error('EmailJS configuration missing');
        setSubmitStatus('error');
        return;
      }

      emailjs.init(publicKey);

      // Send email
      await emailjs.send(serviceId, templateId, {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'לא צוין',
        subject: data.subject,
        message: data.message,
        to_name: 'ItayOst',
      });

      // Track successful submission
      trackFormSubmit('contact_form');
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">שם מלא *</label>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: 'שם הוא שדה חובה',
                minLength: {
                  value: 2,
                  message: 'השם חייב להכיל לפחות 2 תווים'
                }
              })}
              placeholder="ישראל ישראלי"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-message">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל *</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'אימייל הוא שדה חובה',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'כתובת אימייל לא תקינה'
                }
              })}
              placeholder="example@domain.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">טלפון</label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                pattern: {
                  value: /^[0-9-+().\s]+$/,
                  message: 'מספר טלפון לא תקין'
                }
              })}
              placeholder="050-1234567"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="error-message">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="subject">נושא *</label>
            <select
              id="subject"
              {...register('subject', {
                required: 'נא לבחור נושא'
              })}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            >
              <option value="">בחר נושא...</option>
              <option value="website">פיתוח אתר</option>
              <option value="app">פיתוח אפליקציה</option>
              <option value="system">מערכת ניהול</option>
              <option value="consultation">ייעוץ</option>
              <option value="other">אחר</option>
            </select>
            {errors.subject && (
              <span id="subject-error" className="error-message">
                {errors.subject.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="message">הודעה *</label>
          <textarea
            id="message"
            {...register('message', {
              required: 'הודעה היא שדה חובה',
              minLength: {
                value: 10,
                message: 'ההודעה חייבת להכיל לפחות 10 תווים'
              }
            })}
            placeholder="ספרו לי על הפרויקט שלכם..."
            rows="5"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className="error-message">
              {errors.message.message}
            </span>
          )}
        </div>

        <motion.button
          type="submit"
          className="form-submit-btn"
          disabled={isSubmitting || submitStatus === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'loading' ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                <Loader className="spin" size={20} />
                <span>שולח...</span>
              </motion.div>
            ) : submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                <Check size={20} />
                <span>נשלח בהצלחה!</span>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                <AlertCircle size={20} />
                <span>שגיאה, נסה שוב</span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                <Send size={20} />
                <span>שלח הודעה</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            className="status-message success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Check size={24} />
            <p>תודה על פנייתך! אחזור אליך בהקדם.</p>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            className="status-message error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertCircle size={24} />
            <p>אופס! משהו השתבש. אנא נסה שוב או צור קשר ישירות.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ContactForm);