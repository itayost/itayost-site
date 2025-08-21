// src/components/Contact/Contact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Instagram 
} from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { SITE_CONFIG } from '../../utils/constants';
import './Contact.css';

const Contact = () => {
  // WhatsApp SVG Icon Component
  const WhatsAppIcon = ({ size = 24, ...props }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      link: SITE_CONFIG.social.whatsapp,
      color: '#25D366',
      hoverColor: 'rgba(37, 211, 102, 0.1)',
      label: 'שלחו הודעה'
    },
    {
      id: 'phone',
      name: 'טלפון',
      icon: Phone,
      link: `tel:+972544994417`,
      color: '#64FFDA',
      hoverColor: 'rgba(100, 255, 218, 0.1)',
      label: '054-499-4417'
    },
    {
      id: 'email',
      name: 'אימייל',
      icon: Mail,
      link: SITE_CONFIG.social.email,
      color: '#FF6B6B',
      hoverColor: 'rgba(255, 107, 107, 0.1)',
      label: 'itayost1@gmail.com'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      link: SITE_CONFIG.social.linkedin,
      color: '#0077B5',
      hoverColor: 'rgba(0, 119, 181, 0.1)',
      label: 'פרופיל מקצועי'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      link: SITE_CONFIG.social.facebook,
      color: '#1877F2',
      hoverColor: 'rgba(24, 119, 242, 0.1)',
      label: 'עמוד הפייסבוק'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      link: SITE_CONFIG.social.instagram,
      color: '#E4405F',
      hoverColor: 'rgba(228, 64, 95, 0.1)',
      label: 'עקבו אחרי'
    }
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <SectionTitle>בואו נדבר</SectionTitle>
        <motion.p 
          className="contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          מוכן להפוך את הרעיון שלכם למציאות דיגיטלית?<br />
          צרו קשר בכל דרך שנוחה לכם
        </motion.p>

        <motion.div 
          className="contact-methods"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.id}
                href={method.link}
                target={method.id !== 'phone' ? '_blank' : undefined}
                rel={method.id !== 'phone' ? 'noopener noreferrer' : undefined}
                className="contact-method-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  '--hover-color': method.hoverColor,
                  '--accent-color': method.color
                }}
              >
                <motion.div 
                  className="contact-icon-wrapper"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={32} style={{ color: method.color }} />
                </motion.div>
                <div className="contact-method-info">
                  <h3>{method.name}</h3>
                  <p>{method.label}</p>
                </div>
                <motion.div 
                  className="contact-arrow"
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                >
                  ←
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Contact);