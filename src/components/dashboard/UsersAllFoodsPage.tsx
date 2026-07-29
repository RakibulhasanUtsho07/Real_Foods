"use client";

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Cookie, Sparkles } from 'lucide-react';

import ProductCard from './ProductCard';
import { BakeryProduct } from '@/app/dashboard/user/foods/BakryProduct';


interface FoodCatalogClientProps {
  initialProducts: BakeryProduct[];
}

export default function FoodCatalogClient({ initialProducts }: FoodCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamic lists generated from actual backend metadata
  const categories = useMemo(() => {
    const list = new Set(initialProducts.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(list)];
  }, [initialProducts]);

  // High-performance search and filtering hook
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, initialProducts]);

  return (
    <div className="space-y-6">
      
      {/* 🔍 SEARCH AND FILTER COMPONENT SECTION */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        {/* Modern Glassmorphism Search input bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4622F] size-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search freshly baked donuts, croissants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 rounded-xl bg-white border border-[#E8D9BC] text-sm font-semibold text-[#2B1B14] placeholder:text-[#B0A28F] pl-12 pr-4 outline-none transition-all focus:border-[#B4622F] focus:ring-2 focus:ring-[#B4622F]/15"
          />
        </div>

        {/* Dynamic Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
          <div className="p-2 bg-white border border-[#E8D9BC] rounded-xl text-[#7A6A5C] shrink-0">
            <SlidersHorizontal size={18} />
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat || 'All')}
              className={`px-4 h-9 rounded-xl text-xs font-black tracking-wide uppercase border transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] border-transparent shadow-sm'
                  : 'bg-white border-[#E8D9BC] text-[#7A6A5C] hover:bg-[#FBF6EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🥐 CARDS GRID DISPATCHER */}
      {filteredProducts.length === 0 ? (
        <div className="w-full text-center py-16 bg-white border border-dashed border-[#E8D9BC] rounded-2xl">
          <Cookie className="size-12 text-[#B0A28F] mx-auto mb-3 animate-bounce" />
          <p className="text-sm font-bold text-[#7A6A5C]">No bakery items match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}