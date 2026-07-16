import MyOrdersClient from '@/components/dashboard/MyOrderClient';
import { getSessionData } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';


// Layout Schema Matching the Express Backend Payload Array Response
export interface OrderedProduct {
  _id: string;
  product: {
    productId: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    total: number;
  };
  user: {
    userId: string | null;
    name: string | null;
    email: string | null;
  };
  status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export default async function MyOrdersPage() {
  const user = await getSessionData()
    if (!user) {
      redirect("/login"); // ⚠️ point this to your real login route
    }
  
    if (user.role !== "user") {
      redirect("/");
    }
    // 
  // 💡 Call your custom action.js fetch method here to pull active client database targets
  // Example: const orders = await getCustomerOrdersAction();
  
  // Mock fallback array matching exactly your real backend schema for seamless compilation:
  const mockOrders: OrderedProduct[] = [
    {
      _id: "ORD-99812",
      product: {
        productId: "p1",
        name: "Premium Choco Glazed Donut Set",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600",
        price: 12.00,
        quantity: 2,
        total: 24.00
      },
      user: { userId: "u1", name: "Rakib", email: "rakib@example.com" },
      status: "Baking",
      createdAt: new Date().toISOString()
    },
    {
      _id: "ORD-98415",
      product: {
        productId: "p2",
        name: "Artisanal Sourdough & Croissant Box",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
        price: 18.50,
        quantity: 1,
        total: 18.50
      },
      user: { userId: "u1", name: "Rakib", email: "rakib@example.com" },
      status: "Delivered",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">
          Your Baking Timeline
        </h1>
        <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">
          Monitor your active signature selections from the Real Foods oven directly to your doorstep.
        </p>
      </div>

      {/* Interactive Client View Wrapper Container */}
      <MyOrdersClient orders={mockOrders} />
    </div>
  );
}