"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutInteractiveGrid() {
  return (
    <div className="relative w-full max-w-[440px] h-[480px] mx-auto lg:mx-0">
      
      {/* 🥞 BACKGROUND DECORATIVE PATTERN */}
      <div className="absolute inset-0 bg-[#FBF6EC] border border-[#E8D9BC] rounded-3xl -rotate-3 scale-95 pointer-events-none -z-10" />

      {/* 🥐 MAIN LARGE IMAGE: The Live Oven Context */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-4 left-4 w-[75%] h-[65%] rounded-2xl overflow-hidden border border-[#E8D9BC] shadow-md bg-[#F3E8D3]"
      >
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600"
          alt="Real Foods live kitchen baking"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* 🍯 OVERLAPPING SECONDARY IMAGE: The Artisan Ingredients */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-6 right-2 w-[60%] h-[50%] rounded-2xl overflow-hidden border-2 border-white shadow-xl z-10 bg-[#FBF6EC]"
      >
        <img
          src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600"
          alt="Freshly baked artisan bread boule"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>

      {/* 🎨 FLOATING INTERACTIVE STICKER BADGE */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 12 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-20 px-4 py-3 bg-white/90 backdrop-blur-md border border-[#E8D9BC] text-[#7A2048] font-black uppercase tracking-wider text-[11px] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center cursor-default"
      >
        <span>Oven Fresh</span>
        <span className="text-[9px] text-[#B4622F] font-bold">Every Day</span>
      </motion.div>

    </div>
  );
}