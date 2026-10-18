'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpportunityCard from '../ui/OpportunityCard';
import { Sparkles, Layers } from 'lucide-react';

const CATEGORIES = [
  { id: "all", label: "All Opportunities" },
  { id: "engineering", label: "Engineering", match: ["engineer", "developer", "software", "frontend", "backend", "fullstack", "devops", "cloud", "code", "tech"] },
  { id: "design", label: "Design", match: ["design", "ui", "ux", "product design", "figma", "graphic"] },
  { id: "product", label: "Product", match: ["product", "pm", "owner", "program", "strategy"] },
  { id: "marketing", label: "Marketing", match: ["market", "growth", "content", "seo", "brand", "social"] },
  { id: "remote", label: "Remote", typeMatch: "remote" },
  { id: "data", label: "Data & AI", match: ["data", "ai", "ml", "machine learning", "analytics", "scientist"] },
];

export default function AnimatedOpportunityGrid({ opportunities = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredOpportunities = useMemo(() => {
    if (!opportunities || opportunities.length === 0) return [];
    if (selectedCategory === "all") return opportunities;

    const catObj = CATEGORIES.find((c) => c.id === selectedCategory);
    if (!catObj) return opportunities;

    if (catObj.typeMatch) {
      return opportunities.filter(
        (opp) => opp.workType?.toLowerCase() === catObj.typeMatch
      );
    }

    if (catObj.match) {
      return opportunities.filter((opp) => {
        const title = (opp.roleTitle || "").toLowerCase();
        const skills = (opp.requiredSkills || "").toLowerCase();
        return catObj.match.some((keyword) => title.includes(keyword) || skills.includes(keyword));
      });
    }

    return opportunities;
  }, [opportunities, selectedCategory]);

  // Display count
  const displayCount = filteredOpportunities.length;

  return (
    <div className="w-full flex flex-col">
      {/* ── Interactive Category Pills with Animated Highlight ── */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="relative px-4 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer select-none focus:outline-none"
              style={{
                borderColor: isActive ? "#0DFFCA" : "rgba(255, 255, 255, 0.1)",
                color: isActive ? "#030C1B" : "#9ca3af",
                background: isActive ? "#0DFFCA" : "rgba(255, 255, 255, 0.035)",
              }}
            >
              {/* Active Tab Glow */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryGlow"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: "0 0 18px rgba(13,255,202,0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {cat.id === "all" && <Layers size={13} className={isActive ? "text-[#030C1B]" : "text-gray-400"} />}
                {cat.id === "data" && <Sparkles size={13} className={isActive ? "text-[#030C1B]" : "text-gray-400"} />}
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Count Indicator ── */}
      <div className="flex items-center justify-between text-xs text-gray-400 font-medium pl-1 mb-6">
        <span>
          Showing <span className="text-[#0DFFCA] font-semibold">{displayCount}</span> {displayCount === 1 ? 'role' : 'roles'}
          {selectedCategory !== 'all' && (
            <span> in <span className="text-white capitalize">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></span>
          )}
        </span>
      </div>

      {/* ── Main Opportunities Grid ── */}
      {displayCount > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity._id?.toString() || opportunity.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <OpportunityCard opportunity={opportunity} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md max-w-lg mx-auto w-full my-6 p-6"
        >
          <p className="text-white font-semibold text-base mb-1">
            No roles currently matched under this category
          </p>
          <p className="text-gray-400 text-xs mb-5">
            Check back soon or explore all open opportunities across other fields.
          </p>
          <button
            onClick={() => setSelectedCategory("all")}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0DFFCA]/15 text-[#0DFFCA] border border-[#0DFFCA]/30 hover:bg-[#0DFFCA]/25 transition"
          >
            Show All Opportunities
          </button>
        </motion.div>
      )}
    </div>
  );
}