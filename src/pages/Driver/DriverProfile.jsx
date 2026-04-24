import React, { useState, useEffect } from 'react';
import { HiOutlineUser, HiOutlineTruck, HiOutlinePhone, HiOutlineMail, HiOutlineLogout, HiOutlineShieldCheck } from 'react-icons/hi';
import brand from '../../config/brand';

const DriverProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    if (!user) return <div className="p-20 text-center font-black italic uppercase">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-app-bg p-4 md:p-8 animate-fade-in">
            <div className="max-w-3xl mx-auto">
                
                {/* Profile Header Card */}
                <div className="bg-brand-navy rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-8">
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                        {/* Big Avatar */}
                        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-brand-primary flex items-center justify-center text-brand-navy text-4xl md:text-6xl font-black border-4 border-white/20 shadow-xl">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
                                {user.name}
                            </h2>
                            <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                                Verified Traxio Driver
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="bg-white/10 px-4 py-1 rounded-full text-[9px] font-bold uppercase backdrop-blur-md">
                                    ID: {user.id?.slice(-6)}
                                </span>
                                <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-[9px] font-bold uppercase flex items-center gap-1">
                                    <HiOutlineShieldCheck /> Active Status
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Background Design */}
                    <div className="absolute -right-10 -bottom-10 text-white/5 text-[15rem] font-black italic select-none">
                        TRX
                    </div>
                </div>

                {/* Details Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Contact Info */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-border-main shadow-sm">
                        <h3 className="text-xs font-black text-brand-navy uppercase italic mb-6 border-b border-app-bg pb-2">
                            Contact Information
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-app-bg flex items-center justify-center text-brand-navy">
                                    <HiOutlineMail size={20} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-text-muted uppercase">Email Address</p>
                                    <p className="text-sm font-bold text-text-main">{user.email || brand.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-app-bg flex items-center justify-center text-brand-navy">
                                    <HiOutlinePhone size={20} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-text-muted uppercase">Phone Number</p>
                                    <p className="text-sm font-bold text-text-main">{user.phone || brand.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-border-main shadow-sm">
                        <h3 className="text-xs font-black text-brand-navy uppercase italic mb-6 border-b border-app-bg pb-2">
                            Assigned Vehicle
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                    <HiOutlineTruck size={20} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-text-muted uppercase">Truck Number</p>
                                    <p className="text-sm font-bold text-text-main uppercase">TK-9922 (Pro-Max)</p>
                                </div>
                            </div>
                            <button className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-border-main text-[10px] font-black text-text-muted uppercase hover:border-brand-primary hover:text-brand-primary transition-all">
                                Update Vehicle Docs
                            </button>
                        </div>
                    </div>

                    {/* Account Settings / Logout */}
                    <div className="md:col-span-2 bg-white rounded-[2.5rem] p-6 border border-border-main shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] font-bold text-text-muted italic text-center md:text-left uppercase">
                            To update your personal information or change your password, <br /> 
                            please contact the <span className="text-brand-navy font-black">Traxio Admin Office</span>.
                        </p>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 px-8 py-4 rounded-2xl font-black text-xs uppercase italic flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                            <HiOutlineLogout size={18} /> Exit System
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DriverProfile;