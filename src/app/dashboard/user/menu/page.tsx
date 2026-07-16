import OurMenuClient from '@/components/user/OurMenuClient';
import { getSessionData } from '@/lib/core/session/session-client';
import { redirect } from 'next/navigation';
import React from 'react';


export interface BakeryItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: 'Oven Fresh' | 'Signature Sweet' | 'Artisan Bread' | 'Celebration Cakes';
  rating: number;
  description: string;
}

export default async function OurMenuPage() {
  // 💡 পরবর্তীতে আপনার backend/action.js থেকে প্রোডাক্ট ডেটা সরাসরি এখানে ফেচ করতে পারেন:
  // const products = await getAllProductsAction();
const user = await getSessionData()
  if (!user) {
    redirect("/login"); // ⚠️ point this to your real login route
  }

  if (user.role !== "user") {
    redirect("/");
  }
  // আপনার রিয়েল ডাটাবেস স্কিমার সাথে সামঞ্জস্যপূর্ণ মক ডেটা:
  const mockMenuData: BakeryItem[] = [
    {
      _id: "prod-01",
      name: "Artisanal Glazed Berry Danish",
      price: 8.50,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
      category: "Oven Fresh",
      rating: 4.9,
      description: "Flaky, buttery pastry crust filled with fresh organic winter berries and signature vanilla glaze."
    },
    {
      _id: "prod-02",
      name: "Premium Choco Velvet Donut Set",
      price: 12.00,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600",
      category: "Signature Sweet",
      rating: 4.8,
      description: "Dipped in rich 70% dark Belgian chocolate ganache, topped with gold leaf crumbs."
    },
    {
      _id: "prod-03",
      name: "Flaky Almond Croissant Box",
      price: 14.20,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600",
      category: "Oven Fresh",
      rating: 5.0,
      description: "Traditional French laminated dough filled with sweet frangipane cream and sliced almonds."
    },
    {
      _id: "prod-04",
      name: "Rustic Sourdough Boule",
      price: 9.00,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600",
      category: "Artisan Bread",
      rating: 4.7,
      description: "Naturally leavened for 48 hours, yielding a thick blistered crust and a soft, tangy open crumb."
    },
    {
      _id: "prod-05",
      name: "Strawberry Chantilly Naked Cake",
      price: 34.00,
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600",
      category: "Celebration Cakes",
      rating: 4.9,
      description: "Fluffy vanilla sponge layered with fresh strawberries and cloud-like Chantilly cream."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      {/* HEADER MATRIX */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#B4622F] bg-[#FBF6EC] px-3 py-1 rounded-full border border-[#E8D9BC] inline-block">
          The Real Foods Vault
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2B1B14] tracking-tight">
          Our Baking Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6A5C] font-semibold">
          Filter through our live oven batches. Handcrafted with organic flour, patience, and zero shortcuts.
        </p>
      </div>

      {/* INTERACTIVE CLIENT CONTAINER */}
      <OurMenuClient items={mockMenuData} />
    </div>
  );
}
