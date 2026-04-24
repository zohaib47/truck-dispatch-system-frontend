import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiBell, HiUserCircle, HiOutlineLogout, HiHome, HiTruck, HiClipboardList } from 'react-icons/hi';
import brand from '../../config/brand';

const DriverNavbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [driverName, setDriverName] = useState("");
    
    // Dropdown close karne ke liye refs
    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setDriverName(parsedUser.name || "Driver");
            } catch (error) {
                setDriverName("Driver");
            }
        }

        // Outside click detector
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
            if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifications = [
        { id: 1, msg: "New load assigned to your route!", time: "2 mins ago" },
        { id: 2, msg: "Payment processed for #4521", time: "1 hour ago" }
    ];

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    // NavLink Styling Logic
    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase italic transition-all ${
            isActive ? 'bg-brand-primary text-brand-navy shadow-lg shadow-brand-primary/20' : 'hover:bg-white/10 text-white/70'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-brand-navy text-white px-4 py-3 md:px-8 shadow-2xl border-b border-white/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* --- LEFT: Brand & Primary Routes --- */}
                <div className="flex items-center gap-6">
                    <Link to="/driver/driver-dashboard" className="hidden lg:block group">
                        <h1 className="text-xl font-black italic tracking-tighter uppercase leading-none">
                            {brand.name.replace(brand.highlight, "")}
                            <span className="text-brand-primary">{brand.highlight}</span>
                        </h1>
                    </Link>

                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
                        <NavLink title="Home" to="/driver/driver-dashboard" className={navLinkClass}>
                            <HiHome size={14}/> <span className="hidden sm:inline">Home</span>
                        </NavLink>
                        <NavLink title="My Loads" to="/driver/myload" className={navLinkClass}>
                            <HiTruck size={14}/> <span className="hidden sm:inline">My Loads</span>
                        </NavLink>
                        <NavLink title="Active Details" to="/driver/load-details" className={navLinkClass}>
                            <HiClipboardList size={14}/> <span className="hidden sm:inline">Details</span>
                        </NavLink>
                    </div>
                </div>

                {/* --- RIGHT: Actions --- */}
                <div className="flex items-center gap-3">
                    
                    {/* Notification Dropdown */}
                    <div className="relative" ref={notificationRef}>
                        <button 
                            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                            className={`p-2 rounded-full transition-all ${showNotifications ? 'bg-brand-primary text-brand-navy' : 'hover:bg-white/10'}`}
                        >
                            <HiBell size={20} />
                            {notifications.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-brand-navy animate-pulse"></span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border-main overflow-hidden animate-slide-up text-text-main">
                                <div className="bg-app-bg px-4 py-2 border-b flex justify-between items-center">
                                    <span className="text-[10px] font-black text-brand-navy uppercase italic">Recent Alerts</span>
                                    <span className="bg-brand-primary text-brand-navy text-[8px] font-black px-2 py-0.5 rounded-full">NEW</span>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {notifications.map(n => (
                                        <div key={n.id} className="px-4 py-3 border-b hover:bg-app-bg transition-colors cursor-pointer group">
                                            <p className="text-[11px] font-bold leading-tight group-hover:text-brand-navy">{n.msg}</p>
                                            <p className="text-[9px] text-text-muted mt-1 uppercase font-black italic">{n.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                            className="flex items-center gap-2 hover:bg-white/10 p-1 pr-3 rounded-full transition-all border border-white/10"
                        >
                            <div className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center text-brand-navy font-black text-sm shadow-inner">
                                {driverName.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden md:flex flex-col items-start leading-none">
                                <span className="text-[9px] font-black uppercase italic tracking-tighter">{driverName}</span>
                                <span className="text-[7px] text-brand-primary font-bold uppercase mt-0.5">Online</span>
                            </div>
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border-main py-2 animate-slide-up text-text-main">
                                <Link to="/driver/driver-profile" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase hover:bg-app-bg italic transition-colors">
                                    <HiUserCircle size={16} className="text-brand-primary"/> Profile Settings
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase text-red-600 hover:bg-red-50 italic transition-colors border-t"
                                >
                                    <HiOutlineLogout size={16}/> Logout System
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DriverNavbar;