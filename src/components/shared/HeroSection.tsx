"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Flame, ArrowDownCircle, Clock, ShoppingCart } from "lucide-react";

// Updated configuration matching palette and adding utility data from image_1.png
const BAKERY_SLIDES = [
  {
    id: "breads",
    category: "Breads",
    headline: "Bitecrafted, not mass-baked.", // Exact phrase from image_1.png
    description: "Slow-fermented sourdough, laminated artisanal loaves, baked in small batches every morning.",
    liveStat: "240 loaves baked today",
    price: "€6.50",
    prepTime: "24 hrs",
    image: "https://i.ibb.co.com/bt0g7bQ/real-foods-herosection-1.png",
    gradient: "from-[#111111]/90 to-[#191919]/60", // Match background from image_1.png
    accent: "text-amber-500", // Soft orange from liveStat in image_1.png
  },
  {
    id: "pastries",
    category: "Pastries",
    headline: "Flaky bliss, bite by bite.",
    description: "Hand-rolled golden croissants boasting multi-layer shattering textures.",
    liveStat: "185 croissants hand-formed",
    price: "€4.20",
    prepTime: "16 hrs",
    image: "https://i.ibb.co.com/WNtHgRN4/real-foods-herosection-3.png",
    gradient: "from-[#111111]/80 to-[#191919]/50",
    accent: "text-amber-600",
  },
  {
    id: "cakes",
    category: "Cakes",
    headline: "Cakes with a true culinary soul.",
    description: "Fine-crumb layers dressed in silky frostings and delicate extracts.",
    liveStat: "42 custom bakes decorated",
    price: "€38.00",
    prepTime: "6 hrs",
    image: "https://i.ibb.co.com/PzYpWh29/real-foods-herosection-2.png",
    gradient: "from-[#111111]/70 to-[#191919]/40",
    accent: "text-amber-700",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = BAKERY_SLIDES[activeIndex];

  // Function to generate split-text character animation
  const splitTextVariant = {
    hidden: { opacity: 0, y: 15, rotateX: -30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.018, duration: 0.35, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  // Scroll progress for subtle parallax on image zoom
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center bg-[#111111] px-4 md:px-8 pt-20 select-none overflow-hidden"
      id="hero"
    >
      {/* The main inner card, color-matched to the dark scheme of image_1.png */}
      <div className="w-full max-w-7xl bg-[#1E1E1E] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 justify-between relative shadow-[0_15px_60px_-20px_rgba(0,0,0,0.6)] border border-white/5 h-full max-h-[520px] overflow-hidden">
        
        {/* LEFT COLUMN: Controls & Morphing Text */}
        <div className="flex-1 flex flex-col h-full z-10 max-w-xl text-[#F0EDE6] justify-between">
          
          {/* Dynamic Category Tabs with unique animation */}
          <div className="flex gap-2.5 mb-6 flex-wrap">
            {BAKERY_SLIDES.map((slide, idx) => (
              <motion.button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 relative ${
                  activeIndex === idx
                    ? "text-white"
                    : "text-[#B0ACA2] hover:text-[#F0EDE6] hover:bg-[#2A2A2A]"
                }`}
              >
                {activeIndex === idx && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#3A3A3A] rounded-full z-0 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{slide.category}</span>
              </motion.button>
            ))}
          </div>

          {/* PREMIUM: Text Splitting Character Animation */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial="hidden" animate="visible" exit="exit" className="perspective-800">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0EDE6] tracking-tight leading-[1.1] mb-5 flex flex-wrap gap-x-1.5 gap-y-0.5">
                  {current.headline.split("").map((char, i) => (
                    <motion.span key={i} custom={i} variants={splitTextVariant} className="inline-block origin-bottom-left">
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base text-[#B0ACA2] font-medium leading-relaxed max-w-md"
                >
                  {current.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Interactive Actions & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-6 border-t border-white/5 pt-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="bg-[#B01750] text-white font-bold h-12 px-7 rounded-full shadow-lg shadow-[#B01750]/20 group border border-white/5"
                endContent={<ShoppingCart size={18} className="group-hover:translate-x-0.5 transition-transform" />}
              >
                Taste This Week's Bake
              </Button>
            </motion.div>

            {/* Live Stat Counter with color match from image_1.png */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`inline-flex items-center gap-2 bg-[#262626] border border-white/5 px-4 py-2 rounded-xl text-xs font-bold ${current.accent}`}
              >
                <Flame size={14} className="animate-pulse" />
                <span>{current.liveStat}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Enhanced Media Viewport with Zoom Parallax */}
        <div className="flex-1 w-full h-full relative min-h-[260px] md:min-h-0 rounded-3xl overflow-hidden shadow-inner bg-gradient-to-br from-neutral-900 to-[#191919] border border-white/5 flex items-center justify-center p-3 perspective-1200">
          
          {/* Ambient Flour Particles: Increased density & movement */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -60, 0],
                  opacity: [0.1, 0.9, 0.1],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration: 3.5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Sliding Image Container with Zoom Parallax hook */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)", rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)", rotateY: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center p-3 rounded-3xl overflow-hidden"
            >
              {/* Dynamic Overlay Gradient to enhance product contrast and depth */}
              <div className={`absolute inset-0 bg-gradient-to-t ${current.gradient} mix-blend-multiply z-10 pointer-events-none transition-all duration-300`} />
              
              <motion.img
                src={current.image}
                alt={current.category}
                style={{ scale: imageScale }} // Subtle zoom on scroll
                className="w-full h-full object-cover rounded-2xl select-none"
              />

              {/* Product Utility Data Overlay */}
              <div className="absolute bottom-5 left-5 z-20 flex gap-2">
                <motion.div whileHover={{y: -3}} className="bg-[#262626]/80 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-xl text-xs font-bold text-[#F0EDE6] flex items-center gap-1.5 shadow-xl">
                  {current.price}
                </motion.div>
                <motion.div whileHover={{y: -3}} className="bg-[#262626]/80 backdrop-blur-sm border border-white/5 px-4 py-2 rounded-xl text-xs font-medium text-[#B0ACA2] flex items-center gap-1.5 shadow-xl">
                  <Clock size={14} className="text-amber-500"/>
                  <span>Prep: {current.prepTime}</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- JAGGED TORN-CRUST EDGE DIVIDER --- (Color Matched) */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-[0] h-6 pointer-events-none z-30">
          <svg
            className="relative block w-full h-full transform rotate-180 text-white fill-current opacity-[0.03]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z"></path>
          </svg>
        </div>
      </div>

      {/* NEW: Custom Animated Scroll indicator Anchor */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-white z-40 hidden md:flex">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">Scroll Menu</span>
        <motion.a href="#menu-explorer" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} className="hover:text-amber-500 transition-colors">
          <ArrowDownCircle size={20} className="stroke-[1.5]"/>
        </motion.a>
      </div>
    </section>
  );
}