"use client"
import ProductForm from '@/components/admin/AddProductForm';
import { addProducts } from '@/lib/api/action/action';


import toast, { Toaster } from 'react-hot-toast';

function AddProductsPage() {
 const handleAddProduct = async (productData: any) => {

  await toast.promise(
    (async () => {
      const result = await addProducts(productData);
      
      
      if (!result || !result.success) {
        throw new Error(result?.error || 'Failed to bake the product');
      }
      
      return result;
    })(),
    {
      loading: 'Baking your product... 🧁',
      success: 'Delicious! Product added successfully 🎂',
      error: (err) => `${err.message || 'Something went wrong ❌'}`,
    },
    {
     
      style: {
        background: '#fffbeb', // Light amber background
        color: '#78350f',      // Dark amber text
        border: '1px solid #fde68a',
      },
      success: {
        duration: 4000,
      }
    }
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50/60 py-12 px-4 sm:px-6 lg:px-8">
      {/* react-hot-toast কন্টেইনার */}
      <Toaster />
      
      <div className="max-w-7xl mx-auto">
        <ProductForm onSubmit={handleAddProduct} />
      </div>
    </div>
  );
}

export default AddProductsPage;
