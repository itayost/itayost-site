import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import PortfolioItem from './PortfolioItem';
import { portfolioData } from '../../data/portfolio';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <SectionTitle>פרויקטים שהובלתי להצלחה</SectionTitle>
        <motion.div 
          className="portfolio-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {portfolioData.map((project) => (
            <PortfolioItem key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;