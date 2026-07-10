"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { BiEnvelope, BiLockOpen } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-2">
      
      {/* HEADER SECTION */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-[#F0EDE6] tracking-tight">
          Welcome Back
        </h2>
        <p className="text-sm text-[#B0ACA2] font-medium">
          New to Real Foods?{" "}
          <a href="/register" className="text-amber-500 font-bold hover:text-amber-400 transition-colors hover:underline">
            Create an account
          </a>
        </p>
      </div>

      {/* CREDENTIALS FORM */}
      <form onSubmit={handleLoginSubmit} className="space-y-5 w-full">
        
        {/* EMAIL INPUT (FULL WIDTH & HIGH CONTRAST) */}
        <div className="w-full">
        <Input
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  labelPlacement="outside"
  fullWidth
  value={email}
  onValueChange={(val) => {
    setEmail(val);
    setErrors((p) => ({ ...p, email: undefined }));
  }}
  isInvalid={!!errors.email}
  errorMessage={errors.email}
  variant="bordered"
  classNames={{
    base: "w-full",
    mainWrapper: "w-full",
    // 1. Added data-hover attribute overrides and forced background color
    inputWrapper: [
      "bg-[#161616]",
      "data-[hover=true]:bg-[#1c1c1c]",
      "group-data-[focus=true]:bg-[#161616]",
      "h-12",
      "rounded-xl",
      "border-white/10",
      "data-[hover=true]:border-white/20",
      "group-data-[focus=true]:!border-amber-500",
      "transition-all",
      "w-full",
    ].join(" "),
    // 2. Clear color definitions for labels, inputs, and placeholders
    label: "text-[#F0EDE6] text-xs font-bold mb-1.5 tracking-wide block",
    input: [
      "text-[#F0EDE6]",
      "placeholder:text-stone-600",
      "text-sm",
      "bg-transparent", // Prevents inner white flashes
    ].join(" "),
    errorMessage: "text-rose-500 text-xs font-medium mt-1",
  }}
  startContent={<BiEnvelope className="text-stone-500 mr-1 shrink-0" size={18} />}
/>
        </div>

        {/* PASSWORD INPUT (FULL WIDTH & HIGH CONTRAST) */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between items-center px-0.5">
            <label className="text-[#F0EDE6] text-xs font-bold tracking-wide">Password</label>
            <a href="/forgot-password" className="text-xs text-[#B0ACA2] hover:text-amber-500 transition-colors font-medium">
              Forgot?
            </a>
          </div>
        <Input
  type="password"
  placeholder="••••••••"
  labelPlacement="outside"
  fullWidth
  value={password}
  onValueChange={(val) => { 
    setPassword(val); 
    setErrors(p => ({ ...p, password: undefined })); 
  }}
  isInvalid={!!errors.password}
  errorMessage={errors.password}
  variant="bordered"
  classNames={{
    base: "w-full", // Removed p-5 to prevent layout fragmentation
    mainWrapper: "w-full",
    // Uses HeroUI's explicit state tokens for reliable rendering over dark surfaces
    inputWrapper: [
      "bg-[#161616]",
      "data-[hover=true]:bg-[#1c1c1c]",
      "group-data-[focus=true]:bg-[#161616]",
      "h-12",
      "rounded-xl",
      "border-white/10",
      "data-[hover=true]:border-white/20",
      "group-data-[focus=true]:!border-amber-500",
      "transition-all",
      "w-full",
    ].join(" "),
    input: [
      "text-[#F0EDE6]",
      "placeholder:text-stone-600",
      "text-sm",
      "bg-transparent" // Eliminates inner container background clashes
    ].join(" "),
    errorMessage: "text-rose-500 text-xs font-medium mt-1",
  }}
  startContent={<BiLockOpen className="text-stone-500 mr-1 shrink-0" size={18} />}
/>
        </div>

        {/* CLEAN AMBER ACTION BUTTON */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2 w-full">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-[#111111] font-black text-sm h-12 rounded-xl transition-all shadow-md shadow-amber-500/5"
          >
            {isLoading ? "Verifying..." : "Sign In"}
          </Button>
        </motion.div>
      </form>

      {/* SEPARATOR */}
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-x-0 h-[1px] bg-white/5" />
        <span className="relative z-10 bg-[#1e1e1e] px-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
          or continue with
        </span>
      </div>

      {/* FULL-WIDTH SOCIAL GOOGLE BUTTON */}
      <div className="w-full">
       <Button
  variant="bordered"
  fullWidth
  onClick={() => console.log("Google Auth")}
  className="w-full border border-white/10 bg-[#1A1A1A] hover:bg-white/5 font-black text-sm h-12 rounded-xl transition-all group"
  startContent={<FaGoogle className="text-rose-500 mr-1 group-hover:scale-110 transition-transform" size={16} />}
>
  <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
    Sign in with Google
  </span>
</Button>
      </div>

    </div>
  );
}