import Footer from '@/components/shared/Footer'
import RealFoodsNavbar from '@/components/shared/Navbar'
import React from 'react'

function DashboardLayoutPage({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50/10">
      {/* নেভাবার তার জায়গায় থাকবে */}
      <RealFoodsNavbar />
      
     
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default DashboardLayoutPage
