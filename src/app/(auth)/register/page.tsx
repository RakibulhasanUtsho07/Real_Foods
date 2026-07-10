"use client";

import React, { useState, useRef } from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { BiUser, BiEnvelope, BiLockOpen, BiCloudUpload, BiCheckCircle } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; photo?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setErrors(p => ({ ...p, photo: undefined }));
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string; photo?: string } = {};

    if (!name) newErrors.name = "Full name is required.";
    if (!email) newErrors.email = "Email address is required.";
    if (!password) newErrors.password = "Password field cannot be empty.";
    if (!photo) newErrors.photo = "Please upload an account photo.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    // Dynamic account generation payload goes here
    console.log("Registering Guild Member:", { name, email, password, photo });
    
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full xl:max-w-md mx-auto space-y-6 p-4">
      
      {/* HEADER SECTION */}
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-[#F0EDE6] tracking-tight">
          Create Account
        </h2>
        <p className="text-sm text-[#B0ACA2] font-medium">
          Already have a license?{" "}
          <a href="/login" className="text-amber-500 font-bold hover:text-amber-400 transition-colors hover:underline">
            Sign in here
          </a>
        </p>
      </div>

      {/* REGISTRATION FORM */}
      <form onSubmit={handleRegisterSubmit} className="space-y-5 w-full block">
        
        {/* FULL-WIDTH PHOTO UPLOAD CONTAINER */}
        <div className="w-full block">
          <label className="text-[#F0EDE6] text-xs font-bold mb-1.5 tracking-wide block">
            Profile Avatar
          </label>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`w-full h-20 rounded-xl border border-dashed transition-all duration-200 cursor-pointer flex items-center justify-center px-4 gap-4 ${
              photoPreview 
                ? "border-amber-500/40 bg-[#1A1A1A]" 
                : errors.photo 
                  ? "border-rose-500 bg-rose-500/5" 
                  : "border-white/10 bg-[#1A1A1A] hover:border-white/20"
            }`}
          >
            {photoPreview ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <img src={photoPreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                  <span className="text-xs text-[#F0EDE6] font-medium truncate max-w-[180px]">{photo?.name}</span>
                </div>
                <BiCheckCircle className="text-amber-500 shrink-0" size={20} />
              </div>
            ) : (
              <div className="flex items-center gap-3 text-stone-500">
                <BiCloudUpload size={22} className="shrink-0" />
                <span className="text-xs font-medium text-[#B0ACA2]">Click to upload profile photo</span>
              </div>
            )}
          </div>
          {errors.photo && (
            <p className="text-rose-500 text-xs font-medium mt-1">{errors.photo}</p>
          )}
        </div>

        {/* INPUT: FULL NAME */}
        <div className="w-full block">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            labelPlacement="outside"
            fullWidth
            value={name}
            onValueChange={(val) => { setName(val); setErrors(p => ({ ...p, name: undefined })); }}
            isInvalid={!!errors.name}
            errorMessage={errors.name}
            variant="bordered"
            classNames={{
              base: "w-full min-w-full !max-w-full block",
              mainWrapper: "w-full min-w-full",
              inputWrapper: [
                "bg-[#1A1A1A]",
                "data-[hover=true]:bg-[#222222]",
                "group-data-[focus=true]:bg-[#1A1A1A]",
                "h-12 w-full min-w-full",
                "rounded-xl border-white/10",
                "data-[hover=true]:border-white/20",
                "group-data-[focus=true]:!border-amber-500",
                "transition-all"
              ].join(" "),
              label: "text-[#F0EDE6] text-xs font-bold mb-1.5 tracking-wide block",
              input: "placeholder:text-stone-600 text-sm text-[#F0EDE6] bg-transparent w-full"
            }}
            startContent={<BiUser className="text-stone-500 mr-1 shrink-0" size={18} />}
          />
        </div>

        {/* INPUT: EMAIL ADDRESS */}
        <div className="w-full block">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            labelPlacement="outside"
            fullWidth
            value={email}
            onValueChange={(val) => { setEmail(val); setErrors(p => ({ ...p, email: undefined })); }}
            isInvalid={!!errors.email}
            errorMessage={errors.email}
            variant="bordered"
            classNames={{
              base: "w-full min-w-full !max-w-full block",
              mainWrapper: "w-full min-w-full",
              inputWrapper: [
                "bg-[#1A1A1A]",
                "data-[hover=true]:bg-[#222222]",
                "group-data-[focus=true]:bg-[#1A1A1A]",
                "h-12 w-full min-w-full",
                "rounded-xl border-white/10",
                "data-[hover=true]:border-white/20",
                "group-data-[focus=true]:!border-amber-500",
                "transition-all"
              ].join(" "),
              label: "text-[#F0EDE6] text-xs font-bold mb-1.5 tracking-wide block",
              input: "placeholder:text-stone-600 text-sm text-[#F0EDE6] bg-transparent w-full"
            }}
            startContent={<BiEnvelope className="text-stone-500 mr-1 shrink-0" size={18} />}
          />
        </div>

        {/* INPUT: PASSWORD */}
        <div className="w-full block space-y-1.5">
          <label className="text-[#F0EDE6] text-xs font-bold tracking-wide block">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            labelPlacement="outside"
            fullWidth
            value={password}
            onValueChange={(val) => { setPassword(val); setErrors(p => ({ ...p, password: undefined })); }}
            isInvalid={!!errors.password}
            errorMessage={errors.password}
            variant="bordered"
            classNames={{
              base: "w-full min-w-full !max-w-full block",
              mainWrapper: "w-full min-w-full",
              inputWrapper: [
                "bg-[#1A1A1A]",
                "data-[hover=true]:bg-[#222222]",
                "group-data-[focus=true]:bg-[#1A1A1A]",
                "h-12 w-full min-w-full",
                "rounded-xl border-white/10",
                "data-[hover=true]:border-white/20",
                "group-data-[focus=true]:!border-amber-500",
                "transition-all"
              ].join(" "),
              input: "placeholder:text-stone-600 text-sm text-[#F0EDE6] bg-transparent w-full"
            }}
            startContent={<BiLockOpen className="text-stone-500 mr-1 shrink-0" size={18} />}
          />
        </div>

        {/* PRIMARY SUBMIT ACTION */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2 w-full block">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full min-w-full bg-[#B01750] hover:bg-[#c21f5d] text-white font-black text-sm h-12 rounded-xl transition-all shadow-md shadow-[#B01750]/20"
          >
            {isLoading ? "Generating Account..." : "Register Account"}
          </Button>
        </motion.div>
      </form>

      {/* SEPARATOR */}
      <div className="relative flex items-center justify-center py-2 w-full">
        <div className="absolute inset-x-0 h-[1px] bg-white/5" />
        <span className="relative z-10 bg-[#1E1E1E] px-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
          or register with
        </span>
      </div>

      {/* BRAND GRADIENT GOOGLE OAUTH */}
      <div className="w-full block">
        <Button
          variant="bordered"
          fullWidth
          onClick={() => console.log("Google Auth")}
          className="w-full min-w-full border border-white/10 bg-[#1A1A1A] hover:bg-white/5 font-bold text-sm h-12 rounded-xl transition-all group"
          startContent={<FaGoogle className="text-rose-500 mr-1 group-hover:scale-110 transition-transform" size={14} />}
        >
          <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">
            Sign up with Google
          </span>
        </Button>
      </div>

    </div>
  );
}