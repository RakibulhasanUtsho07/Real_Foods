"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


import { BakeryItem } from '@/app/dashboard/user/menu/page';
import { getSessionData } from '@/lib/core/session/session-client';


interface OurMenuClientProps {
  items: BakeryItem[];
}

type MenuCategory = 'All' | 'Oven Fresh' | 'Signature Sweet' | 'Artisan Bread' | 'Celebration Cakes';

export default function OurMenuClient({ items }: OurMenuClientProps) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 🔐 CLIENT-SIDE AUTH CHECK
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const user = await getSessionData();
        console.log("Menu client session check:", user);

        if (!user) {
          router.replace("/login");
          return;
        }

        if ((user as any)?.role !== "user") {
          router.replace("/");
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace("/login");
      }
    };

    verifyUser();
  }, [router]);

  const categories: MenuCategory[] = ['All', 'Oven Fresh', 'Signature Sweet', 'Artisan Bread', 'Celebration Cakes'];

  // 🔍 SEARCH & FILTER PIPELINE
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, items]);

  // ⏳ AUTH CHECKING SPINNER
  if (isCheckingAuth) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A2048]" />
        <p className="text-xs font-bold text-[#7A6A5C] uppercase tracking-wider">
          Verifying Access...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* CONTROL PANEL: SEARCH & TABS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-[#E8D9BC] pb-5">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7A6C] group-focus-within:text-[#7A2048] size-4 transition-colors" />
          <input
            type="text"
            placeholder="Search delicacy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8D9BC] text-[#2B1B14] placeholder-[#8A7A6C] text-xs font-bold rounded-2xl outline-none focus:border-[#7A2048] focus:ring-1 focus:ring-[#7A2048] shadow-sm transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl border outline-none shrink-0 transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#7A2048] text-white border-[#7A2048] shadow-md shadow-[#7A2048]/20'
                  : 'bg-white text-[#7A6A5C] border-[#E8D9BC] hover:border-[#2B1B14] hover:text-[#2B1B14]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              key={item._id}
              className="w-full bg-white border border-[#E8D9BC] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#7A2048]/5 group flex flex-col transition-all duration-300 relative"
            >
              {/* Image Cluster */}
              <div className="h-52 w-full bg-[#FBF6EC] overflow-hidden relative">
                <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#B4622F] border border-[#E8D9BC] rounded-md">
                  {item.category}
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Details & Action */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-[#2B1B14]">{item.rating}</span>
                    </div>
                    <span className="text-base font-black text-[#7A2048]">${item.price.toFixed(2)}</span>
                  </div>

                  <h3 className="text-base font-black text-[#2B1B14] tracking-tight truncate group-hover:text-[#7A2048] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-medium text-[#7A6A5C] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Added ${item.name} to batch!`)}
                  className="w-full py-3 bg-[#FBF6EC] hover:bg-[#7A2048] text-[#7A2048] hover:text-white text-xs font-black uppercase tracking-wider rounded-xl border border-[#E8D9BC] hover:border-[#7A2048] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                  <ShoppingCart size={13} />
                  Add to Batch
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* NO DATA FOUND */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white border border-dashed border-[#E8D9BC] rounded-3xl"
        >
          <p className="text-sm font-bold text-[#7A6A5C]">No baking trays match your specific filter queries.</p>
        </motion.div>
      )}

    </div>
  );
}