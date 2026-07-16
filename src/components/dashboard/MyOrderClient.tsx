"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, Truck, XCircle, Calendar, DollarSign } from 'lucide-react';
import { OrderedProduct } from '@/src/app/dashboard/user/ordered/page';

interface MyOrdersClientProps {
  orders: OrderedProduct[];
}

type FilterStatus = 'All' | 'Active' | 'Completed';

export default function MyOrdersClient({ orders }: MyOrdersClientProps) {
  const [activeTab, setActiveTab] = useState<FilterStatus>('All');

  // Map backend raw states onto user-friendly structural filter pipelines
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (activeTab === 'Active') return ['Pending', 'Baking', 'Out for Delivery'].includes(order.status);
      if (activeTab === 'Completed') return ['Delivered', 'Cancelled'].includes(order.status);
      return true; // 'All' fallback configuration
    });
  }, [activeTab, orders]);

  // Dynamic aesthetic mapper for individual status flags
  const getStatusConfig = (status: OrderedProduct['status']) => {
    switch (status) {
      case 'Pending':
        return { label: 'Order Confirmed', color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock };
      case 'Baking':
        return { label: 'In The Oven', color: 'bg-orange-100 text-orange-800 border-orange-200 animate-pulse', icon: Clock };
      case 'Out for Delivery':
        return { label: 'Out for Delivery', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Truck };
      case 'Delivered':
        return { label: 'Delivered Fresh', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 };
      case 'Cancelled':
        return { label: 'Cancelled', color: 'bg-rose-100 text-rose-800 border-rose-200', icon: XCircle };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- UNIQUE GLASSMORPHISM FILTER TABS --- */}
      <div className="flex items-center gap-2 border-b border-[#E8D9BC] pb-3 overflow-x-auto no-scrollbar">
        {(['All', 'Active', 'Completed'] as FilterStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-5 py-2 text-xs font-black uppercase tracking-wider transition-colors outline-none shrink-0 ${
              activeTab === tab ? 'text-[#7A2048]' : 'text-[#7A6A5C] hover:text-[#2B1B14]'
            }`}
          >
            {tab} Batches
            {activeTab === tab && (
              <motion.div
                layoutId="activeOrderTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7A2048]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* --- ANIMATED ORDERS CONTAINER STACK --- */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16 bg-white border border-dashed border-[#E8D9BC] rounded-2xl"
            >
              <ShoppingBag className="size-10 text-[#B0A28F] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#7A6A5C]">No orders found matching this timeline tab.</p>
            </motion.div>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={order._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="bg-white border border-[#E8D9BC] rounded-2xl p-5 shadow-sm shadow-[#2B1B14]/4 hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                >
                  
                  {/* COL 1: PRODUCT BRAND DETAIL */}
                  <div className="flex items-center gap-4 md:col-span-2">
                    <div className="relative size-16 rounded-xl overflow-hidden bg-[#FBF6EC] shrink-0 border border-[#F3E8D3]">
                      <img
                        src={order.product.image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200"}
                        alt={order.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 truncate">
                      <span className="text-[10px] font-black tracking-wider text-[#B4622F] bg-[#FBF6EC] px-2 py-0.5 rounded border border-[#E8D9BC]">
                        {order._id}
                      </span>
                      <h3 className="text-sm font-black text-[#2B1B14] tracking-tight truncate">
                        {order.product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#8A7A6C]">
                        <Calendar size={13} className="text-[#8A7A6C]" />
                        <span>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* COL 2: BILLING & METRICS MATRIX */}
                  <div className="flex items-center justify-between md:justify-around border-t border-b md:border-none border-[#F3E8D3] py-2 md:py-0">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase font-black tracking-widest text-[#8A7A6C]">Price Basis</span>
                      <span className="text-xs font-bold text-[#2B1B14]">${order.product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] uppercase font-black tracking-widest text-[#8A7A6C]">Quantity</span>
                      <span className="text-xs font-black text-[#2B1B14]">× {order.product.quantity}</span>
                    </div>
                    <div className="flex flex-col items-end md:items-start">
                      <span className="text-[9px] uppercase font-black tracking-widest text-[#8A7A6C]">Net Value</span>
                      <span className="text-sm font-black text-[#7A2048]">${order.product.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* COL 3: DYNAMIC TIMELINE TRACKING PILL FLAG */}
                  <div className="flex justify-end w-full">
                    <div className={`w-full md:w-auto px-4 py-2 border rounded-xl flex items-center justify-center gap-2 text-xs font-black tracking-wide uppercase ${statusConfig.color}`}>
                      <StatusIcon size={14} />
                      {statusConfig.label}
                    </div>
                  </div>

                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}