"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Award, 
  Clock, 
  ArrowRight, 
  UtensilsCrossed, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

export default function UserHomePage() {
  // কাস্টমারের জন্য ডাইনামিক স্ট্যাটস ডাটা
  const userStats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, desc: "3 orders this month", color: "from-[#2B1B14] to-[#4A2E1F]" },
    { label: "Foodie Points", value: "450", icon: Award, desc: "$45.00 cashback value", color: "from-[#7A2048] to-[#93294F]" },
    { label: "Favorites Items", value: "8", icon: Heart, desc: "Saved to your crust list", color: "from-[#B4622F] to-[#D9A441]" },
  ];

  // কাস্টমারের সাম্প্রতিক অর্ডারের ডাটা
  const recentOrders = [
    { id: "#RF-9821", date: "Today, 02:30 PM", item: "Choco Glazed Donut x2", status: "Baking", total: "$12.00" },
    { id: "#RF-9754", date: "July 10, 2026", item: "Sourdough Bread & Croissant", status: "Delivered", total: "$18.50" },
    { id: "#RF-9612", date: "June 28, 2026", item: "Premium Red Velvet Cake (1kg)", status: "Delivered", total: "$45.00" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      
      {/* --- WELCOME HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">
            Welcome Back, Foodie!
          </h1>
          <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">
            Real Foods "Bitecrafted Art" এর ফ্রেশ ও ওভেন-হট কালেকশন আপনার জন্য রেডি।
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/dashboard/user/foods">
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-[#7A2048]/20 transition-all">
              <UtensilsCrossed size={18} />
              Order Fresh Bakery
            </button>
          </Link>
        </motion.div>
      </div>

      {/* --- CUSTOMER STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full group-hover:scale-120 transition-transform duration-500`} />
              
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-[#2B1B14]">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-[#F3E8D3] shadow-inner`}>
                  <Icon size={22} />
                </div>
              </div>
              
              <p className="mt-4 text-xs font-bold text-[#8A7A6C]">{stat.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* --- MAIN USER CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: ORDER HISTORY */}
        <div className="lg:col-span-2 bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-[#2B1B14] tracking-tight">Recent Orders</h2>
            <Link href="/dashboard/user/ordered" className="text-xs font-bold text-[#B4622F] hover:text-[#7A2048] flex items-center gap-0.5 transition-colors">
              See All History <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#F3E8D3] rounded-xl hover:border-[#D9A441]/40 hover:bg-[#FBF6EC]/20 transition-all gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-[#FBF6EC] border border-[#E8D9BC] rounded-xl text-[#7A2048]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2B1B14] text-sm">{order.item}</span>
                      <span className="text-[10px] bg-[#E8D9BC]/40 text-[#4A2E1F] font-bold px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A7A6C] font-semibold mt-0.5">{order.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800 animate-pulse"
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-black text-[#2B1B14] text-sm sm:min-w-[60px] text-right">
                    {order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: LIVE OVEN TRACKING & OFFERS */}
        <div className="space-y-6">
          
          {/* OVEN TRACKER (UNIQUE BAKERY COMPONENT) */}
          <div className="bg-gradient-to-b from-[#2B1B14] to-[#4A2E1F] rounded-2xl p-6 shadow-md text-[#F3E8D3] space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A441]/10 rounded-full filter blur-xl" />
            
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold tracking-widest text-[#D9A441] uppercase">Live Kitchen Status</span>
              <h2 className="text-lg font-black tracking-tight text-white">Your Order is Baking</h2>
            </div>

            {/* ভিজ্যুয়াল স্টেপ ট্র্যাকার */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              <div className="relative flex items-center gap-3 text-xs font-bold text-[#B0A28F]">
                <div className="absolute -left-[22px] size-3 rounded-full bg-[#B4622F] border-2 border-[#2B1B14]" />
                <span>Order Accepted</span>
              </div>
              <div className="relative flex items-center gap-3 text-xs font-bold text-[#D9A441]">
                <div className="absolute -left-[22px] size-3 rounded-full bg-[#D9A441] border-2 border-[#2B1B14] animate-ping" />
                <div className="absolute -left-[22px] size-3 rounded-full bg-[#D9A441] border-2 border-[#2B1B14]" />
                <span>In the Oven (Baking)</span>
              </div>
              <div className="relative flex items-center gap-3 text-xs font-bold text-white/30">
                <div className="absolute -left-[22px] size-3 rounded-full bg-white/20 border-2 border-[#2B1B14]" />
                <span>Out for Delivery</span>
              </div>
            </div>
          </div>

          {/* PROMO BOX */}
          <div className="border border-dashed border-[#D9A441] bg-[#D9A441]/5 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-[#D9A441]/10 transition-colors">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#7A2048] uppercase tracking-wider">Weekend Special Offer</h4>
              <p className="text-sm font-black text-[#2B1B14]">Get 20% off on premium Croissants</p>
            </div>
            <div className="p-2 bg-[#7A2048] text-white rounded-xl group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}