import React from 'react';
import AboutInteractiveGrid from './AboutInteractiveGrid';


export default function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 📸 LEFT COLUMN: ANIMATED VISUAL GRID (5 Columns wide) */}
          <div className="lg:col-span-5 w-full">
            <AboutInteractiveGrid />
          </div>

          {/* 📝 RIGHT COLUMN: CONTENT MATRIX & SLOGAN (7 Columns wide) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-8">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#B4622F] bg-[#FBF6EC] px-3 py-1 rounded-full border border-[#E8D9BC] inline-block">
                Our Heritage
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#2B1B14] tracking-tight leading-tight">
                Crafting Stories Through <br />
                <span className="text-[#7A2048]">Every Single Crumb</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#7A6A5C] font-semibold leading-relaxed">
              At Real Foods, our ovens never truly sleep. Every morning before the sun rises, our artisan bakers are already kneading organic, stone-ground flour and monitoring the perfect humidity of our sourdough starters. We believe that true baking isn't just a recipe—it is a patient dialogue between fire, flour, and time.
            </p>

            <p className="text-xs sm:text-sm text-[#8A7A6C] font-medium leading-relaxed">
              From our live glass-walled kitchen directly to your doorstep, we strip away all artificial preservatives and shortcuts. What you get is raw, authentic European pastry tradition mixed with modern culinary passion.
            </p>

            {/* 🏷️ THE SIGNATURE SLOGAN FEATURE LAYER */}
            <div className="p-5 bg-[#FBF6EC] border-l-4 border-[#7A2048] rounded-r-2xl border-y border-r border-[#E8D9BC]/60 my-4 shadow-sm">
              <span className="block text-[9px] uppercase font-black tracking-widest text-[#B4622F] mb-1">
                Our Core Philosophy
              </span>
              <p className="text-xl sm:text-2xl font-serif italic font-black text-[#2B1B14] tracking-wide">
                "Every price tells a story"
              </p>
              <p className="text-[11px] text-[#8A7A6C] font-bold mt-1">
                Every ingredient we source, every hour we proof, and every value we assign reflects absolute transparency and craftsmanship.
              </p>
            </div>

            {/* Core Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F3E8D3]">
              <div>
                <span className="block text-xl sm:text-2xl font-black text-[#7A2048]">100%</span>
                <span className="block text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Organic Flour</span>
              </div>
              <div className="border-l border-[#E8D9BC] pl-4">
                <span className="block text-xl sm:text-2xl font-black text-[#2B1B14]">48 Hrs</span>
                <span className="block text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Slow Fermentation</span>
              </div>
              <div className="border-l border-[#E8D9BC] pl-4">
                <span className="block text-xl sm:text-2xl font-black text-[#B4622F]">0%</span>
                <span className="block text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Preservatives</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}