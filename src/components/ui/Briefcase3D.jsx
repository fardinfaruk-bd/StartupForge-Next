"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Briefcase3D({ size = 200 }) {
  // Floating energy spark particles rising from the briefcase
  const sparks = [
    { id: 1, x: -28, delay: 0, duration: 2.4, size: 6, color: "#0DFFCA" },
    { id: 2, x: 22, delay: 0.6, duration: 2.8, size: 8, color: "#6C8EFF" },
    { id: 3, x: -8, delay: 1.2, duration: 2.2, size: 5, color: "#FFD060" },
    { id: 4, x: 34, delay: 1.8, duration: 2.6, size: 7, color: "#0DFFCA" },
    { id: 5, x: -38, delay: 0.9, duration: 2.5, size: 6, color: "#6C8EFF" },
  ];

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        width: size,
        height: size,
        perspective: 1200,
      }}
    >
      {/* ── Ambient Radial Backlight Glow ── */}
      <motion.div
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(13,255,202,0.28) 0%, rgba(108,142,255,0.15) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={{
          scale: [0.9, 1.25, 0.9],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Rising Career Sparks (Emanating from Briefcase) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute rounded-full"
            style={{
              width: spark.size,
              height: spark.size,
              left: `calc(50% + ${spark.x}px)`,
              bottom: "48%",
              background: spark.color,
              boxShadow: `0 0 10px ${spark.color}, 0 0 20px ${spark.color}`,
            }}
            animate={{
              y: [-10, -90],
              opacity: [0, 1, 0],
              scale: [0.6, 1.2, 0.2],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ── 3D Floating Briefcase Body ── */}
      <motion.div
        className="relative z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-12, 10, -12],
          rotateX: [8, -4, 8],
          rotateY: [-16, 16, -16],
          rotateZ: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width={size * 0.9}
          height={size * 0.75}
          viewBox="0 0 240 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14243B" />
              <stop offset="50%" stopColor="#0B1526" />
              <stop offset="100%" stopColor="#050C18" />
            </linearGradient>

            <linearGradient id="lidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3352" />
              <stop offset="60%" stopColor="#101F35" />
              <stop offset="100%" stopColor="#091322" />
            </linearGradient>

            <linearGradient id="tealTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0DFFCA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#6C8EFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0DFFCA" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="35%" stopColor="#94A3B8" />
              <stop offset="70%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFD060" />
              <stop offset="100%" stopColor="#C99700" />
            </linearGradient>

            <linearGradient id="handleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A4365" />
              <stop offset="50%" stopColor="#1A202C" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── HANDLE (Top Layer) ── */}
          <g>
            {/* Handle Base Brackets / Anchors */}
            <rect x="88" y="34" width="12" height="14" rx="3" fill="url(#metalChrome)" stroke="#0DFFCA" strokeWidth="0.8" />
            <rect x="140" y="34" width="12" height="14" rx="3" fill="url(#metalChrome)" stroke="#0DFFCA" strokeWidth="0.8" />
            
            {/* Handle Hinge Rings */}
            <circle cx="94" cy="40" r="3" fill="#0B1526" stroke="url(#metalChrome)" strokeWidth="1.5" />
            <circle cx="146" cy="40" r="3" fill="#0B1526" stroke="url(#metalChrome)" strokeWidth="1.5" />

            {/* Arch Handle with 3D Depth */}
            <path
              d="M 94 38 C 94 14, 146 14, 146 38"
              stroke="#070E1A"
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 94 38 C 94 14, 146 14, 146 38"
              stroke="url(#handleGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Handle Grip Highlight */}
            <path
              d="M 104 20 C 114 16, 126 16, 136 20"
              stroke="#0DFFCA"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ── MAIN BRIEFCASE BODY ── */}
          <g>
            {/* Outer Case Drop Shadow */}
            <rect
              x="22"
              y="44"
              width="196"
              height="142"
              rx="18"
              fill="#000000"
              fillOpacity="0.45"
            />

            {/* Main Outer Shell with Glowing Edge */}
            <rect
              x="20"
              y="42"
              width="200"
              height="144"
              rx="18"
              fill="url(#bodyGrad)"
              stroke="url(#tealTrimGrad)"
              strokeWidth="1.8"
            />

            {/* Subtle Textured Grid pattern on face */}
            <g opacity="0.04">
              <line x1="20" y1="70" x2="220" y2="70" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="20" y1="100" x2="220" y2="100" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="20" y1="130" x2="220" y2="130" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="20" y1="160" x2="220" y2="160" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="70" y1="42" x2="70" y2="186" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="120" y1="42" x2="120" y2="186" stroke="#FFFFFF" strokeWidth="1" />
              <line x1="170" y1="42" x2="170" y2="186" stroke="#FFFFFF" strokeWidth="1" />
            </g>

            {/* Outer Bevel Highlight */}
            <rect
              x="24"
              y="46"
              width="192"
              height="136"
              rx="14"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />

            {/* ── REINFORCED 3D CORNERS ── */}
            {/* Top Left */}
            <path d="M 21 62 L 21 54 A 12 12 0 0 1 33 42 L 41 42" stroke="url(#metalChrome)" strokeWidth="3" fill="none" />
            <circle cx="28" cy="49" r="1.5" fill="#0DFFCA" />

            {/* Top Right */}
            <path d="M 199 42 L 207 42 A 12 12 0 0 1 219 54 L 219 62" stroke="url(#metalChrome)" strokeWidth="3" fill="none" />
            <circle cx="212" cy="49" r="1.5" fill="#0DFFCA" />

            {/* Bottom Left */}
            <path d="M 21 166 L 21 174 A 12 12 0 0 0 33 186 L 41 186" stroke="url(#metalChrome)" strokeWidth="3" fill="none" />
            <circle cx="28" cy="179" r="1.5" fill="#0DFFCA" />

            {/* Bottom Right */}
            <path d="M 199 186 L 207 186 A 12 12 0 0 0 219 174 L 219 166" stroke="url(#metalChrome)" strokeWidth="3" fill="none" />
            <circle cx="212" cy="179" r="1.5" fill="#0DFFCA" />

            {/* ── TOP LID / FLAP (Overlapping with 3D Depth) ── */}
            <path
              d="M 20 44 L 220 44 L 220 98 Q 120 112 20 98 Z"
              fill="url(#lidGrad)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Flap Bottom Border Accent */}
            <path
              d="M 20 98 Q 120 112 220 98"
              stroke="url(#tealTrimGrad)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Internal Glowing Seam (Between Lid and Lower Case) */}
            <path
              d="M 30 100 Q 120 113 210 100"
              stroke="#0DFFCA"
              strokeWidth="2.5"
              strokeOpacity="0.8"
              filter="url(#neonGlow)"
              fill="none"
            />

            {/* Horizontal Tech Accent Line */}
            <line
              x1="26"
              y1="138"
              x2="214"
              y2="138"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* ── METALLIC DUAL FRONT LATCHES ── */}
            {/* Left Latch */}
            <g>
              <rect x="58" y="86" width="16" height="26" rx="4" fill="url(#metalChrome)" stroke="#0F172A" strokeWidth="0.8" />
              <rect x="62" y="90" width="8" height="18" rx="2" fill="url(#goldBrass)" />
              <circle cx="66" cy="98" r="1.5" fill="#0DFFCA" filter="url(#neonGlow)" />
            </g>

            {/* Right Latch */}
            <g>
              <rect x="166" y="86" width="16" height="26" rx="4" fill="url(#metalChrome)" stroke="#0F172A" strokeWidth="0.8" />
              <rect x="170" y="90" width="8" height="18" rx="2" fill="url(#goldBrass)" />
              <circle cx="174" cy="98" r="1.5" fill="#0DFFCA" filter="url(#neonGlow)" />
            </g>

            {/* ── CENTER BIOMETRIC / NEON LOCK BADGE ── */}
            <g>
              {/* Outer Badge Plate */}
              <rect x="104" y="92" width="32" height="30" rx="7" fill="#0B1320" stroke="url(#metalChrome)" strokeWidth="1.2" />
              
              {/* Glowing Indicator Ring */}
              <circle cx="120" cy="107" r="8" fill="#06101E" stroke="#0DFFCA" strokeWidth="1.5" filter="url(#neonGlow)" />
              
              {/* Core Pulsing Keyhole / Energy Center */}
              <circle cx="120" cy="107" r="3.5" fill="#0DFFCA" />
              <rect x="119" y="107" width="2" height="4" fill="#0DFFCA" />
            </g>

            {/* ── EMBOSSED "STARTUPFORGE" BRAND PLATE ── */}
            <g>
              <rect
                x="80"
                y="152"
                width="80"
                height="14"
                rx="3"
                fill="#050C16"
                stroke="rgba(13,255,202,0.25)"
                strokeWidth="0.8"
              />
              <text
                x="120"
                y="162"
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="sans-serif"
                fontWeight="700"
                letterSpacing="1.8"
                fill="#0DFFCA"
                opacity="0.9"
              >
                STARTUPFORGE
              </text>
            </g>
          </g>
        </svg>
      </motion.div>

      {/* ── 3D Ground Shadow (Expands/Fades inversely with hover elevation) ── */}
      <motion.div
        className="rounded-full pointer-events-none mt-2"
        style={{
          width: size * 0.72,
          height: 18,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(13,255,202,0.08) 40%, transparent 75%)",
          filter: "blur(6px)",
        }}
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
