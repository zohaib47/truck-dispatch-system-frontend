import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { 
  FiGrid, FiTruck, FiBox, FiUsers, FiLogOut, FiX, 
  FiFilePlus, FiMail, FiPlusCircle 
} from "react-icons/fi";
import { toast, Toaster } from 'react-hot-toast';
import brand from '../../config/brand'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  
  const menuItems = [
    { name: 'Overview', path: '/admin', icon: <FiGrid size={20} />, color: 'text-blue-500' },
    { name: 'Create Load', path: '/admin/create-load', icon: <FiPlusCircle size={20} />, color: 'text-purple-500' },
    { name: 'Active Load', path: '/admin/active-load', icon: <FiTruck size={20} />, color: 'text-amber-500' },
    { name: 'Assign Load', path: '/admin/assign-load', icon: <FiFilePlus size={20} />, color: 'text-emerald-500' },
    { name: 'Inventory', path: '/admin/inventory', icon: <FiBox size={20} />, color: 'text-rose-500' },
    { name: 'Drivers', path: '/admin/drivers', icon: <FiUsers size={20} />, color: 'text-emerald-500' },
    { name: 'Contact Message', path: '/admin/messages', icon: <FiMail size={20} />, color: 'text-emerald-500' },
  ];

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  toast.success("Logged out successfully!");

  navigate('/');
};

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-app-header text-text-muted transform transition-all duration-300 ease-in-out border-r border-border-main
        h-screen flex flex-col flex-shrink-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:sticky md:top-0
      `}>
        
        <div className="p-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 group">
            <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20 shadow-lg shadow-brand-primary/5 transition-transform group-hover:scale-105">
              <FiTruck className="text-brand-primary" size={24} />
            </div>
            <span className="text-xl font-black text-text-main tracking-tighter italic uppercase">
  {brand.name.replace(brand.highlight,"")}
  <span className="text-brand-primary">
    {brand.highlight}
  </span>
</span>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 mt-4 space-y-2 overflow-y-auto no-scrollbar">
          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted/50 mb-4">
            Main Menu
          </p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'} 
              onClick={() => {
                if(window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={({ isActive }) => `
                w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-[13px] transition-all duration-300 cursor-pointer group
                ${isActive 
                  ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-[1.02]' 
                  : 'hover:bg-brand-primary/5 text-text-muted hover:text-brand-primary'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-all duration-300 ${isActive ? `scale-110 text-white` : `group-hover:scale-110 ${item.color} opacity-80 group-hover:opacity-100`}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-wide uppercase text-[11px] font-black">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-border-main/50 flex-shrink-0">
          <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all cursor-pointer group">
            <FiLogOut size={18} className="group-hover:-translate-x-1 transition-transform"/>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;