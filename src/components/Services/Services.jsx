import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { servicesData } from '../../data/services';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Services.css';

const ServiceCard = ({ service, index }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.02,
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="service-icon"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {service.icon}
      </motion.div>
      <h3>{service.title}</h3>
      <ul className="service-list">
        {service.items.map((item, i) => (
          <motion.li 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2 + i * 0.1 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="services" id="services">
      <div className="container">
        <SectionTitle>תחומי התמחות</SectionTitle>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;