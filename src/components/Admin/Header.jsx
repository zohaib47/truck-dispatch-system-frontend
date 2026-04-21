import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiBell, FiSearch, FiMenu, FiChevronDown } from "react-icons/fi";

const Header = ({ activeTab, setIsSidebarOpen }) => {
  const navigate = useNavigate();

  // 1. LocalStorage se login user ka data nikalna
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'Guest', role: 'User' };

  // Naam ke initials nikalne ke liye (e.g., "Qasim Ali" -> "QA")
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="h-20 bg-app-card border-b border-border-main flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
      
      {/* Left Side: Mobile Menu & Page Title */}
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2.5 bg-app-bg rounded-xl text-text-muted cursor-pointer active:scale-90 transition-all border border-border-main"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu size={20} />
        </button>
        <div>
           <h2 className="text-xl font-black text-text-main hidden sm:block tracking-tight uppercase italic">
             {activeTab}
           </h2>
           <p className="text-[9px] text-brand-primary font-black uppercase tracking-[0.2em] md:hidden">
             FleetPro System
           </p>
        </div>
      </div>

      {/* Right Side: Search, Notifications & Profile */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-app-bg border border-border-main px-4 py-2.5 rounded-2xl w-64 focus-within:border-brand-primary/40 transition-all group shadow-inner">
          <FiSearch className="text-text-muted group-focus-within:text-brand-primary" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-transparent border-none outline-none ml-2 text-sm w-full font-bold text-text-main placeholder:text-text-muted/50" 
          />
        </div>

        {/* Notification Bell */}
        <div className="border-l border-border-main pl-3 md:pl-6 flex items-center gap-3">
           <button className="p-2.5 bg-app-bg text-text-muted rounded-xl border border-border-main hover:text-brand-primary relative cursor-pointer transition-all">
             <FiBell size={20} />
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-app-card animate-pulse"></span>
           </button>
        </div>

        {/* --- Profile Section (Ab Link ban gaya hai) --- */}
        <Link 
          to="/admin/profile" 
          className="flex items-center gap-4 border-l border-border-main pl-4 md:pl-6 group cursor-pointer no-underline"
        >
          <div className="text-right hidden sm:block">
            {/* Login hue user ka asli naam */}
            <p className="text-sm font-black text-text-main leading-none uppercase tracking-tighter">
              {userData.name}
            </p>
            {/* User ka role (Admin/Driver/User) */}
            <p className="text-[10px] text-brand-primary font-black mt-1 uppercase tracking-widest">
              {userData.role === 'admin' ? 'System Admin' : userData.role}
            </p>
          </div>

          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-brand-primary/20 border-2 border-app-card group-hover:rotate-3 transition-transform">
              {getInitials(userData.name)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-app-card shadow-sm"></span>
          </div>
          
          <FiChevronDown className="text-text-muted hidden md:block group-hover:text-brand-primary transition-colors" size={16} />
        </Link>
      </div>
    </header>
  );
};

export default Header;