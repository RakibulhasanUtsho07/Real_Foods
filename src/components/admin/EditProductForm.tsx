"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, FileText, Image, DollarSign, Calendar, Layers, Loader2, Croissant } from 'lucide-react';
import { editProducts } from '@/lib/api/action/action'; // ⚠️ adjust to your real export name

interface EditProductModalProps {
  product: any;
  productId: string;
}

function toDateInputValue(value?: string) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

export default function EditProductModal({ product, productId }: EditProductModalProps) {
  const router = useRouter();
  const [unitType, setUnitType] = useState<'weight' | 'quantity'>('quantity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product?.measurement_value?.toLowerCase().includes('gm') || product?.measurement_value?.toLowerCase().includes('kg')) {
      setUnitType('weight');
    } else {
      setUnitType('quantity');
    }
  }, [product]);

  const handleClose = () => router.back();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedData = Object.fromEntries(formData.entries());
      await editProducts(productId, { ...product, ...updatedData });
      router.refresh();
      router.push('/foods'); // ⚠️ point this to your real listing route
    } catch (err: any) {
      console.error('Failed to update product:', err);
      setError(err?.message || 'Something went wrong while updating.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-amber-950/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl shadow-amber-950/30 overflow-hidden flex flex-col ring-1 ring-amber-100">

        {/* Decorative top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shrink-0" />

        {/* Sticky header */}
        <div className="shrink-0 flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-5 border-b border-amber-100 bg-gradient-to-b from-amber-50/60 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
              <Croissant className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-amber-950 font-serif leading-tight">
                Modify Bakery Item
              </h2>
              <p className="text-amber-700/70 text-sm mt-0.5 truncate max-w-[280px] md:max-w-none">
                Editing "{product?.name || 'Product'}"
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 text-amber-900/50 hover:text-amber-900 hover:bg-amber-100 p-2 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <form id="edit-product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-6">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Section: Basics */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600/80">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-amber-950 mb-1.5">Product Name</label>
              <div className="relative">
                <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input required type="text" name="name" defaultValue={product?.name}
                  className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-950 mb-1.5">Description</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-amber-500 w-5 h-5" />
                <textarea required name="description" rows={3} defaultValue={product?.description}
                  className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 resize-none transition-shadow" />
              </div>
            </div>
          </section>

          {/* Section: Pricing & Media */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600/80">Pricing &amp; Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">Image URL</label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <input required type="url" name="image" defaultValue={product?.image}
                    className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <input required type="number" name="price" step="0.01" defaultValue={product?.price}
                    className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Measurement (highlighted card) */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600/80 mb-3">Measurement</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gradient-to-br from-amber-50 to-rose-50/50 border border-amber-200/80 rounded-2xl">
              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">Measurement Type</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value as 'weight' | 'quantity')}
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow appearance-none"
                  >
                    <option value="quantity">Pcs / Quantity</option>
                    <option value="weight">Weight (Gm / Kg)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">
                  {unitType === 'quantity' ? 'Enter Quantity' : 'Enter Weight'}
                </label>
                <input required type="text" name="measurement_value" defaultValue={product?.measurement_value}
                  className="w-full px-4 py-2.5 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
              </div>
            </div>
          </section>

          {/* Section: Dates */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600/80">Freshness Window</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">Baking Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <input required type="date" name="creatingDate" defaultValue={toDateInputValue(product?.creatingDate)}
                    className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-950 mb-1.5">Expiry Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <input required type="date" name="expireDate" defaultValue={toDateInputValue(product?.expireDate)}
                    className="w-full pl-11 pr-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 transition-shadow" />
                </div>
              </div>
            </div>
          </section>
        </form>

        {/* Sticky footer */}
        <div className="shrink-0 flex gap-3 px-6 md:px-8 py-5 border-t border-amber-100 bg-white">
          <button type="button" onClick={handleClose} disabled={isSubmitting}
            className="w-1/2 border border-amber-200 text-amber-900 font-medium py-3 rounded-xl hover:bg-amber-50 transition-all text-center disabled:opacity-50">
            Cancel
          </button>
          <button type="submit" form="edit-product-form" disabled={isSubmitting}
            className="w-1/2 bg-gradient-to-r from-amber-600 to-rose-500 text-white font-medium py-3 rounded-xl hover:opacity-95 shadow-lg shadow-amber-600/20 transition-all text-center disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>) : 'Save Updates 🥐'}
          </button>
        </div>
      </div>
    </div>
  );
}