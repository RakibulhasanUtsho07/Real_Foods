import React from 'react';
import { notFound } from 'next/navigation';

// আপনার প্রোডাকশন টাইপ বাইন্ডিং
import ProductDetailsClient from '@/components/dashboard/ProductDetailsSection';

import { getProductById } from '@/lib/api/action/action';
import { getSessionServerData } from '@/lib/core/session/session-client';

// Next.js 15+ এর জন্য সঠিক অ্যাসিনক্রোনাস params টাইপ ডিক্লারেশন
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  // ১. params প্রমিস-টিকে প্রপারলি রেজলভ (await) করা হলো
  const { id } = await params;

  // ২. প্যারালাল ফেচিং মেকানিজম (Express API & Better-Auth Session)
  const [product, user] = await Promise.all([
    getProductById(id),
    getSessionServerData(),
  ]);

  // ৩. প্রোডাক্ট না পাওয়া গেলে সাথে সাথে Next.js default 404 পেজে রিডাইরেক্ট করবে
  if (!product) {
    notFound();
  }

  // ডেভলপমেন্ট ট্র্যাকিং কনসোল লগ
  console.log("Authenticated User Session:", user);

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 mt-12 lg:mt-0 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* ৪. রেজলভড ডেটা সফলভাবে ক্লায়েন্ট ভিউয়ার কন্টেইনারে পাস করা হলো */}
        <ProductDetailsClient product={product} user={user} />
      </div>
    </div>
  );
}