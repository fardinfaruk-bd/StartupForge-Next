'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StartupCard from '../ui/StartupCard';

export default function AnimatedStartupGrid({ startups }) {
  // Staggered sequence configuration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Smooth time stagger between cards
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers when the layout comes into view
    >
      {startups.map((startup) => (
        <motion.div key={startup._id?.$oid || startup._id} variants={itemVariants}>
          <StartupCard startup={startup} />
        </motion.div>
      ))}
    </motion.div>
  );
}