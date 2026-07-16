"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, ClipboardList, Activity } from 'lucide-react';

export default function AdminStatGrid({ stats }: { stats: any }) {
  const cards = [
    { title: "Gross Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-emerald-700 bg-emerald-50" },
    { title: "Active Users", value: stats.activeUsers, icon: Users, color: "text-blue-700 bg-blue-50" },
    { title: "Pending Batches", value: stats.pendingOrders, icon: ClipboardList, color: "text-amber-700 bg-amber-50" },
    { title: "Oven Core Node", value: stats.serverStatus, icon: Activity, color: "text-purple-700 bg-purple-50" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-[#E8D9BC] p-5 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">{card.title}</span>
              <p className="text-xl font-black text-[#2B1B14]">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl border border-[#E8D9BC]/40 ${card.color}`}>
              <Icon size={20} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}