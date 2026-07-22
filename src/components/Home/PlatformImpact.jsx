"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function PlatformImpact({ rawStats }) {
  // Stagger configurations for the parent grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const formatStatCount = (num) => {
    const value = Number(num);
    if (isNaN(value) || value < 0) return "0";
    if (value < 5) return `${value}`;
    if (value < 10) return `${Math.floor(value / 5) * 5}+`;
    return `${Math.floor(value / 10) * 10}+`;
  };

  // Upward spring fade for cards
  const cardVariants = {
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
    <section className="w-full bg-[#f0f5ff] py-16 px-6 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto text-center">
        
        {/* Header Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-[#002447] font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight">
            Platform Growth & Impact
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3 font-normal">
            Real-time insights into the StartupForge ecosystem.
          </p>
        </motion.div>

        {/* Animated Cards Grid Container */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          
          {/* Card 1: Active Startups */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]"
          >
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              ACTIVE STARTUPS
            </span>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                {formatStatCount(rawStats?.stats?.activeStartups)}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Total Opportunities */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]"
          >
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              TOTAL OPPORTUNITIES
            </span>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                {formatStatCount(rawStats?.stats?.totalOpportunities)}
              </span>
              <span className="px-2 py-0.5 text-[11px] font-bold text-[#0f6c61] bg-[#e6f4f1] rounded-md">
                New
              </span>
            </div>
          </motion.div>

          {/* Card 3: Total Funding Raised */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]"
          >
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              TOTAL FUNDING RAISED
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[#0f6c61] font-bold text-3xl tracking-tight">
                {formatStatCount(rawStats?.stats?.totalFundingRaised)}
              </span>
              <TrendingUp size={20} className="text-[#0f6c61]" strokeWidth={2.5} />
            </div>
          </motion.div>

          {/* Card 4: Successful Matches */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-xl p-6 shadow-xs border border-gray-100/50 flex flex-col justify-between min-h-[130px]"
          >
            <span className="text-gray-400 font-bold text-[11px] tracking-widest uppercase">
              SUCCESSFUL MATCHES
            </span>
            <div className="flex flex-col mt-2">
              <span className="text-[#002447] font-bold text-3xl tracking-tight">
                {formatStatCount(rawStats?.stats?.totalAcceptedApplications)}
              </span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}