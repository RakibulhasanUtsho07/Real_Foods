"use client";

import React from "react";
import { Link, Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  SiInstagram, 
  SiFacebook, 
  SiYoutube, 
  SiPinterest 
} from "react-icons/si";
import { 
  BiCookie, 
  BiEnvelope, 
  BiMap, 
  BiPhone, 
  BiTimeFive, 
  BiChevronRight 
} from "react-icons/bi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social handles block configuration
  const socials = [
    { icon: <SiInstagram size={18} />, href: "https://instagram.com", color: "hover:text-pink-500 hover:bg-pink-500/10" },
    { icon: <SiFacebook size={18} />, href: "https://facebook.com", color: "hover:text-blue-500 hover:bg-blue-500/10" },
    { icon: <SiYoutube size={18} />, href: "https://youtube.com", color: "hover:text-red-500 hover:bg-red-500/10" },
    { icon: <SiPinterest size={18} />, href: "https://pinterest.com", color: "hover:text-red-600 hover:bg-red-600/10" },
  ];

  const exploreLinks = [
    { label: "Sourdough Breads", href: "/explore?category=breads" },
    { label: "Laminated Pastries", href: "/explore?category=pastries" },
    { label: "Artisanal Cakes", href: "/explore?category=cakes" },
    { label: "Seasonal Specials", href: "/explore?discount=true" },
  ];

  const companyLinks = [
    { label: "Our Story", href: "/about" },
    { label: "Baking Process", href: "/process" },
    { label: "Contact Kitchen", href: "/contact" },
    { label: "Privacy & Terms", href: "/privacy" },
  ];

  return (
    <footer className="relative w-full bg-[#111111] text-[#F0EDE6] border-t border-white/5 pt-24 pb-12 overflow-hidden select-none">
      
      {/* BACKGROUND GRAPHIC ELEMENTS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B01750]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* --- TOP SECTION: FLOATING VIP CLUB ACTION CARD --- */}
        <div className="w-full bg-[#1E1E1E] rounded-[2rem] p-8 md:p-10 mb-16 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-md">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">
              <BiCookie className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>Fresh From The Oven</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Join the Secret Baker's Club
            </h3>
            <p className="text-sm text-[#B0ACA2] mt-1.5 leading-relaxed">
              Get notified the exact minute our morning sourdough loaves and flaky croissants drop out of the deck ovens.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3 min-w-[320px] sm:min-w-[450px]">
            <Input
              type="email"
              placeholder="Enter your email address"
              variant="bordered"
              radius="full"
              className="w-full text-white"
              classNames={{
                inputWrapper: "border-white/10 hover:border-white/20 focus-within:!border-amber-500/50 bg-[#111111] h-12 text-sm",
                input: "text-white placeholder:#B0ACA2"
              }}
              startContent={<BiEnvelope className="text-[#B0ACA2]" size={18} />}
            />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto shrink-0">
              <Button className="w-full sm:w-auto bg-[#B01750] text-white font-bold h-12 px-8 rounded-full shadow-lg shadow-[#B01750]/10 border border-white/5">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: FOUR GRID COLUMNS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Anchor */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                REAL FOODS
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#B0ACA2] uppercase mt-0.5">
                Bitecrafted Art • Est. 2026
              </span>
            </div>
            <p className="text-sm text-[#B0ACA2] leading-relaxed max-w-sm mt-2">
              Honest ingredients, slow wild fermentations, and traditional fire baking techniques engineered into a modern culinary luxury.
            </p>
            {/* Social Circle Micro-interactions */}
            <div className="flex gap-3 mt-2">
              {socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className={`p-2.5 bg-[#1E1E1E] border border-white/5 rounded-full text-[#B0ACA2] transition-colors duration-300 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Live Menu Directory Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-amber-500 pl-3">
              Explore Bakes
            </h4>
            <ul className="flex flex-col gap-3.5">
              {exploreLinks.map((link, idx) => (
                <li key={idx} className="group flex items-center text-sm text-[#B0ACA2] hover:text-white transition-colors">
                  <BiChevronRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-amber-500 mr-1" size={16} />
                  <Link href={link.href} className="text-inherit text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Utility / Info Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6 border-l-2 border-amber-500 pl-3">
              Our House
            </h4>
            <ul className="flex flex-col gap-3.5">
              {companyLinks.map((link, idx) => (
                <li key={idx} className="group flex items-center text-sm text-[#B0ACA2] hover:text-white transition-colors">
                  <BiChevronRight className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-amber-500 mr-1" size={16} />
                  <Link href={link.href} className="text-inherit text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kitchen Operations / Contact Map Block */}
          <div className="flex flex-col gap-4 text-sm text-[#B0ACA2]">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2 border-l-2 border-amber-500 pl-3">
              The Kitchen
            </h4>
            
            <div className="flex items-start gap-3 mt-2">
              <BiMap className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <span className="leading-relaxed">72 Bakers Guild Lane, Flour District, Food City</span>
            </div>

            <div className="flex items-center gap-3">
              <BiPhone className="text-amber-500 shrink-0" size={18} />
              <span>+1 (555) 839-2253</span>
            </div>

            <div className="flex items-start gap-3">
              <BiTimeFive className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-white font-medium">Oven Drops Daily:</p>
                <p className="text-xs mt-0.5">Tue — Sun: 6:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: LEGAL WATERMARK CONTAINER --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B0ACA2] font-medium">
          <p>© {currentYear} Real Foods Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-[#B0ACA2] hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-xs text-[#B0ACA2] hover:text-white transition-colors">Delivery Zones</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}