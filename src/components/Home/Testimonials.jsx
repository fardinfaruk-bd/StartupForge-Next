"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aisha Rahman",
    role: "Frontend Engineer",
    company: "NovaPay",
    avatar: "AR",
    avatarColor: "#0DFFCA",
    avatarBg: "rgba(13,255,202,0.15)",
    rating: 5,
    text: "StartupForge connected me with NovaPay in under a week. The quality of the listing was incredible — clear equity terms, real vision, no fluff. Best career move I've ever made.",
    accentColor: "rgba(13,255,202,0.1)",
    borderColor: "rgba(13,255,202,0.18)",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Startup Founder",
    company: "Launchpad AI",
    avatar: "MC",
    avatarColor: "#6C8EFF",
    avatarBg: "rgba(108,142,255,0.15)",
    rating: 5,
    text: "We hired 3 senior engineers and a product designer through StartupForge within our first month. The talent pool is phenomenal — every applicant was genuinely interested in our mission.",
    accentColor: "rgba(108,142,255,0.1)",
    borderColor: "rgba(108,142,255,0.18)",
  },
  {
    id: 3,
    name: "Sofia Mendez",
    role: "Product Manager",
    company: "GreenStack",
    avatar: "SM",
    avatarColor: "#FFD060",
    avatarBg: "rgba(255,208,96,0.15)",
    rating: 5,
    text: "I was sceptical at first, but StartupForge delivered. The role matched my exact experience and the team at GreenStack is exceptional. Found my dream job in a climate-tech startup!",
    accentColor: "rgba(255,208,96,0.1)",
    borderColor: "rgba(255,208,96,0.18)",
  },
  {
    id: 4,
    name: "James Okafor",
    role: "DevOps Engineer",
    company: "DataForge",
    avatar: "JO",
    avatarColor: "#FF7A5C",
    avatarBg: "rgba(255,122,92,0.15)",
    rating: 5,
    text: "The application process is sleek and efficient. No endless back-and-forth — I got a call within 48 hours of applying. StartupForge is what modern hiring should look like.",
    accentColor: "rgba(255,122,92,0.1)",
    borderColor: "rgba(255,122,92,0.18)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="#FFD060" style={{ color: "#FFD060" }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="w-full py-24 px-6 overflow-hidden"
      style={{ background: "var(--sf-navy-mid)" }}
    >
      <div className="w-full max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-5"
            style={{
              background: "rgba(13,255,202,0.07)",
              borderColor: "rgba(13,255,202,0.2)",
              color: "#0DFFCA",
            }}
          >
            Trusted by Builders
          </span>
          <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight leading-[1.15]">
            What Our Community{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0DFFCA, #6C8EFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Says
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Founders and contributors who've found their perfect match on StartupForge.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              className="group relative flex flex-col rounded-2xl p-6 border overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: t.borderColor,
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Corner glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${t.accentColor} 0%, transparent 60%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${t.avatarColor}, transparent)`,
                }}
              />

              {/* Quote icon */}
              <Quote
                size={28}
                style={{ color: t.avatarColor, opacity: 0.25 }}
                className="mb-4 shrink-0"
              />

              {/* Testimonial text */}
              <p className="text-gray-300 text-sm leading-[1.75] flex-1 mb-6">
                "{t.text}"
              </p>

              {/* Footer: avatar + info + stars */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: t.avatarBg, color: t.avatarColor }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                <StarRating count={t.rating} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "2,400+", label: "Happy Users" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-white font-bold text-2xl tracking-tight" style={{ color: "#0DFFCA" }}>
                {stat.value}
              </span>
              <span className="text-gray-500 text-xs mt-1 tracking-wide uppercase font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
