import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const MainLayout = () => {
  return (
    // 'flex-col' aur 'min-h-screen' footer ko hamesha bottom par rakhte hain
    <div className="flex flex-col min-h-screen bg-[#F0F4FF] text-[#0F172A] font-sans">
      
      {/* 1. TOP NAVBAR: Ye har page par nazar aaye ga */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA: Jahan Home, About, ya Contact load honge */}
      <main className="flex-grow">
        {/* 'Outlet' wo placeholder hai jahan nested routes ka content fit hota hai */}
        <Outlet /> 
      </main>

      {/* 3. FOOTER: Ye hamesha screen ke aakhir mein rahe ga */}
      <Footer />
      
    </div>
  );
};

export default MainLayout;