"use client";

import React from "react";
import { 
  Cookie, 
  LayoutDashboard, 
  PlusCircle, 
  UtensilsCrossed, 
  ShoppingBag, 
  User, 
  Menu
} from "lucide-react";
import { Drawer, Button } from "@heroui/react";
import Link from "next/link";

// ✅ ফিক্স: role ফিল্ডে null এলাউ করা হলো যেন session response এর সাথে Type match করে
interface DashboardUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string | null;
  [key: string]: any;
}

interface DashboardSidebarProps {
  user: DashboardUser | null;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {

  // 🥐 সাধারণ ইউজার/কাস্টমার ড্যাশবোর্ড লিংকসমূহ
  const userNavLink = [
    { icon: LayoutDashboard, label: "Dashboard Home", link: "user" },
    { icon: UtensilsCrossed, label: "Explore Foods", link: "user/foods" },
    { icon: ShoppingBag, label: "Order History", link: "user/my-orders" },
    { icon: User, label: "My Profile", link: "user/profile" },
  ];

  // 👑 অ্যাডমিন ড্যাশবোর্ড লিংকসমূহ (বেকারি ম্যানেজমেন্ট)
  const adminNavItems = [
    { icon: LayoutDashboard, label: "Admin Home", link: "admin" },
    { icon: PlusCircle, label: "Add Bakery Item", link: "admin/add-products" },
    { icon: UtensilsCrossed, label: "Manage Foods", link: "admin/foods" },
    { icon: User, label: "Admin Profile", link: "admin/profile" },
  ];

  // রোলের ওপর ভিত্তি করে ডাইনামিক রেন্ডারিং
  const navItems = user?.role === "admin" ? adminNavItems : userNavLink;

  // Real Foods ব্র্যান্ডের লোগো কম্পোনেন্ট
  const Logo = () => (
    <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
      <div className="p-2 bg-gradient-to-tr from-[#7A2048] to-[#93294F] rounded-xl shadow-md shadow-[#7A2048]/20 text-[#F3E8D3]">
        <Cookie size={20} className="animate-pulse" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-[#B4622F] via-[#7A2048] to-[#2B1B14] dark:to-[#F3E8D3] bg-clip-text text-transparent">
          REAL FOODS
        </span>
        <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase mt-0.5">
          Bitecrafted Art
        </span>
      </div>
    </Link>
  );

  // ডেক্সটপ ও মোবাইল উভয়ের জন্য কমন লিংক রেন্ডারার
  const renderNavLinks = (isMobile = false) => (
    <nav className="flex flex-col gap-2 w-full">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            href={`/dashboard/${item.link}`}
            key={item.label}
            slot={isMobile ? "close" : undefined}
            className="group flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm font-semibold text-[#7A6A5C] dark:text-[#B0A28F] hover:text-[#7A2048] dark:hover:text-[#F3E8D3] transition-all bg-transparent hover:bg-[#F3E8D3]/50 dark:hover:bg-[#4A2E1F]/40 border border-transparent hover:border-[#E8D9BC]/40 dark:hover:border-[#4A2E1F]"
          >
            <div className="flex items-center gap-3.5">
              <IconComponent className="size-5 text-[#B4622F] group-hover:text-[#7A2048] dark:group-hover:text-[#D9A441] transition-colors" />
              <span className="tracking-wide font-bold">{item.label}</span>
            </div>
            
            <div className="size-1.5 rounded-full bg-[#B4622F] opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_8px_rgba(180,98,47,0.8)] transform translate-x-2 group-hover:translate-x-0 duration-300" />
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 🖥️ ডেক্সটপ সাইডবার */}
      <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#FBF6EC] dark:bg-[#2B1B14] border-r border-[#E8D9BC] dark:border-[#4A2E1F] shrink-0 z-20">
        <div className="py-6 px-4 flex-1 overflow-y-auto">
          {renderNavLinks(false)}
        </div>
      </aside>

      {/* 📱 মোবাইল ও ট্যাবলেট ড্রয়ার */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <Drawer>
          <Button 
            className="bg-[#FBF6EC]/90 dark:bg-[#2B1B14]/90 border border-[#E8D9BC] dark:border-[#4A2E1F] text-[#4A2E1F] dark:text-[#F3E8D3] hover:text-[#7A2048] transition-all font-bold rounded-xl shadow-md backdrop-blur-sm px-4 h-10 flex items-center gap-2"
          >
            <Menu className="size-4 text-[#B4622F]" />
            Menu
          </Button>

          <Drawer.Backdrop variant="blur">
            <Drawer.Content placement="left" className="bg-[#FBF6EC]/95 dark:bg-[#2B1B14]/95 text-[#2B1B14] dark:text-[#F3E8D3] max-w-xs w-full border-r border-[#E8D9BC] dark:border-[#4A2E1F]">
              <Drawer.Dialog>
                <Drawer.CloseTrigger className="text-[#7A6A5C] hover:text-[#2B1B14] dark:hover:text-white" />
                
                <Drawer.Header className="flex flex-col gap-1 pt-6 px-6">
                  <Logo />
                </Drawer.Header>
                
                <Drawer.Body className="py-6 px-4">
                  {renderNavLinks(true)}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}