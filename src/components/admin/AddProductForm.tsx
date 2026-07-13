"use client"
import React, { useState } from 'react';
import { ShoppingBag, FileText, Image, DollarSign, Calendar, Layers } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (data: any) => void;
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [unitType, setUnitType] = useState<'weight' | 'quantity'>('quantity');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-md border border-amber-100 rounded-2xl p-6 md:p-8 shadow-xl space-y-6 max-w-3xl mx-auto">
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold text-amber-900 font-serif">Add New Bakery Magic ✨</h2>
        <p className="text-amber-700/70 text-sm mt-1">Fill in the details to add a fresh item to your shop.</p>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-amber-950 mb-2">Product Name</label>
        <div className="relative">
          <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
          <input required type="text" name="name" placeholder="e.g., Chocolate Truffle Cake" 
            className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900 placeholder:text-amber-700/40" />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-amber-950 mb-2">Description</label>
        <div className="relative">
          <FileText className="absolute left-3 top-4 text-amber-600 w-5 h-5" />
          <textarea required name="description" rows={3} placeholder="Describe the taste, fluffiness, and ingredients..." 
            className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900 placeholder:text-amber-700/40" />
        </div>
      </div>

      {/* Image URL & Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">Image URL</label>
          <div className="relative">
            <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <input required type="url" name="image" placeholder="https://example.com/cake.jpg" 
              className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900 placeholder:text-amber-700/40" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">Price ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <input required type="number" name="price" step="0.01" placeholder="15.99" 
              className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900 placeholder:text-amber-700/40" />
          </div>
        </div>
      </div>

      {/* Dynamically Select Weight or Quantity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-amber-50/30 border border-dashed border-amber-200 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">Measurement Type</label>
          <div className="relative">
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <select 
              value={unitType} 
              onChange={(e) => setUnitType(e.target.value as 'weight' | 'quantity')}
              className="w-full pl-11 pr-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
            >
              <option value="quantity">Pcs / Quantity</option>
              <option value="weight">Weight (Gm / Kg)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">
            {unitType === 'quantity' ? 'Enter Quantity' : 'Enter Weight'}
          </label>
          <input 
            required 
            type="text" 
            name="measurement_value" 
            placeholder={unitType === 'quantity' ? 'e.g., 6 Pcs' : 'e.g., 500 Gm or 1 Kg'} 
            className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 placeholder:text-amber-700/40" 
          />
        </div>
      </div>

      {/* Creating Date & Expire Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">Baking / Creating Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <input required type="date" name="creatingDate" 
              className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-950 mb-2">Expiry Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 w-5 h-5" />
            <input required type="date" name="expireDate" 
              className="w-full pl-11 pr-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-amber-900" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" 
        className="w-full bg-gradient-to-r from-amber-600 to-rose-500 text-white font-medium py-3.5 px-6 rounded-xl hover:opacity-95 shadow-lg shadow-amber-600/20 active:scale-[0.99] transition-all text-center">
        Bake & Post Product 🥐
      </button>
    </form>
  );
}