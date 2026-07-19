'use client';

import React from 'react';
import { motion } from 'framer-motion';
import OpportunityCard from '../ui/OpportunityCard';

export default function AnimatedOpportunityGrid({ opportunities }) {
  // Configured staggered animation properties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Smooth staggered flow cascade
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }} // Triggers securely when scrolled into view
    >
      {opportunities.map((opportunity, index) => (
        <motion.div 
          key={opportunity._id?.toString() || opportunity.id || index} 
          variants={itemVariants}
        >
          <OpportunityCard opportunity={opportunity} />
        </motion.div>
      ))}
    </motion.div>
  );
}