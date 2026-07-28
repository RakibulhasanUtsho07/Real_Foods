

import FoodsTable from "@/components/admin/FoodsTable";
import { allFoods } from "@/lib/api/data/data";
import { getSessionData } from "@/lib/core/session/session-client";

import { redirect } from "next/navigation";

async function AllFoodsPage() {
  const user = await getSessionData()
    if (!user) {
      redirect("/login"); // ⚠️ point this to your real login route
    }
  
    if ((user as any).role !== "admin") {
      redirect("/");
    }
  // সার্ভার অ্যাকশন থেকে ডেটা ফেচ করা
  const response = await allFoods();
  console.log(response, "response")
  const foods = response.success ? response.data : [];
  console.log(foods, "foods")

  return (
    <div className="container mx-auto p-6 min-h-screen bg-amber-50/20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-amber-900 font-serif">Bakery Inventory 🥐</h1>
        <p className="text-amber-700/70 text-sm">Manage your bakery items, pricing, and expiration dates.</p>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100 shadow-sm">
          <p className="text-amber-800 font-medium">No food items found in inventory.</p>
        </div>
      ) : (
        // টেবিল কম্পোনেন্টে ডেটা পাস করা
        <FoodsTable initialFoods={foods} />
      )}
    </div>
  );
}

export default AllFoodsPage;
