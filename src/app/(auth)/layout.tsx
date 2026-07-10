"use client";

import React from "react";
import { motion } from "framer-motion";
import { BiCookie, BiArrowBack } from "react-icons/bi";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#111111] flex flex-col md:flex-row select-none overflow-hidden font-sans">
      
      {/* LEFT COLUMN: THE GRAPHIC BRAND SIDEBAR PANEL (Hidden on small mobile viewports) */}
      <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-[#1E1E1E] relative flex-col justify-between p-10 border-r border-white/5 overflow-hidden">
        
        {/* Background Ambient Flour Lighting Rings */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#B01750]/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Top Segment: Brand Anchor Link */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl shadow-md text-white group-hover:rotate-12 transition-transform duration-300">
              <BiCookie size={20} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-[#F0EDE6] group-hover:text-amber-500 transition-colors">
                REAL FOODS
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#B0ACA2] uppercase -mt-0.5">
                Bitecrafted Art
              </span>
            </div>
          </Link>
        </div>

        {/* Middle Segment: Immersive Custom Slogan Core Display */}
        <div className="relative z-10 my-auto py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Artisanal Privilege
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#F0EDE6] tracking-tight leading-[1.25]">
              Where every crust <br />
              holds a masterclass.
            </h2>
            <p className="text-sm text-[#B0ACA2] font-medium leading-relaxed max-w-sm">
              Sign in to manage your collection logs, fulfill community reservation queues, and track live micro-batch drops.
            </p>
          </motion.div>
        </div>

        {/* Bottom Segment: Dynamic Brand Promise Footer Citation */}
        <div className="relative z-10 border-t border-white/5 pt-6 text-xs text-[#B0ACA2] font-medium">
          <p className="italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-bold">
            “Every price tells a story.”
          </p>
          <p className="mt-1 text-[11px] opacity-60">Crafted with intentionality & true fire baking methods.</p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE DINING CONTEXT VIEWPORT MODULE (Form Render Canvas) */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 relative">
        
        {/* Floating Return Navigation Link anchor */}
        <div className="absolute top-6 left-4 md:left-8 z-20">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B0ACA2] hover:text-[#F0EDE6] transition-colors bg-[#1E1E1E] border border-white/5 px-3 py-1.5 rounded-full"
          >
            <BiArrowBack size={14} />
            <span>Back to Kitchen</span>
          </Link>
        </div>

        {/* Fluid Form Injection Nest Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md bg-[#1E1E1E] rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
