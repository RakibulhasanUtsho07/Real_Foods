"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { authClient } from "@/lib/auth-client"; // 👈 আপনার প্রজেক্টের সঠিক পাথটি দিন
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; global?: string }>({});
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; global?: string } = {};

    if (!email) {
      newErrors.email = "Email field is required";
    }
    if (!password) {
      newErrors.password = "Password field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Better-Auth এর মাধ্যমে ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন প্রোসেস
    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          router.push("/"); // ✅ সফলভাবে লগইন হলে হোম পেজে রিডাইরেক্ট
          router.refresh();
        },
        onError: (ctx) => {
          // কোনো ভুল হলে (যেমন: ভুল পাসওয়ার্ড বা ইউজার না থাকলে) এরর মেসেজ সেট হবে
          setErrors({ global: ctx.error.message || "Invalid credentials, please try again." });
        },
      },
    });
  };

  // গুগল ওয়ান-ট্যাপ বা সোশ্যাল লগইন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // ✅ গুগল লগইন সফল হলেও হোম পেজে রিডাইরেক্ট করবে
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBF6EC] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E8D9BC] shadow-sm shadow-[#2B1B14]/5 p-8 space-y-6">

        {/* HEADER SECTION */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#2B1B14] tracking-tight">
            Welcome back
          </h2>
          <p className="text-sm text-[#7A6A5C] font-medium">
            New to Real Foods?{" "}
            <a href="/register" className="text-[#B4622F] font-bold hover:text-[#93294F] transition-colors hover:underline">
              Create an account
            </a>
          </p>
        </div>

        {/* CREDENTIALS FORM */}
        <form onSubmit={handleLoginSubmit} className="space-y-5 w-full block" noValidate>
          
          {/* GLOBAL ERROR MESSAGE */}
          {errors.global && (
            <div className="p-3 bg-[#C0392B]/10 border border-[#C0392B]/20 rounded-xl text-center">
              <p className="text-xs font-bold text-[#C0392B]">{errors.global}</p>
            </div>
          )}

          {/* EMAIL INPUT */}
          <div className="w-full block">
            <label htmlFor="email" className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider mb-1.5 block pl-1">
              Email address
            </label>
            <div className="relative w-full">
              <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4622F] text-lg pointer-events-none" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: undefined, global: undefined }));
                }}
                className={`w-full h-12 rounded-xl bg-[#FBF6EC] border text-sm font-medium text-[#2B1B14] placeholder:text-[#B0A28F] pl-10 pr-4 outline-none transition-all focus:bg-white focus:ring-2 ${
                  errors.email
                    ? "border-[#C0392B] focus:ring-[#C0392B]/20"
                    : "border-[#E8D9BC] focus:border-[#B4622F] focus:ring-[#B4622F]/15"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs font-semibold text-[#C0392B] mt-1.5 pl-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD INPUT */}
          <div className="w-full block relative">
            <div className="flex items-center justify-between mb-1.5 pl-1 pr-1">
              <label htmlFor="password" className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider">
                Password
              </label>
              <a href="/forgot-password" className="text-xs font-semibold text-[#B4622F] hover:text-[#93294F] transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative w-full">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4622F] text-lg pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: undefined, global: undefined }));
                }}
                className={`w-full h-12 rounded-xl bg-[#FBF6EC] border text-sm font-medium text-[#2B1B14] placeholder:text-[#B0A28F] pl-10 pr-11 outline-none transition-all focus:bg-white focus:ring-2 ${
                  errors.password
                    ? "border-[#C0392B] focus:ring-[#C0392B]/20"
                    : "border-[#E8D9BC] focus:border-[#B4622F] focus:ring-[#B4622F]/15"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7A6C] hover:text-[#B4622F] transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-semibold text-[#C0392B] mt-1.5 pl-1">{errors.password}</p>
            )}
          </div>

          {/* BRAND MATCHED BUTTON */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2 w-full block">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] font-black text-sm shadow-md shadow-[#7A2048]/20 transition-opacity disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-[#F3E8D3]/40 border-t-[#F3E8D3] rounded-full animate-spin" />
              )}
              {isLoading ? "Verifying..." : "Sign in"}
            </button>
          </motion.div>
        </form>

        {/* SEPARATOR */}
        <div className="relative flex items-center justify-center py-2 w-full">
          <div className="absolute inset-x-0 h-[1px] bg-[#E8D9BC]" />
          <span className="relative z-10 bg-white px-4 text-[10px] uppercase tracking-widest text-[#8A7A6C] font-bold">
            or continue with
          </span>
        </div>

        {/* FULL-WIDTH SOCIAL GOOGLE BUTTON */}
        <div className="w-full block">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 rounded-xl border border-[#E8D9BC] bg-white hover:bg-[#FBF6EC] font-black text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <FaGoogle className="text-[#B4622F] group-hover:scale-110 transition-transform" size={16} />
            <span className="text-[#2B1B14]">Sign in with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
}