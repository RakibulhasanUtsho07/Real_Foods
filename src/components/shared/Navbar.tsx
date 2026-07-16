"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ShoppingCart, User, LogOut, Cookie, Menu, X } from "lucide-react";
import { useSession, authClient } from "@/lib/auth-client"; // 👈 আপনার authClient এর সঠিক পাথ দিন
import { useRouter } from "next/navigation";
import { getCartItems } from "@/lib/api/action/action";

export default function RealFoodsNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession(); // 👈 Better-Auth সেশন হুক
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  const isLoggedIn = !!session;
  const user = session?.user;
  const userRole = user?.role;
  const userId = user?.id || (user as any)?._id;

  // ফেচ কার্ট কাউন্ট — সেশন/ইউজার আইডি বদলালে রি-রান হবে
  useEffect(() => {
    if (!userId) {
      setCartCount(0);
      return;
    }

    let isMounted = true;

    const fetchCartCount = async () => {
      const result = await getCartItems(userId);
      if (!isMounted) return;

      if (result?.success && Array.isArray(result.data)) {
        const total = result.data.reduce(
          (sum: number, item: any) => sum + (item?.product?.quantity || 0),
          0
        );
        setCartCount(total);
      } else {
        setCartCount(0);
      }
    };

    fetchCartCount();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // লগআউট সফল হলে হোম পেজে রিডাইরেক্ট করবে
          router.refresh();
        },
      },
    });
  };

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    }
  };

  // 3 Routes for Logged Out users
  const publicRoutes = [
    { label: "Home", href: "/" },
    { label: "Our Menu", href: "/explore" },
    { label: "About Bakery", href: "/about" },
  ];

  // 5 Routes for Logged In users
  const privateRoutes = [
    { label: "Home", href: "/" },
    { label: "Our Menu", href: "/dashboard/user/menu" },
    { label: "Dashboard", href: `/dashboard/${userRole}` },
    { label: "Order History", href: "/orders" },
  ];

  const currentRoutes = isLoggedIn ? privateRoutes : publicRoutes;

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#FBF6EC]/80 dark:bg-[#2B1B14]/85 border-b border-[#E8D9BC] dark:border-[#4A2E1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* --- LEFT SIDE: MOBILE TOGGLE & LOGO --- */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-[#7A2048] hover:bg-[#F3E8D3] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 bg-gradient-to-tr from-[#7A2048] to-[#93294F] rounded-xl shadow-md shadow-[#7A2048]/20 text-[#F3E8D3]"
              >
                <Cookie size={22} className="animate-pulse" />
              </motion.div>
              <div className="flex flex-col select-none">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-[#B4622F] via-[#7A2048] to-[#2B1B14] bg-clip-text text-transparent">
                  REAL FOODS
                </span>
                <span className="text-[10px] font-bold tracking-widest text-[#D9A441] uppercase -mt-1">
                  Bitecrafted Art
                </span>
              </div>
            </Link>
          </div>

          {/* --- CENTER: DESKTOP NAVIGATION --- */}
          <div className="hidden sm:flex items-center gap-8">
            {currentRoutes.map((route, index) => (
              <div key={index} className="relative group py-2">
                <Link
                  href={route.href}
                  className="font-medium text-[#4A2E1F] hover:text-[#B4622F] transition-colors duration-200"
                >
                  {route.label}
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B4622F] transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* --- RIGHT SIDE: ACTION BUTTONS --- */}
          <div className="flex items-center gap-4">

            {/* CART ICON — functional link, badge count, distinct bounce animation */}
            <Link href="/dashboard/user/cart" onClick={handleCartClick}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full text-[#4A2E1F] hover:text-[#7A2048] hover:bg-[#F3E8D3] transition-colors"
                aria-label="View cart"
              >
                <ShoppingCart size={20} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gradient-to-br from-[#7A2048] to-[#93294F] text-[#F3E8D3] text-[10px] font-black rounded-full shadow-md shadow-[#7A2048]/30"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </Link>

            <AnimatePresence mode="wait">
              {isPending ? (
                // সেশন লোড হওয়ার সময় একটি ছোট স্কেলেটন দেখাবে
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : !isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="hidden md:inline-flex">
                    <button className="px-4 py-2 font-semibold text-[#4A2E1F] hover:text-[#B4622F] transition-colors rounded-lg">
                      Log In
                    </button>
                  </Link>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href="/register">
                      <button className="bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] font-semibold shadow-md shadow-[#7A2048]/25 px-5 py-2 rounded-xl transition-transform">
                        Join Club
                      </button>
                    </Link>
                  </motion.div>
                </div>
              ) : (
                // ✅ লগইন থাকলে ডাইনামিক ইউজার ইমেজ, নেম এবং রিয়েল লগআউট বাটন দেখাবে
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border-l pl-3 border-[#E8D9BC]">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#B4622F]"
                      />
                    ) : (
                      <div className="p-1.5 bg-[#B4622F]/10 rounded-full text-[#B4622F]">
                        <User size={18} />
                      </div>
                    )}
                    <span className="text-sm font-semibold text-[#4A2E1F] hidden lg:inline max-w-[120px] truncate">
                      {session.user.name}
                    </span>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={handleLogout}
                      className="p-2 bg-[#7A2048]/10 text-[#7A2048] hover:bg-[#7A2048]/20 rounded-xl transition-colors"
                      title="Logout"
                    >
                      <LogOut size={16} />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- RESPONSIVE MOBILE MENU DRAWER --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#FBF6EC]/95 backdrop-blur-md border-t border-[#E8D9BC] overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {currentRoutes.map((route, index) => (
                <Link
                  key={index}
                  className="block w-full text-[#2B1B14] text-lg font-semibold hover:text-[#B4622F] py-2 border-b border-[#F3E8D3]"
                  href={route.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}

              {isLoggedIn && (
                <Link
                  href="/dashboard/user/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between w-full text-[#2B1B14] text-lg font-semibold hover:text-[#B4622F] py-2 border-b border-[#F3E8D3]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={18} />
                    My Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-[#7A2048] text-[#F3E8D3] text-xs font-black rounded-full">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </Link>
              )}

              {!isLoggedIn && (
                <div className="flex flex-col gap-2 pt-4">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <button className="w-full py-2.5 rounded-xl border border-[#B4622F] text-[#B4622F] font-semibold hover:bg-[#F3E8D3] transition-colors">
                      Log In
                    </button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] font-semibold hover:opacity-90 transition-colors">
                      Join Club
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}