import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar'; // Check your path
import Header from '../Admin/Header';   // Check your path

const AdminLayout = () => {
  return (
    // Poori screen ka container (Flexbox use kiya hai taake Sidebar aur Content side-by-side hon)
    <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
      
      {/* 1. LEFT SIDEBAR: Ye apni jagah fix rahega */}
      <Sidebar />

      {/* 2. RIGHT SIDE CONTENT AREA: Is mein Navbar aur Pages ayenge */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP NAVBAR: Dashboard ka header */}
        <Header />

        {/* MAIN CONTENT: Jahan Inventory, Messages wagera load honge */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          {/* Outlet hi wo jagah hai jahan saare nested pages nazar ayenge */}
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;