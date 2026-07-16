"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Key, UserCheck } from 'lucide-react';

export default function UserActivityLog() {
  const activities = [
    { id: 1, type: 'order', text: 'Placed order #ORD-99812 for Chocolate Glazed Donuts', time: '2 hours ago', icon: ShoppingCart, color: 'text-amber-700 bg-amber-50' },
    { id: 2, type: 'auth', text: 'Account password updated successfully', time: 'Yesterday', icon: Key, color: 'text-blue-700 bg-blue-50' },
    { id: 3, type: 'profile', text: 'Logged in from a new Chrome Session', time: '3 days ago', icon: UserCheck, color: 'text-emerald-700 bg-emerald-50' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm space-y-4"
    >
      <h3 className="text-base font-black text-[#2B1B14]">Recent Activity Log</h3>
      <div className="relative border-l-2 border-[#F3E8D3] pl-5 space-y-6 ml-3">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative">
              <span className={`absolute -left-[31px] top-0 size-6 rounded-full border border-[#E8D9BC] flex items-center justify-center shadow-sm ${act.color}`}>
                <Icon size={12} />
              </span>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#2B1B14]">{act.text}</p>
                <span className="text-xs font-medium text-[#8A7A6C]">{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}