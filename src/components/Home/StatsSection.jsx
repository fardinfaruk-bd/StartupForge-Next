"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Rocket, Users, HandCoins } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "500+",
      label: "STARTUPS BUILT",
      icon: Rocket,
    },
    {
      id: 2,
      value: "12k+",
      label: "TALENT PLACED",
      icon: Users,
    },
    {
      id: 3,
      value: "$2.4B",
      label: "FUNDING RAISED",
      icon: HandCoins,
    },
  ];

  // Container variants to cascade the animations down to each item sequentially
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each item animation
      },
    },
  };

  // Individual item variants for fading and sliding up
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  return (
    <section className="w-full bg-[#f0f5ff] py-12 sm:py-16 px-6 flex justify-center items-center overflow-hidden">
      <motion.div 
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
      >
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }} // Smooth hover lift and scale
              className="group flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Responsive Icon container */}
              <div className="mb-3 text-[#0a6c61]/80 group-hover:text-[#0a6c61] transition-colors duration-300">
                <IconComponent size={28} strokeWidth={2} />
              </div>

              {/* Statistic Big Number */}
              <span className="text-[#0a6c61] font-bold text-4xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                {stat.value}
              </span>

              {/* Statistic Label */}
              <span className="mt-2 text-[#4a5568] font-bold text-xs md:text-sm tracking-widest uppercase opacity-90">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}