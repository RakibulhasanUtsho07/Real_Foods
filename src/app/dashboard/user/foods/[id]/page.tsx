import React from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

import { BakeryProduct } from '../page';
import ProductDetailsClient from '@/components/dashboard/ProductDetailsSection';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Dynamic Server Fetch targeting your Express MongoDB wrapper
async function getProductById(id: string): Promise<BakeryProduct | null> {
  try {
    const res = await fetch(`${API_URL}/api/admin/foods`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return null;

    const product = json.data.find((item: BakeryProduct) => item._id === id);
    return product || null;
  } catch (error) {
    console.error('Error fetching dynamic bakery asset:', error);
    return null;
  }
}

// Reads the auth token from cookies and resolves the logged-in user, if any
async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.user) return null;

    return {
      id: json.user._id,
      name: json.user.name,
      email: json.user.email,
    };
  } catch (error) {
    console.error('Error resolving current user:', error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch product and user in parallel — independent requests, no need to wait sequentially
  const [product, user] = await Promise.all([
    getProductById(id),
    getCurrentUser(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 mt-12 lg:mt-0 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <ProductDetailsClient product={product} user={user} />
      </div>
    </div>
  );
}