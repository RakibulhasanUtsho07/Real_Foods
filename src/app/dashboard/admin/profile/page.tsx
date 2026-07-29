import AdminStatGrid from '@/components/admin/AdminStatCard';
import SystemControlCard from '@/components/admin/SystemControlCard';
import { getSessionServerData } from '@/lib/core/session/session-server';

import { redirect } from 'next/navigation';
import React from 'react';


export default async function AdminProfilePage() {
    const user = await getSessionServerData()
      if (!user) {
        redirect("/login"); // ⚠️ point this to your real login route
      }
    
      if ((user as any).role !== "admin") {
        redirect("/");
      }
  const mockAdminStats = {
    totalRevenue: 5420.00,
    activeUsers: 342,
    pendingOrders: 8,
    serverStatus: "Optimal"
  };

  return (
    <div className="min-h-screen bg-[#FBF6EC]/40 p-4 sm:p-6 lg:p-8 space-y-8 mt-12 lg:mt-0">
      <div>
        <h1 className="text-3xl font-black text-[#2B1B14] tracking-tight">Admin Terminal</h1>
        <p className="text-sm text-[#7A6A5C] font-semibold mt-0.5">System metrics, real-time metrics controls, and store parameters.</p>
      </div>

      <AdminStatGrid stats={mockAdminStats} />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SystemControlCard />
      </div>
    </div>
  );
}