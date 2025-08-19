import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <SectionTitle>מוכנים להתחיל?</SectionTitle>
        <p className="contact-subtitle">
          בואו נבנה יחד את הפתרון הדיגיטלי המושלם לעסק שלכם
        </p>
        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-group">
            <label htmlFor="name">שם מלא</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">טלפון</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectType">סוג הפרויקט</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="">בחר סוג פרויקט</option>
              <option value="website">אתר אינטרנט</option>
              <option value="app">אפליקציה</option>
              <option value="system">מערכת עסקית</option>
              <option value="other">אחר</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">הודעה (אופציונלי)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ספרו לי קצת על הפרויקט שלכם..."
              rows="5"
            />
          </div>
          <Button type="submit" variant="primary" className="submit-btn">
            שלח פנייה
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;