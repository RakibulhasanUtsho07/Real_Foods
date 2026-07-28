import FoodCatalogClient from "@/components/dashboard/UsersAllFoodsPage";
import { allFoods } from "@/lib/api/data/data";
import { getSessionData } from '@/lib/core/session/session-client';
import { redirect } from "next/navigation";
import { Sparkles, Package, Layers } from "lucide-react";

// Interface matching your MongoDB document schema
export interface BakeryProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string | Date;
  expiryDate?: string;
  category?: string;
  isEggless?: boolean;
}

// Async server component fetching directly from your Express backend
export default async function UserAllFoodsPage() {
  const [products, user] = await Promise.all([
    allFoods(),
    getSessionData(),
  ]);

  // Guard: only logged-in users with role "user" can access the catalog
  if (!user) {
    redirect("/login"); // ⚠️ point this to your real login route
  }

  if ((user as any).role !== "user") {
    redirect("/");
  }

  const items: BakeryProduct[] = products?.data || [];
  const categoryCount = new Set(items.map((item) => item.category).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#B4622F] bg-[#B4622F]/10 px-3 py-1 rounded-full w-fit">
            <Sparkles size={12} />
            Freshly Updated
          </div>
          <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">
            Oven-Hot Catalog
          </h1>
          <p className="text-sm text-[#7A6A5C] font-semibold">
            Explore Real Foods signature bitecrafted assets and freshly baked delicacies.
          </p>
        </div>

        {/* Quick stats strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E8D9BC] px-4 py-2.5 rounded-xl shadow-sm shadow-[#2B1B14]/5">
            <div className="p-1.5 bg-gradient-to-br from-[#7A2048] to-[#93294F] rounded-lg text-[#F3E8D3]">
              <Package size={14} />
            </div>
            <div>
              <p className="text-sm font-black text-[#2B1B14] leading-none">{items.length}</p>
              <p className="text-[10px] font-bold text-[#8A7A6C] uppercase tracking-wide">Items</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#E8D9BC] px-4 py-2.5 rounded-xl shadow-sm shadow-[#2B1B14]/5">
            <div className="p-1.5 bg-gradient-to-br from-[#B4622F] to-[#D9A441] rounded-lg text-[#F3E8D3]">
              <Layers size={14} />
            </div>
            <div>
              <p className="text-sm font-black text-[#2B1B14] leading-none">{categoryCount}</p>
              <p className="text-[10px] font-bold text-[#8A7A6C] uppercase tracking-wide">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Passing data down to the client container for search and filtering */}
      {items.length > 0 ? (
        <FoodCatalogClient initialProducts={items} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-white border border-dashed border-[#E8D9BC] rounded-3xl py-20 px-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FBF6EC] border border-[#E8D9BC] flex items-center justify-center mb-4">
            <Package size={24} className="text-[#B4622F]" />
          </div>
          <h3 className="text-lg font-black text-[#2B1B14]">Nothing baked yet</h3>
          <p className="text-sm text-[#8A7A6C] font-medium mt-1 max-w-sm">
            Our kitchen team hasn't listed any bakery items right now — check back soon for freshly added treats.
          </p>
        </div>
      )}
    </div>
  );
}