"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface TimerProps {
  targetDate: string;
}

export default function OfferCountDownClient({ targetDate }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isMounted) return <div className="h-20 bg-[#FBF6EC] rounded-xl animate-pulse" />;

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="space-y-4">
      
      {/* 🥞 PULSING COUNTDOWN MATRIX */}
      <div className="flex items-center gap-3">
        {[
          { label: 'Hrs', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds }
        ].map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-2">
            <motion.div 
              // মৃদু পালস অ্যানিমেশন (ইউজারের নজর কাড়ার জন্য)
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: idx * 0.2 }}
              className="size-14 sm:size-16 bg-[#FBF6EC] border border-[#E8D9BC] rounded-xl flex flex-col items-center justify-center shadow-inner"
            >
              <span className="text-lg sm:text-xl font-black text-[#7A2048] tracking-tight">
                {formatNum(unit.value)}
              </span>
              <span className="text-[9px] font-black uppercase text-[#8A7A6C]">
                {unit.label}
              </span>
            </motion.div>
            {idx < 2 && <span className="text-xl font-black text-[#E8D9BC] animate-pulse">:</span>}
          </div>
        ))}
      </div>

      {/* 🚀 ACTION CALL BUTTON */}
      <button 
        onClick={() => alert('Special Combo added to your baking list!')}
        className="w-full sm:w-auto px-8 py-3.5 bg-[#7A2048] hover:bg-[#5C1535] text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-md shadow-[#7A2048]/20 flex items-center justify-center gap-3 transition-colors group"
      >
        <ShoppingCart size={15} className="group-hover:rotate-12 transition-transform" />
        Claim Offer Before Oven Empties
      </button>

    </div>
  );
}