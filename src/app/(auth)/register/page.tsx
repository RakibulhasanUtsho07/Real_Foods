"use client";

import { createAuthClient } from "better-auth/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

// Better-Auth Client Initialize
const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; photo?: string }>({});


  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string; photo?: string } = {};

    if (!name) newErrors.name = "Full name field is required";
    if (!email) newErrors.email = "Email field is required";

    if (!password) {
      newErrors.password = "Password field is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }
   

    if (!photoUrl) newErrors.photo = "Please add a link to your photo";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
    
      const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: photoUrl,
        callbackURL: "/"
      });

      if (error) {
        console.error("Better-Auth Error:", error);
        
        setErrors(p => ({ ...p, email: error.message || "Registration failed" }));
      } else {
        console.log("Successfully saved to MongoDB:", data);
      }
    } catch (err) {
      console.error("Network/Server Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBF6EC] px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#E8D9BC] shadow-sm shadow-[#2B1B14]/5 p-8 space-y-6">

        {/* HEADER SECTION */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#2B1B14] tracking-tight">
            Create account
          </h2>
          <p className="text-sm text-[#7A6A5C] font-medium">
            Already have a license?{" "}
            <a href="/login" className="text-[#B4622F] font-bold hover:text-[#93294F] transition-colors hover:underline">
              Sign in here
            </a>
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <form onSubmit={handleRegisterSubmit} className="space-y-5 w-full block" noValidate>

          {/* AVATAR URL INPUT */}
          <div className="w-full block">
            <label htmlFor="photoUrl" className="text-[#8A7A6C] text-[10px] font-bold mb-1.5 tracking-wider uppercase block pl-1">
              Profile avatar link
            </label>
            <div className="relative w-full">
              <HiOutlinePhotograph className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4622F] text-lg pointer-events-none" />
              <input
                id="photoUrl"
                type="url"
                autoComplete="off"
                placeholder="https://example.com/your-photo.jpg"
                value={photoUrl}
                onChange={(e) => {
                  setPhotoUrl(e.target.value);
                  setErrors((p) => ({ ...p, photo: undefined }));
                }}
                className={`w-full h-12 rounded-xl bg-[#FBF6EC] border text-sm font-medium text-[#2B1B14] placeholder:text-[#B0A28F] pl-10 pr-11 outline-none transition-all focus:bg-white focus:ring-2 ${
                  errors.photo
                    ? "border-[#C0392B] focus:ring-[#C0392B]/20"
                    : "border-[#E8D9BC] focus:border-[#B4622F] focus:ring-[#B4622F]/15"
                }`}
              />
              {photoUrl && !errors.photo && (
                <img
                  src={photoUrl}
                  alt="Avatar preview"
                  onError={() => setErrors((p) => ({ ...p, photo: "That link doesn't look like a valid image" }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md object-cover border border-[#E8D9BC]"
                />
              )}
            </div>
            {errors.photo && (
              <p className="text-[#C0392B] text-xs font-semibold mt-1.5 pl-1">{errors.photo}</p>
            )}
          </div>

          {/* INPUT: FULL NAME */}
          <div className="w-full block">
            <label htmlFor="name" className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider mb-1.5 block pl-1">
              Full name
            </label>
            <div className="relative w-full">
              <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4622F] text-lg pointer-events-none" />
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((p) => ({ ...p, name: undefined }));
                }}
                className={`w-full h-12 rounded-xl bg-[#FBF6EC] border text-sm font-medium text-[#2B1B14] placeholder:text-[#B0A28F] pl-10 pr-4 outline-none transition-all focus:bg-white focus:ring-2 ${
                  errors.name
                    ? "border-[#C0392B] focus:ring-[#C0392B]/20"
                    : "border-[#E8D9BC] focus:border-[#B4622F] focus:ring-[#B4622F]/15"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs font-semibold text-[#C0392B] mt-1.5 pl-1">{errors.name}</p>
            )}
          </div>

          {/* INPUT: EMAIL ADDRESS */}
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
                  setErrors((p) => ({ ...p, email: undefined }));
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

          {/* INPUT: PASSWORD */}
          <div className="w-full block">
            <label htmlFor="password" className="text-xs font-bold text-[#8A7A6C] uppercase tracking-wider mb-1.5 block pl-1">
              Password
            </label>
            <div className="relative w-full">
              <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B4622F] text-lg pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: undefined }));
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

          {/* PRIMARY SUBMIT ACTION BUTTON */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2 w-full block">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] font-black text-sm shadow-md shadow-[#7A2048]/20 transition-opacity disabled:opacity-80 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-[#F3E8D3]/40 border-t-[#F3E8D3] rounded-full animate-spin" />
              )}
              {isLoading ? "Generating account..." : "Register account"}
            </button>
          </motion.div>
        </form>

        {/* SEPARATOR */}
        <div className="relative flex items-center justify-center py-2 w-full">
          <div className="absolute inset-x-0 h-[1px] bg-[#E8D9BC]" />
          <span className="relative z-10 bg-white px-4 text-[10px] uppercase tracking-widest text-[#8A7A6C] font-bold">
            or register with
          </span>
        </div>

        {/* GOOGLE AUTH REGISTRATION */}
        <div className="w-full block">
          <button
            type="button"
            onClick={() => console.log("Google Auth")}
            className="w-full h-12 rounded-xl border border-[#E8D9BC] bg-white hover:bg-[#FBF6EC] font-black text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <FaGoogle className="text-[#B4622F] group-hover:scale-110 transition-transform" size={16} />
            <span className="text-[#2B1B14]">Sign up with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
}