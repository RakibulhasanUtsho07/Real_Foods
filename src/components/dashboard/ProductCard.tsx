"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BakeryProduct } from '@/app/dashboard/user/foods/BakryProduct';


interface ProductCardProps {
  product: BakeryProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Graceful handling of date conversions
  const formatDate = (dateInput: string | Date | undefined) => {
    if (!dateInput) return 'N/A';
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-white border border-[#E8D9BC] rounded-2xl overflow-hidden shadow-sm shadow-[#2B1B14]/5 flex flex-col justify-between h-full relative hover:shadow-md transition-all"
    >
      
      {/* CARD TOP BANNER IMAGE CONTAINER */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FBF6EC]">
        <img
          src={product.image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Dynamic Category Badge Overlay */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-[#2B1B14]/80 backdrop-blur-md text-[#F3E8D3] text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg">
            {product.category}
          </span>
        )}

        {/* Dynamic Eggless Indicator Dot */}
        {product.isEggless && (
          <span className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            EGGLESS
          </span>
        )}
      </div>

      {/* CORE INFO AREA */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-1.5">
          {/* Item Name */}
          <h3 className="font-black text-lg text-[#2B1B14] tracking-tight group-hover:text-[#7A2048] transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          {/* 2-Line Rigid Description Box */}
          <p className="text-xs text-[#7A6A5C] font-medium leading-relaxed line-clamp-2 h-8">
            {product.description || "Freshly customized luxury dessert baked to precise recipes by artisanal chefs."}
          </p>
        </div>

        {/* METADATA TIMESTAMPS ROW */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F3E8D3]/70 text-[11px] font-bold text-[#8A7A6C]">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-[#B4622F] shrink-0" />
            <span className="truncate">Baked: {formatDate(product.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <ShieldAlert size={13} className="text-[#7A2048] shrink-0" />
            <span className="truncate text-right">Best before: {formatDate(product.expiryDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))}</span>
          </div>
        </div>

        {/* BOTTOM PRICE & TRANSACTION TRIGGER ZONE */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Price</span>
            <span className="text-xl font-black text-[#2B1B14]">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </span>
          </div>

          <Link href={`/dashboard/user/foods/${product._id}`}>
            <motion.button 
              whileTap={{ scale: 0.96 }}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] font-bold text-xs tracking-wide shadow-md shadow-[#7A2048]/10 flex items-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              Details
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </Link>
        </div>

      </div>

    </motion.div>
  );
}