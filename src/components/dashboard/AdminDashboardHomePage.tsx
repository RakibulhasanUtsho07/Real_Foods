"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, animate } from 'framer-motion';
import {
  ShoppingBag,
  UtensilsCrossed,
  Users,
  TrendingUp,
  ArrowUpRight,
  Plus,
  DollarSign,
  CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ---------- Brand tokens (kept from your existing design) ----------
const BRAND = {
  ink: '#2B1B14',
  ink2: '#4A2E1F',
  clay: '#B4622F',
  wine: '#7A2048',
  wine2: '#93294F',
  gold: '#D9A441',
  cream: '#F3E8D3',
  bg: '#FBF6EC',
  border: '#E8D9BC',
  muted: '#8A7A6C',
  mutedSoft: '#7A6A5C',
};

// ---------- Animated counter (counts up on mount using framer-motion) ----------
function AnimatedStat({ target, prefix = '', suffix = '', decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [target]);

  const formatted = decimals > 0
    ? display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : Math.round(display).toLocaleString();

  return <>{prefix}{formatted}{suffix}</>;
}

// ---------- Custom chart tooltip, themed to match the dashboard ----------
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#2B1B14] text-[#F3E8D3] px-3.5 py-2.5 rounded-xl shadow-lg border border-white/10 text-xs">
      <p className="font-bold text-[#D9A441] mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-semibold">
          {p.name}: <span className="text-white">{typeof p.value === 'number' && p.name === 'Revenue' ? `$${p.value.toLocaleString()}` : p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function AdminHomePage() {
  const [now, setNow] = useState<Date | null>(null);
  const [range, setRange] = useState<'week' | 'month'>('week');
  const [orderFilter, setOrderFilter] = useState<'All' | 'Pending' | 'Processing' | 'Delivered'>('All');

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: 12450, isCurrency: true, decimals: 2, icon: DollarSign, change: '+14%', color: 'from-[#B4622F] to-[#D9A441]' },
    { label: 'Active Orders', value: 36, isCurrency: false, decimals: 0, icon: ShoppingBag, change: '+8 new', color: 'from-[#7A2048] to-[#93294F]' },
    { label: 'Bakery Items', value: 142, isCurrency: false, decimals: 0, icon: UtensilsCrossed, change: '+5 this week', color: 'from-[#2B1B14] to-[#4A2E1F]' },
    { label: 'Club Members', value: 1204, isCurrency: false, decimals: 0, icon: Users, change: '+24%', color: 'from-[#93294F] to-[#B4622F]' },
  ];

  const recentOrders = [
    { id: '#RF-9821', customer: 'Rakibul Hasan', item: 'Choco Glazed Donut', status: 'Pending', amount: '$24.50' },
    { id: '#RF-9820', customer: 'Anik Rahman', item: 'Sourdough Bread x2', status: 'Delivered', amount: '$18.00' },
    { id: '#RF-9819', customer: 'Mim Sultana', item: 'Red Velvet Cake', status: 'Processing', amount: '$45.00' },
    { id: '#RF-9818', customer: 'Zayan Khan', item: 'Croissant Box (6pcs)', status: 'Delivered', amount: '$32.00' },
    { id: '#RF-9817', customer: 'Farhana Akter', item: 'Blueberry Muffin x4', status: 'Pending', amount: '$16.00' },
  ];

  const filteredOrders = useMemo(
    () => (orderFilter === 'All' ? recentOrders : recentOrders.filter((o) => o.status === orderFilter)),
    [orderFilter]
  );

  const weekRevenue = [
    { label: 'Sun', Revenue: 1450 },
    { label: 'Mon', Revenue: 1720 },
    { label: 'Tue', Revenue: 1380 },
    { label: 'Wed', Revenue: 2010 },
    { label: 'Thu', Revenue: 1890 },
    { label: 'Fri', Revenue: 2460 },
    { label: 'Sat', Revenue: 2540 },
  ];

  const monthRevenue = [
    { label: 'Feb', Revenue: 8200 },
    { label: 'Mar', Revenue: 9100 },
    { label: 'Apr', Revenue: 8750 },
    { label: 'May', Revenue: 10400 },
    { label: 'Jun', Revenue: 11200 },
    { label: 'Jul', Revenue: 12450 },
  ];

  const topItems = [
    { name: 'Red Velvet Cake', units: 98 },
    { name: 'Sourdough Bread', units: 84 },
    { name: 'Choco Glazed Donut', units: 76 },
    { name: 'Croissant Box', units: 61 },
    { name: 'Blueberry Muffin', units: 47 },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">

      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">Chef Dashboard</h1>
          <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">
            Real Foods "Bitecrafted Art" এর আজকের ওভারভিউ ও ম্যানেজমেন্ট।
          </p>
        </div>

        <div className="flex items-center gap-3">
          {now && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#8A7A6C] bg-white border border-[#E8D9BC] px-3 py-2 rounded-xl">
              <CalendarDays size={14} className="text-[#B4622F]" />
              {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              <span className="text-[#D9A441]">•</span>
              {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/dashboard/admin/add-products">
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-[#7A2048]/20 transition-all">
                <Plus size={18} />
                Add Bakery Item
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5 relative overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-5 rounded-full group-hover:scale-125 transition-transform duration-500`} />

              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-black text-[#2B1B14] tabular-nums">
                    {stat.isCurrency ? (
                      <AnimatedStat target={stat.value} prefix="$" decimals={2} />
                    ) : (
                      <AnimatedStat target={stat.value} />
                    )}
                  </h3>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-[#F3E8D3] shadow-inner`}>
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[#B4622F] bg-[#B4622F]/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  <TrendingUp size={12} />
                  {stat.change}
                </span>
                <span className="text-[#8A7A6C] font-medium">Since last update</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* --- REVENUE CHART + KITCHEN INSIGHTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* REVENUE TREND CHART */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="lg:col-span-2 bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-[#2B1B14] tracking-tight">Revenue Trend</h2>
              <p className="text-xs text-[#8A7A6C] font-medium mt-0.5">Bakery sales performance over time</p>
            </div>
            <div className="flex items-center bg-[#FBF6EC] border border-[#E8D9BC] rounded-lg p-1 text-xs font-bold">
              {(['week', 'month'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1.5 rounded-md transition-all capitalize ${
                    range === r ? 'bg-[#7A2048] text-[#F3E8D3] shadow-sm' : 'text-[#8A7A6C] hover:text-[#2B1B14]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={range === 'week' ? weekRevenue : monthRevenue} margin={{ top: 5, right: 5, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={BRAND.clay} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={BRAND.clay} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={BRAND.border} />
                <XAxis dataKey="label" tick={{ fill: BRAND.muted, fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: BRAND.muted, fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="Revenue"
                  stroke={BRAND.wine}
                  strokeWidth={2.5}
                  fill="url(#revenueFill)"
                  animationDuration={900}
                  activeDot={{ r: 5, fill: BRAND.gold, stroke: BRAND.wine, strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* LIVE KITCHEN INSIGHTS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-gradient-to-b from-[#2B1B14] to-[#4A2E1F] rounded-2xl p-6 shadow-md text-[#F3E8D3] space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9A441]/10 rounded-full filter blur-xl" />

          <div className="space-y-1">
            <h2 className="text-lg font-black tracking-tight text-[#D9A441]">Live Kitchen Insights</h2>
            <p className="text-xs text-[#B0A28F] font-medium">Baking analytics & hourly targets</p>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Daily Oven Capacity', value: 78, color: BRAND.clay },
              { label: 'Pastry & Cake Demand', value: 92, color: BRAND.wine },
              { label: 'Delivery Target Dispatch', value: 60, color: BRAND.gold },
            ].map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>{bar.label}</span>
                  <span className="text-[#D9A441]">{bar.value}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 backdrop-blur-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D9A441]">Chef Note</h4>
            <p className="text-xs text-[#B0A28F] font-semibold leading-relaxed">
              "Red Velvet Cake" এবং "Choco Glazed Donut" এর স্টক আজ দ্রুত শেষ হচ্ছে। স্টক রিস্টোর করার পরামর্শ দেওয়া হলো।
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- ORDERS + TOP ITEMS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* RECENT ORDERS with functional status filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black text-[#2B1B14] tracking-tight">Recent Orders</h2>
            <Link href="/dashboard/admin/foods" className="text-xs font-bold text-[#B4622F] hover:text-[#7A2048] flex items-center gap-0.5 transition-colors">
              View all orders <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Status filter tabs */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Pending', 'Processing', 'Delivered'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setOrderFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  orderFilter === status
                    ? 'bg-[#7A2048] border-[#7A2048] text-[#F3E8D3] shadow-sm'
                    : 'bg-white border-[#E8D9BC] text-[#8A7A6C] hover:border-[#B4622F] hover:text-[#B4622F]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8D9BC] text-xs font-bold text-[#8A7A6C] uppercase tracking-wider">
                  <th className="pb-3 pl-2">ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Bakery Item</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E8D3]/60 text-sm font-semibold text-[#4A2E1F]">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[#FBF6EC]/40 transition-colors group"
                  >
                    <td className="py-3.5 pl-2 text-[#7A2048] font-bold">{order.id}</td>
                    <td className="py-3.5 font-bold text-[#2B1B14]">{order.customer}</td>
                    <td className="py-3.5 text-[#7A6A5C]">{order.item}</td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                        'bg-[#7A2048]/10 text-[#7A2048]'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2 font-black text-[#2B1B14]">{order.amount}</td>
                  </motion.tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#8A7A6C] font-semibold text-sm">
                      No {orderFilter.toLowerCase()} orders right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* TOP SELLING ITEMS CHART */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white border border-[#E8D9BC] rounded-2xl p-6 shadow-sm shadow-[#2B1B14]/5"
        >
          <h2 className="text-lg font-black text-[#2B1B14] tracking-tight mb-1">Top Selling Items</h2>
          <p className="text-xs text-[#8A7A6C] font-medium mb-4">Units sold this month</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topItems} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fill: BRAND.ink2, fontSize: 11, fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: BRAND.bg }} />
                <Bar dataKey="units" name="Units" radius={[0, 6, 6, 0]} animationDuration={900}>
                  {topItems.map((_, i) => (
                    <motion.rect key={i} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}