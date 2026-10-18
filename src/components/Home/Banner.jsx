"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Search,
  Code,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Building2,
  DollarSign,
  Zap,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import InteractiveLucidGradient from "./InteractiveLucidGradient";

function Particle({ style, animClass }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute rounded-full pointer-events-none ${animClass}`}
      style={style}
    />
  );
}


const MARQUEE_TAGS = [
  "🧑‍💻 Frontend Engineer",
  "📊 Product Manager",
  "🎨 UI/UX Designer",
  "⚙️ Backend Developer",
  "📣 Growth Marketer",
  "🛡️ Security Engineer",
  "📱 Mobile Developer",
  "🤖 ML / AI Engineer",
  "💼 Business Analyst",
  "☁️ DevOps / Cloud",
  "✍️ Content Strategist",
  "📈 Data Scientist",
];

/* ─── Word-by-word animation ──────────────────────────── */
const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const singleWord = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroBanner() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [searchQuery, setSearchQuery] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (workTypeFilter !== "all") params.set("workType", workTypeFilter);
    router.push(`/opportunities?${params.toString()}`);
  };

  const headline = "Find Your Next Big Opportunity at a Startup";
  const words = headline.split(" ");

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--sf-navy)" }}
    >
      {/* ── INTERACTIVE LUCID GRADIENT BACKGROUND (Real-Time Mouse Reactive) ── */}
      <InteractiveLucidGradient />

      
      {/* ──────────────────FLOATING GLOW PARTICLES ──────────────────────────*/}
      <Particle
        animClass="animate-float-a"
        style={{
          width: 6,
          height: 6,
          background: "#0DFFCA",
          boxShadow: "0 0 14px 4px rgba(13,255,202,0.8)",
          top: "16%",
          left: "22%",
          opacity: 0.7,
        }}
      />
      <Particle
        animClass="animate-float-b"
        style={{
          width: 5,
          height: 5,
          background: "#6C8EFF",
          boxShadow: "0 0 12px 3px rgba(108,142,255,0.7)",
          top: "68%",
          left: "20%",
          opacity: 0.6,
        }}
      />
      <Particle
        animClass="animate-float-c"
        style={{
          width: 7,
          height: 7,
          background: "#0DFFCA",
          boxShadow: "0 0 16px 5px rgba(13,255,202,0.7)",
          top: "28%",
          right: "22%",
          opacity: 0.6,
        }}
      />
      <Particle
        animClass="animate-float-a"
        style={{
          width: 5,
          height: 5,
          background: "#FFD060",
          boxShadow: "0 0 10px 3px rgba(255,208,96,0.6)",
          top: "72%",
          right: "20%",
          opacity: 0.5,
          animationDelay: "2s",
        }}
      />

      
      {/* ─────────────────────────── 6. FOREGROUND HERO CONTENT ─────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center pt-8">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-7"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md"
            style={{
              background: "rgba(13,255,202,0.08)",
              borderColor: "rgba(13,255,202,0.28)",
              color: "#0DFFCA",
              boxShadow: "0 0 20px rgba(13,255,202,0.15)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "#0DFFCA" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "#0DFFCA" }}
              />
            </span>
            500+ Active Startup Opportunities
          </span>
        </motion.div>

        {/* Animated headline */}
        <motion.h1
          className="font-bold text-white leading-[1.08] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-[72px] max-w-[880px]"
          variants={wordVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={singleWord}
              className="inline-block mr-[0.22em]"
            >
              {word === "Startup" ? (
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #0DFFCA 0%, #6C8EFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 40px rgba(13,255,202,0.3)",
                  }}
                >
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
        >
          StartupForge connects talented professionals with high-growth startups.
          Browse roles, apply in minutes, and shape the future of global industries.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: "easeOut" }}
          className="mt-8 w-full max-w-2xl relative z-20"
        >
          <div
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl border backdrop-blur-xl transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.045)",
              borderColor: "rgba(255, 255, 255, 0.12)",
              boxShadow:
                "0 20px 40px -15px rgba(0,0,0,0.7), 0 0 24px rgba(13,255,202,0.1)",
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-3 py-2 flex-1 w-full">
              <Search size={18} className="text-[#0DFFCA] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Role title, tech stack (e.g. React, Python), or company..."
                className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-full"
              />
            </div>

            {/* WorkType Select Dropdown */}
            <div className="flex items-center w-full sm:w-auto px-2">
              <select
                value={workTypeFilter}
                onChange={(e) => setWorkTypeFilter(e.target.value)}
                className="bg-white/[0.06] border border-white/10 text-gray-200 text-xs rounded-xl px-3 py-2.5 outline-none cursor-pointer hover:border-[#0DFFCA]/40 transition"
              >
                <option value="all" className="bg-[#091528] text-white">All Locations</option>
                <option value="remote" className="bg-[#091528] text-white">Remote</option>
                <option value="hybrid" className="bg-[#091528] text-white">Hybrid</option>
                <option value="onsite" className="bg-[#091528] text-white">On-site</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-[44px] rounded-xl font-semibold text-sm text-[#030C1B] transition-transform hover:scale-105 shrink-0"
              style={{
                background: "#0DFFCA",
                boxShadow: "0 0 20px rgba(13,255,202,0.4)",
              }}
            >
              Search Roles
              <ArrowRight size={15} strokeWidth={2.5} />
            </Button>
          </div>

          {/* Quick Keywords */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-3 text-xs text-gray-400">
            <span className="text-[#0DFFCA] font-medium">Popular:</span>
            {["Frontend", "Full stack", "Data Scientist", "UX Designer", "Cloud Engineer"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => router.push(`/opportunities?search=${encodeURIComponent(tag)}`)}
                className="text-gray-300 hover:text-[#0DFFCA] transition-colors underline-offset-2 hover:underline cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.form>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
        >
          <Link href={user ? `/dashboard/${user?.role}` : "/register"}>
            <Button
              className="inline-flex items-center gap-2 px-8 h-[52px] rounded-xl font-semibold text-[15px] text-[#030C1B] transition-transform hover:scale-105"
              style={{
                background: "#0DFFCA",
                boxShadow:
                  "0 0 28px 4px rgba(13,255,202,0.45), 0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              Get Started Free
              <ArrowRight size={16} strokeWidth={2.5} />
            </Button>
          </Link>

          <Link href="/opportunities">
            <Button
              variant="bordered"
              className="inline-flex items-center gap-2 px-8 h-[52px] rounded-xl font-semibold text-[15px] text-white backdrop-blur-md transition-all hover:bg-white/10"
              style={{
                borderColor: "rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <Search size={15} strokeWidth={2.5} />
              Browse Jobs
            </Button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-8 flex items-center gap-2.5 text-gray-400 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <span className="flex items-center gap-1 text-gray-300">
            <Zap size={12} className="text-[#0DFFCA]" />
            No credit card required
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600 inline-block" />
          <span className="text-gray-300">2-min setup</span>
          <span className="w-1 h-1 rounded-full bg-gray-600 inline-block" />
          <span className="text-gray-300">Vetted startups only</span>
        </motion.div>
      </div>

      {/* ─────────────────────── 7. LUCID FROSTED MARQUEE STRIP ─────────────────────── */}
      <motion.div
        className="relative z-10 w-full mt-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
      >
        <div
          className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--sf-navy), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--sf-navy), transparent)",
          }}
        />

        {/* Scrolling tags */}
        <div className="flex animate-marquee whitespace-nowrap py-1">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 mx-2.5 px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-md transition-all hover:border-[#0DFFCA]/40"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                color: "#d1d5db",
                flexShrink: 0,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─────────── BOTTOM SEAMLESS FADE INTO STATS SECTION ─────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--sf-navy-mid))",
        }}
      />
    </section>
  );
}