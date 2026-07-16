import React from 'react';
import FeaturedCard from './FeaturedCard';
 // আপনার সঠিক পাথ অনুযায়ী ইমপোর্ট করুন

// মক প্রোডাক্ট ডেটাবেস অ্যারে (আপনার ব্যাকএন্ড ডেটা আসার আগ পর্যন্ত এটি সুন্দর আউটপুট দেবে)
const mockBakeryProducts = [
  {
    _id: "prod-01",
    name: "Artisanal Glazed Berry Danish",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
    category: "Oven Fresh",
    rating: 4.9
  },
  {
    _id: "prod-02",
    name: "Premium Choco Velvet Donut Set",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600",
    category: "Signature Sweet",
    rating: 4.8
  },
  {
    _id: "prod-03",
    name: "Flaky Almond Croissant Box",
    price: 14.20,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600",
    category: "Oven Fresh",
    rating: 5.0
  },
  {
    _id: "prod-04",
    name: "Rustic Sourdough Boule",
    price: 9.00,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600",
    category: "Artisan Bread",
    rating: 4.7
  }
];

export default function FeaturedSection() {
  // 💡 পরবর্তীতে আপনার backend/action.js থেকে ডেটা আনলে এখানে ফেচ করতে পারেন:
  // const products = await getFeaturedProductsAction();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FBF6EC]/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 🎯 SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8D9BC] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#B4622F] bg-[#FBF6EC] px-3 py-1 rounded-full border border-[#E8D9BC]">
              Customer Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2B1B14] tracking-tight">
              From Our Oven To Your Table
            </h2>
            <p className="text-sm text-[#7A6A5C] font-semibold max-w-xl">
              Handcrafted daily with premium organic ingredients. Taste the perfection of authentic European baking traditions.
            </p>
          </div>
          
          {/* View All Button */}
          <button className="shrink-0 px-6 py-3 bg-white border border-[#E8D9BC] text-[#7A2048] hover:bg-[#7A2048] hover:text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-sm transition-all duration-300">
            Explore All Delicacies
          </button>
        </div>

        {/* 🎴 RESPONSIVE PRODUCTS GRID CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {mockBakeryProducts.map((product) => (
            <FeaturedCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}