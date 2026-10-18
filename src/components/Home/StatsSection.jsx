"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Users, HandCoins } from "lucide-react";

/* ── Animated count-up hook ─────────────────────── */
function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(String(target).replace(/\D/g, ""), 10) || 0;
  const suffix = String(target).replace(/[0-9]/g, "");

  useEffect(() => {
    if (!active || numericTarget === 0) return;
    let start = 0;
    const stepTime = Math.max(16, Math.floor(duration / numericTarget));
    const timer = setInterval(() => {
      start += Math.ceil(numericTarget / (duration / 16));
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, numericTarget, duration]);

  return numericTarget === 0 ? "0" : `${count}${suffix}`;
}

/* ── Individual stat card ───────────────────────── */
function StatCard({ stat, index, active }) {
  const IconComponent = stat.icon;
  const displayValue = useCountUp(stat.value, 1600, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex flex-col items-center justify-center text-center p-8 rounded-2xl border relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(13,255,202,0.12)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Corner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(13,255,202,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Icon */}
      <div
        className="mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "rgba(13,255,202,0.08)",
          border: "1px solid rgba(13,255,202,0.2)",
        }}
      >
        <IconComponent
          size={26}
          strokeWidth={2}
          style={{ color: "#0DFFCA" }}
        />
      </div>

      {/* Animated number */}
      <span
        className="font-bold text-5xl tracking-tight leading-none"
        style={{ color: "#0DFFCA" }}
      >
        {displayValue}
      </span>

      {/* Label */}
      <span className="mt-3 text-xs font-bold tracking-widest uppercase text-gray-400">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────── */
export default function StatsSection({ rawStats }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const formatStatCount = (num) => {
    const value = Number(num);
    if (isNaN(value) || value < 0) return "0";
    if (value < 5) return `${value}`;
    if (value < 10) return `${Math.floor(value / 5) * 5}+`;
    return `${Math.floor(value / 10) * 10}+`;
  };

  const stats = [
    {
      id: 1,
      value: formatStatCount(rawStats?.stats?.totalStartups),
      label: "Startups Built",
      icon: Rocket,
    },
    {
      id: 2,
      value: formatStatCount(rawStats?.stats?.totalAcceptedApplications),
      label: "Talent Placed",
      icon: Users,
    },
    {
      id: 3,
      value: formatStatCount(rawStats?.stats?.totalFundingRaised),
      label: "Funding Raised",
      icon: HandCoins,
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full py-20 px-6 flex justify-center items-center overflow-hidden"
      style={{ background: "var(--sf-navy-mid)" }}
    >
      {/* Section label */}
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4"
            style={{
              background: "rgba(13,255,202,0.07)",
              borderColor: "rgba(13,255,202,0.2)",
              color: "#0DFFCA",
            }}
          >
            By the Numbers
          </span>
          <h2 className="text-white font-bold text-3xl sm:text-4xl tracking-tight">
            Real Impact, Real Results
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of founders and contributors already building the next generation of startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}