import Footer from '@/components/shared/Footer';
import RealFoodsNavbar from '@/components/shared/Navbar';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-wrapper w-full">
        <RealFoodsNavbar/>
      <main className='mt-15'>
        {children}
      </main>
      <Footer/>
    </div>
  );
}