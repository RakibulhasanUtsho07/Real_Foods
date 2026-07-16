"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductProps {
  product?: {
    _id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    rating?: number;
  };
}

export default function FeaturedCard({ product }: ProductProps) {
  // যদি প্রোডাকশন ডেটা না থাকে, তবে ডিফল্ট হিসেবে বেকারি আইটেম দেখাবে
  const item = product || {
    _id: "prod-01",
    name: "Artisanal Glazed Berry Danish",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
    category: "Oven Fresh",
    rating: 4.9
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group w-full max-w-[320px] bg-white border border-[#E8D9BC] rounded-3xl overflow-hidden shadow-sm shadow-[#2B1B14]/4 hover:shadow-xl hover:shadow-[#7A2048]/5 transition-all duration-300"
    >
      
      {/* 📸 IMAGE AREA WITH BADGES */}
      <div className="relative h-64 w-full bg-[#FBF6EC] overflow-hidden">
        
        {/* Category Pill */}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-[#B4622F] border border-[#E8D9BC] rounded-full shadow-sm">
          {item.category}
        </span>

        {/* Dynamic Zoom Image */}
        <motion.img
          src={item.image}
          alt={item.name}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />

        {/* Overlapping Dark Veil on Hover */}
        <div className="absolute inset-0 bg-[#2B1B14]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Floating Button */}
        <motion.button
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 z-10 p-2.5 bg-white text-[#2B1B14] hover:text-[#7A2048] rounded-full border border-[#E8D9BC] shadow-md transition-colors"
          title="Quick View"
        >
          <Eye size={16} />
        </motion.button>
      </div>

      {/* 📝 CONTENT MATRIX */}
      <div className="p-5 space-y-4 relative bg-white">
        <div className="space-y-1.5">
          {/* Rating Engine */}
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-[#2B1B14]">{item.rating}</span>
            <span className="text-[10px] text-[#8A7A6C] font-semibold">(45 reviews)</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-black text-[#2B1B14] tracking-tight truncate group-hover:text-[#7A2048] transition-colors">
            {item.name}
          </h3>
        </div>

        {/* Price & Bottom Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-black tracking-widest text-[#8A7A6C]">Price</span>
            <span className="text-lg font-black text-[#2B1B14]">${item.price.toFixed(2)}</span>
          </div>

          {/* Static Compact Shopping Button (Visible when NOT hovered) */}
          <motion.button 
            animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.8 : 1 }}
            className="p-3 bg-[#FBF6EC] hover:bg-[#F3E8D3] border border-[#E8D9BC] text-[#7A2048] rounded-2xl group-hover:pointer-events-none transition-colors"
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>

        {/* 🚀 SLIDE-UP GLASSMORPHISM CART ACTION (Triggers on Hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute inset-x-0 bottom-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#E8D9BC] flex gap-2 items-center justify-between"
            >
              <button 
                onClick={() => alert(`Details for ${item.name}`)}
                className="flex-1 py-3 px-2 text-center text-xs font-black uppercase tracking-wider text-[#2B1B14] bg-[#FBF6EC] border border-[#E8D9BC] rounded-2xl hover:bg-[#F3E8D3] transition-colors"
              >
                Inspect
              </button>
              
              <button 
                onClick={() => alert(`Added ${item.name} to batch!`)}
                className="flex-[2] py-3 px-2 bg-[#7A2048] text-white text-xs font-black uppercase tracking-wider rounded-2xl hover:bg-[#5C1535] shadow-md shadow-[#7A2048]/20 flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={14} />
                Add to Batch
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
