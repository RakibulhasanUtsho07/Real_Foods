import AdminHomePage from '@/components/dashboard/AdminDashboardHomePage';
import DashboardSidebar from '@/components/dashboard/DashboardSideber';
import React from 'react';

export default function AdminPage() {
  return (
    <div className="min-h-screen w-full flex bg-[#FBF6EC]/40 dark:bg-[#5e4a42] text-[#745143] dark:text-[#F3E8D3]">
      
      {/* বাম পাশে থাকবে ড্যাশবোর্ড সাইডবার */}
      <DashboardSidebar />
      
      {/* ডান পাশে মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 w-full min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6 w-full">
          <AdminHomePage />
        </div>
      </main>

    </div>
  );
}