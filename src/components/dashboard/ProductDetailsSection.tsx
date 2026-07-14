"use client";

import React, { useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
// ⚠️ swap if using a different auth provider
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Zap,
  Calendar,
  ShieldAlert,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { BakeryProduct } from '@/src/app/dashboard/user/foods/page';
// ⚠️ adjust to your real export names
import Image from 'next/image';
import { addToCartAction, placeOrder } from '@/lib/api/action/action';

interface ProductDetailsClientProps {
  product: BakeryProduct;
}

export default function ProductDetailsClient({ product, user }: ProductDetailsClientProps) {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const basePrice = product.price || 0;
  const totalPrice = basePrice * quantity;

  const formatDate = (dateInput: string | Date | undefined) => {
    if (!dateInput) return 'Freshly Baked';
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Shared payload: product info + user info, sent to backend for both cart & order
  const buildPayload = () => ({
    product: {
      productId: (product as any)._id || (product as any).id,
      name: product.name,
      image: product.image,
      price: basePrice,
      quantity,
      total: totalPrice,
    },
    user: {
      userId: (session?.user as any)?.id || null,
      name: session?.user?.name || null,
      email: session?.user?.email || null,
    },
  });

  const isLoggedIn = status === 'authenticated' && !!session?.user;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    setIsAddingToCart(true);
    try {
      await addToCartAction(buildPayload());
      setIsAdded(true);
      toast.success(`${product.name} added to your cart!`);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
      toast.error(err?.message || 'Could not add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleOrderNow = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to place an order.');
      return;
    }
    setIsOrdering(true);
    try {
      await placeOrder(buildPayload());
      toast.success(`Order placed for ${quantity} × ${product.name}!`);
    } catch (err: any) {
      console.error('Failed to place order:', err);
      toast.error(err?.message || 'Order could not be placed. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* BACK NAVIGATION ACTION BAR */}
      <Link
        href="/dashboard/user/foods"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#7A6A5C] hover:text-[#7A2048] transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Catalog
      </Link>

      {/* CORE DETAILS CARD PANEL */}
      <div className="bg-white border border-[#E8D9BC] rounded-3xl overflow-hidden shadow-sm shadow-[#2B1B14]/5 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-8">

        {/* LEFT COLUMN: VISUAL CONTAINER */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FBF6EC] border border-[#F3E8D3]">
          <Image
            src={product.image || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800"}
            alt={product.name}
            fill
            priority
            className="object-cover object-center transition-transform duration-700 hover:scale-102"
            sizes="(max-w-768px) 100vw, 50vw"
          />

          {product.category && (
            <span className="absolute top-4 left-4 bg-[#2B1B14]/90 backdrop-blur-md text-[#F3E8D3] text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl shadow-md">
              {product.category}
            </span>
          )}
        </div>

        {/* RIGHT COLUMN: INFORMATION & TRANSACTION UTILITIES */}
        <div className="flex flex-col justify-between space-y-6 lg:py-2">

          <div className="space-y-4">
            <div className="space-y-1.5">
              <h1 className="text-2xl lg:text-3xl font-black text-[#2B1B14] tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-[#7A2048]">${basePrice.toFixed(2)}</span>
                <span className="text-[10px] uppercase font-black tracking-wider text-[#8A7A6C] bg-[#FBF6EC] border border-[#E8D9BC] px-2 py-0.5 rounded-md">
                  Per Unit
                </span>
              </div>
            </div>

            {/* EXPANDED RICH SPECIFICATION TEXT BLOCK */}
            <p className="text-sm text-[#7A6A5C] font-medium leading-relaxed">
              {product.description || "Indulge in our carefully premium batch, crafted meticulously using legacy processes. Perfect texture profile paired with natural enhancements ensures uncompromised breakfast or dessert luxury."}
            </p>

            {/* METADATA TIMESTAMPS OVERVIEW */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 text-xs font-bold text-[#4A2E1F]">
                <Calendar size={16} className="text-[#B4622F]" />
                <span>Baking Operations Time: {formatDate(product.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#4A2E1F]">
                <ShieldAlert size={16} className="text-[#7A2048]" />
                <span>Freshness Guaranteed Untill: {formatDate(product.expiryDate)}</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC METRIC SELECTION ZONE */}
          <div className="space-y-4 pt-4 border-t border-[#F3E8D3]/70">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-black tracking-wider text-[#8A7A6C]">Select Quantity</span>

              <div className="flex items-center bg-[#FBF6EC] border border-[#E8D9BC] rounded-xl overflow-hidden p-1">
                <button
                  onClick={handleDecrement}
                  className="p-2 text-[#7A6A5C] hover:text-[#7A2048] hover:bg-white rounded-lg transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-black text-sm text-[#2B1B14]">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="p-2 text-[#7A6A5C] hover:text-[#7A2048] hover:bg-white rounded-lg transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* TOTAL PRICE */}
            <div className="flex items-center justify-between bg-[#FBF6EC]/60 p-4 border border-[#E8D9BC]/60 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black tracking-wider text-[#8A7A6C]">Total Statement</span>
                <span className="text-2xl font-black text-[#2B1B14]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* TWO ACTION BUTTONS: ADD TO CART + ORDER NOW */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart || isOrdering}
                className={`h-12 px-4 rounded-xl font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-md border disabled:opacity-60 disabled:cursor-not-allowed ${
                  isAdded
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/10'
                    : 'bg-white text-[#7A2048] border-[#E8D9BC] hover:border-[#7A2048] shadow-[#2B1B14]/5'
                }`}
              >
                {isAddingToCart ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : isAdded ? (
                  <>
                    <CheckCircle2 size={16} />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleOrderNow}
                disabled={isOrdering || isAddingToCart}
                className="h-12 px-4 rounded-xl font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-md bg-gradient-to-r from-[#7A2048] to-[#93294F] text-[#F3E8D3] shadow-[#7A2048]/10 hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isOrdering ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Zap size={16} />
                    Order Now
                  </>
                )}
              </motion.button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}