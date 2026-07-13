"use client";
import React, { useState } from 'react';
import { Edit3, Calendar, AlertTriangle } from 'lucide-react';
import EditProductModal from './EditProductForm';
// আপনার মডাল কম্পোনেন্টের পাথ দিন

interface FoodItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  creatingDate: string;
  expireDate: string;
  description?: string;
  measurement_value?: string;
}

export default function FoodsTable({ initialFoods }: { initialFoods: FoodItem[] }) {
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [selectedProduct, setSelectedProduct] = useState<FoodItem | null>(null);

  const handleUpdate = (updatedProduct: FoodItem) => {
    // স্টেট আপডেট (রিয়েল-টাইমে টেবিলে ডেটা চেঞ্জ দেখানোর জন্য)
    setFoods(foods.map(item => item._id === updatedProduct._id ? updatedProduct : item));
    setSelectedProduct(null);
    
    // এখানে পরবর্তীতে আপনার ব্যাকএন্ড আপডেট এপিআই কল করতে পারেন
    console.log("Updated Product Data to sync with DB:", updatedProduct);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden mt-20">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-100/50 text-amber-950 font-medium text-sm border-b border-amber-100">
              <th className="p-4">Item Image & Name</th>
              <th className="p-4">Baking / Created Date</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-50 text-amber-900 text-sm">
            {foods.map((food) => (
              <tr key={food._id} className="hover:bg-amber-50/30 transition-colors">
                {/* Image & Name */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={food.image || "/placeholder-bakery.jpg"} 
                      alt={food.name} 
                      className="w-12 h-12 object-cover rounded-xl border border-amber-100 bg-amber-50"
                    />
                    <div>
                      <span className="font-semibold block text-base text-amber-950">{food.name}</span>
                      <span className="text-xs text-amber-600 bg-amber-100/60 px-2 py-0.5 rounded-full font-medium">
                        ${food.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Created Date */}
                <td className="p-4 text-amber-800">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    {food.creatingDate ? new Date(food.creatingDate).toLocaleDateString() : 'N/A'}
                  </div>
                </td>

                {/* Expire Date */}
                <td className="p-4 text-amber-800">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span className="font-medium text-rose-700">
                      {food.expireDate ? new Date(food.expireDate).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </td>

                {/* Edit Details Action */}
                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedProduct(food)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* মডাল ওপেনিং লজিক */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}