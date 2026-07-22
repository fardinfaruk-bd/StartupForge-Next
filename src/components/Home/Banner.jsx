"use client";

import React, { useState } from "react";
import { Button, Link } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Explicit Swiper Core Styles
import "swiper/css";
import "swiper/css/effect-fade";
import { useSession } from "@/lib/auth-client";

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Structured slides containing unique text and its corresponding background image
  const slides = [
    {
      imgUrl: "https://i.ibb.co.com/nsZBj9d4/Startup-Forge-discussion-202606181237-2.jpg",
      title: "Build the Future, One Team Member at a Time",
      description: "StartupForge connects visionary founders with top-tier talent to build the next generation of industry-shaping startups."
    },
    {
      imgUrl: "https://i.ibb.co.com/rRsxM4Yw/Startup-Forge-discussion-202606181237-1.jpg",
      title: "Empower Your Startup Journey with Expert Talent",
      description: "Find experienced professionals who share your drive and vision. Scale your operations with confidence and precision."
    },
    {
      imgUrl: "https://i.ibb.co.com/4nMFkJ4L/Startup-Forge-discussion-202606181237.jpg",
      title: "Where Innovators and Creators Connect",
      description: "Bridging the gap between groundbreaking startup concepts and the technical execution of top-tier industry minds."
    }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    // RESPONSIVE FIX: Changed h-[80vh] to dynamic h-auto + padding on mobile, clamping to h-[85vh] on desktop to prevent text overflow.
    <section className="relative w-full min-h-[550px] sm:min-h-[600px] h-auto lg:h-[85vh] flex items-center justify-center overflow-hidden bg-white py-16 sm:py-20 lg:py-0">

      {/* 1. THE CAROUSEL BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={"fade"}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.imgUrl})` }}
              />
              {/* White mask layer matching your design mockup palette */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 2. THE FOREGROUND CONTENT LAYER */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">

        {/* ANIMATED TEXT WRAPPER (Changes on index swap) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Dynamic Headline */}
            {/* RESPONSIVE FIX: Adjusted sizes text-2xl (mobile) -> text-4xl (tablet) -> text-[56px] (desktop) */}
            <motion.h1
              variants={textVariants}
              className="text-[#002447] font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.2] sm:leading-[1.15] tracking-tight max-w-[800px]"
            >
              {slides[activeIndex].title}
            </motion.h1>

            {/* Dynamic Subtitle description */}
            {/* RESPONSIVE FIX: Text base sizes scaled down beautifully for ultra-small mobile displays */}
            <motion.p
              variants={textVariants}
              transition={{ delay: 0.15 }}
              className="mt-4 sm:mt-6 text-[#1a202c] text-xs sm:text-base md:text-[17px] max-w-xl sm:max-w-2xl font-semibold leading-[1.6]"
            >
              {slides[activeIndex].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* STATIC CTA BUTTONS LAYER (Stays fixed, no animation on swipe) */}
        {/* RESPONSIVE FIX: flex-col (mobile) -> flex-row (tablet & up) with full width buttons on phone layout */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none px-4 sm:px-0">
          <Link href={user ? `/dashboard/${user?.role}` : "/login"}>
            <Button
              className="w-full sm:w-auto bg-[#0f6c61] text-white font-medium text-[15px] px-7 h-[46px] rounded-lg shadow-sm hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}