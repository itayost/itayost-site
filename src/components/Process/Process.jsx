import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { processData } from '../../data/process';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Process.css';

const ProcessItem = ({ item, index }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`process-item ${isEven ? 'even' : 'odd'}`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="process-number">{item.number}</div>
      <motion.div 
        className="process-content"
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      >
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

const Process = () => {
  return (
    <section className="process" id="process">
      <div className="container">
        <SectionTitle>איך זה עובד?</SectionTitle>
        <div className="process-timeline">
          {processData.map((item, index) => (
            <ProcessItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;