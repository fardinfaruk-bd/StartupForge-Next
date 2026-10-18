"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Building2, Briefcase, HandCoins, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

function useCountUp(target, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(String(target).replace(/\D/g, ""), 10) || 0;
  const suffix = String(target).replace(/[0-9]/g, "");

  useEffect(() => {
    if (!active || numericTarget === 0) return;
    let start = 0;
    const timer = setInterval(() => {
      start += Math.ceil(numericTarget / (duration / 16));
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, numericTarget, duration]);

  return numericTarget === 0 ? "0" : `${count}${suffix}`;
}

function ImpactCard({ label, rawValue, icon: Icon, accent = "#0DFFCA", accentRgb = "13,255,202", badge, index, active }) {
  const formatStatCount = (num) => {
    const value = Number(num);
    if (isNaN(value) || value < 0) return "0";
    if (value < 5) return `${value}`;
    if (value < 10) return `${Math.floor(value / 5) * 5}+`;
    return `${Math.floor(value / 10) * 10}+`;
  };
  const formatted = formatStatCount(rawValue);
  const display = useCountUp(formatted, 1600, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative rounded-2xl p-6 border overflow-hidden flex flex-col justify-between min-h-[150px]"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Left accent border on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: accent }}
      />
      {/* Bottom glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(${accentRgb},0.08) 0%, transparent 70%)` }}
      />

      <div className="flex items-start justify-between">
        <span className="text-gray-500 font-bold text-[11px] tracking-widest uppercase">
          {label}
        </span>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.2)` }}
        >
          <Icon size={16} strokeWidth={2} style={{ color: accent }} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mt-3">
        <span className="font-bold text-3xl tracking-tight" style={{ color: accent }}>
          {display}
        </span>
        {badge && (
          <span
            className="px-2 py-0.5 text-[10px] font-bold rounded-md"
            style={{ color: accent, background: `rgba(${accentRgb},0.12)` }}
          >
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function PlatformImpact({ rawStats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const cards = [
    { label: "Active Startups",       rawValue: rawStats?.stats?.activeStartups,             icon: Building2,   accent: "#0DFFCA", accentRgb: "13,255,202"   },
    { label: "Total Opportunities",   rawValue: rawStats?.stats?.totalOpportunities,          icon: Briefcase,   accent: "#6C8EFF", accentRgb: "108,142,255", badge: "New" },
    { label: "Total Funding Raised",  rawValue: rawStats?.stats?.totalFundingRaised,          icon: HandCoins,   accent: "#FFD060", accentRgb: "255,208,96"   },
    { label: "Successful Matches",    rawValue: rawStats?.stats?.totalAcceptedApplications,   icon: CheckCircle2, accent: "#FF7A5C", accentRgb: "255,122,92"  },
  ];

  return (
    <section
      ref={ref}
      className="w-full py-20 px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "var(--sf-navy)" }}
    >
      <div className="w-full max-w-7xl mx-auto">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4"
            style={{
              background: "rgba(13,255,202,0.07)",
              borderColor: "rgba(13,255,202,0.2)",
              color: "#0DFFCA",
            }}
          >
            <TrendingUp size={12} strokeWidth={2.5} />
            Platform Metrics
          </span>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-[40px] tracking-tight">
            Platform Growth &amp; Impact
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3">
            Real-time insights into the StartupForge ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <ImpactCard key={card.label} {...card} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}