import DashboardSidebar from '@/components/dashboard/DashboardSideber';
import UserHomePage from '@/components/dashboard/UserDashboardHomePage';
import { getSessionServerData } from '@/lib/core/session/session-server';
import React from 'react';

export default async function UserPage() {
  const user = await getSessionServerData();
  
  return (
    <div className="min-h-screen w-full flex bg-[#FBF6EC]/40 dark:bg-[#5e4a42] text-[#745143] dark:text-[#F3E8D3]">
      <DashboardSidebar user={user} />
      
      <main className="flex-1 w-full min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6 w-full">
          <UserHomePage />
        </div>
      </main>
    </div>
  );
}