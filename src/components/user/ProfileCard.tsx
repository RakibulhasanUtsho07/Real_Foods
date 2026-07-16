"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, ShoppingBag } from 'lucide-react';

export default function UserInfoCard({ user }: { user: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm space-y-6"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="size-20 bg-[#FBF6EC] rounded-full border-2 border-[#E8D9BC] flex items-center justify-center text-[#7A2048] font-black text-2xl shadow-inner">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-lg font-black text-[#2B1B14]">{user.name}</h2>
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase bg-[#FBF6EC] text-[#B4622F] border border-[#E8D9BC] rounded-md mt-1">
            {user.role}
          </span>
        </div>
      </div>

      <div className="border-t border-[#F3E8D3] pt-4 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail size={16} className="text-[#8A7A6C]" />
          <span className="text-[#2B1B14] font-medium truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar size={16} className="text-[#8A7A6C]" />
          <span className="text-[#7A6A5C]">Joined {user.joinedAt}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-[#FBF6EC] p-4 rounded-xl border border-[#F3E8D3]">
        <div className="text-center">
          <span className="block text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Orders</span>
          <span className="text-lg font-black text-[#7A2048]">{user.totalOrders}</span>
        </div>
        <div className="text-center border-l border-[#E8D9BC]">
          <span className="block text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Total Spent</span>
          <span className="text-lg font-black text-[#2B1B14]">${user.totalSpent.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}