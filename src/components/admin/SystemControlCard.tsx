"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Power, Server, RefreshCw } from 'lucide-react';

export default function SystemControlCard() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm space-y-6"
    >
      <div className="flex items-center gap-2">
        <Sliders size={18} className="text-[#7A2048]" />
        <h3 className="text-base font-black text-[#2B1B14]">System Architecture Toggles</h3>
      </div>

      <div className="space-y-4">
        {/* Toggle 1 */}
        <div className="flex items-center justify-between p-4 bg-[#FBF6EC] border border-[#F3E8D3] rounded-xl">
          <div className="space-y-0.5">
            <span className="text-sm font-black text-[#2B1B14]">Storefront Maintenance</span>
            <p className="text-xs text-[#7A6A5C] font-medium">Block active checkouts and display static notice layer.</p>
          </div>
          <button 
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 outline-none ${maintenanceMode ? 'bg-[#7A2048]' : 'bg-[#B0A28F]'}`}
          >
            <motion.div 
              layout 
              className="bg-white w-4 h-4 rounded-full shadow-md"
              animate={{ x: maintenanceMode ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Action Button 2 */}
        <div className="flex items-center justify-between p-4 bg-[#FBF6EC] border border-[#F3E8D3] rounded-xl">
          <div className="space-y-0.5">
            <span className="text-sm font-black text-[#2B1B14]">Ollama / LLM Cache</span>
            <p className="text-xs text-[#7A6A5C] font-medium">Flush internal embeddings memory context layer stacks.</p>
          </div>
          <button className="px-4 py-2 bg-white hover:bg-[#F3E8D3] border border-[#E8D9BC] text-xs font-black uppercase text-[#2B1B14] rounded-xl flex items-center gap-2 transition-colors">
            <RefreshCw size={13} />
            Flush
          </button>
        </div>
      </div>
    </motion.div>
  );
}