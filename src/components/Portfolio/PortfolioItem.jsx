import React from 'react';
import { motion } from 'framer-motion';

const PortfolioItem = ({ project }) => {
  return (
    <motion.div
      className="portfolio-item"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="portfolio-image">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <span className="portfolio-placeholder">תמונת פרויקט</span>
        )}
      </div>
      <div className="portfolio-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;