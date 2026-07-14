import FoodCatalogClient from "@/components/dashboard/UsersAllFoodsPage";
import { allFoods } from "@/lib/api/data/data";


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
  const products = await allFoods();
 

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">
          Oven-Hot Catalog
        </h1>
        <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">
          Explore Real Foods signature bitecrafted assets and freshly baked delicacies.
        </p>
      </div>

      {/* Passing data down to the client container for search and filtering */}
      <FoodCatalogClient initialProducts={products?.data} />
    </div>
  );
}
