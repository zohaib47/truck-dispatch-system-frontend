import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Admin/Header'; // Driver ka Top/Bottom Nav

const DriverLayout = () => {
  return (
    // 'bg-slate-50' driver app ke liye clean look deta hai
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      
      {/* 1. DRIVER HEADER: Jahan Profile ya Status (Online/Offline) hota hai */}
      <Header />

      {/* 2. MAIN CONTENT: Jahan Dashboard, Active Trips, ya Routes nazar ayenge */}
      <main className="flex-grow p-4 pb-24"> 
        {/* pb-24 isliye taake content bottom navigation ke peeche na chupe */}
        <div className="max-w-md mx-auto"> {/* Mobile-focused width */}
          <Outlet />
        </div>
      </main>

      {/* 3. OPTIONAL: Bottom Navigation (Agar aap mobile app style chahte hain) */}
      {/* <DriverBottomNav /> */}

    </div>
  );
};

export default DriverLayout;