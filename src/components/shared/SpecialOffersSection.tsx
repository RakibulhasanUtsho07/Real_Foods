import React from 'react';
import OfferCountDownClient from './OfferCountDownClient';

export default function SpecialOffersSection() {
  // ডেমো ব্যানার ইমেজ লিঙ্ক (বেকারি রিলেটেড হাই-কোয়ালিটি ইমেজ)
  const demoBannerImage = "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800";

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FBF6EC]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION TITLE */}
        <div className="space-y-2 mb-10 text-center lg:text-left">
          <span className="text-xs font-black uppercase tracking-widest text-white bg-[#7A2048] px-3.5 py-1 rounded-full shadow-sm inline-block animate-bounce">
            Limited Baking Batch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B1B14] tracking-tight">
            Deal of the Day
          </h2>
        </div>

        {/* MAIN DYNAMIC CARD CONTAINER */}
        <div className="w-full bg-white border border-[#E8D9BC] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-[#2B1B14]/4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* ==========================================
              SECTION 1: TIMER & OFFER DETAILS (5 Columns)
             ========================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#B4622F]">
                Today's Special Combo Pack
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#2B1B14] tracking-tight leading-tight">
                Grand Artisan <br />
                <span className="text-[#7A2048]">Breakfast Feast</span>
              </h3>
            </div>

            {/* Price Matrix */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#7A2048]">$24.99</span>
              <span className="text-sm font-bold text-[#8A7A6C] line-through">$42.00</span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Save 40%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#7A6A5C] font-semibold leading-relaxed">
              Freshly baked at 4:00 AM. This limited signature combo is curated by our master pastry chefs to give you the ultimate artisan experience.
            </p>

            {/* 🕒 CLIENT SIDE LIVE TIMER INJECTION */}
            {/* অফারটি আজকের দিন থেকে ২৪ ঘণ্টা পর্যন্ত সেট করার জন্য একটি টার্গেট ডেট পাঠানো হলো */}
            <OfferCountDownClient targetDate={new Date(Date.now() + 14 * 60 * 60 * 1000).toISOString()} />
          </div>

          {/* ==========================================
              SECTION 2: COMBO INCLUSIONS (3 Columns)
             ========================================== */}
          <div className="lg:col-span-3 bg-[#FBF6EC] border border-[#E8D9BC] rounded-2xl p-5 space-y-4 self-stretch flex flex-col justify-center">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#2B1B14] border-b border-[#E8D9BC] pb-2">
              What's Inside the Box:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-xs font-bold text-[#7A6A5C]">
                <span className="size-2 rounded-full bg-[#7A2048]" />
                1× Flaky Almond Croissant
              </li>
              <li className="flex items-center gap-2.5 text-xs font-bold text-[#7A6A5C]">
                <span className="size-2 rounded-full bg-[#7A2048]" />
                2× Choco Velvet Donuts
              </li>
              <li className="flex items-center gap-2.5 text-xs font-bold text-[#7A6A5C]">
                <span className="size-2 rounded-full bg-[#7A2048]" />
                1× Organic Sourdough Boule
              </li>
              <li className="flex items-center gap-2.5 text-xs font-bold text-[#7A6A5C]">
                <span className="size-2 rounded-full bg-[#7A2048]" />
                1× House-made Berry Jam
              </li>
            </ul>
          </div>

          {/* ==========================================
              SECTION 3: INTERACTIVE IMAGE BANNER (4 Columns)
             ========================================== */}
          <div className="lg:col-span-4 w-full h-64 sm:h-72 lg:h-full min-h-[280px] rounded-2xl overflow-hidden border border-[#E8D9BC] relative group bg-[#FBF6EC]">
            <img 
              src={demoBannerImage} 
              alt="Real Foods Premium Bakery Combo Offer" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Glassmorphism Quick Action Overlay on Banner Hover */}
            <div className="absolute inset-0 bg-[#2B1B14]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <span className="px-5 py-2.5 bg-white/90 backdrop-blur-md text-[#7A2048] font-black uppercase tracking-wider text-[11px] rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Fresh From Oven
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}