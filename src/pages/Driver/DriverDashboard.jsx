import React, { useState, useEffect } from 'react';
import { driverAPI } from '../../services/api';
import brand from '../../config/brand';
import { HiOutlineTruck } from 'react-icons/hi';
import { toast, Toaster } from 'react-hot-toast';

const DriverDashboard = () => {
    // Initial stats state
    const [stats, setStats] = useState({ 
        completed: 0, 
        active: 0, 
        pending: 0, 
        revenue: 0, 
        distance: "0" 
    });
    
    const [isAvailable, setIsAvailable] = useState(true);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const res = await driverAPI.getMyLoads();
            const loads = res.data.loads || [];

            // --- Calculations from Backend Data ---
            const completedLoads = loads.filter(l => l.status === 'completed');
            const activeLoads = loads.filter(l => l.status === 'picked-up' || l.status === 'on-the-way');
            const pendingLoads = loads.filter(l => l.status === 'pending' || l.status === 'assigned');

            // Total Revenue (Price ka sum)
            const totalRevenue = completedLoads.reduce((sum, load) => sum + (Number(load.price) || 0), 0);
            
            // Total Distance (Agar schema mein distance hai toh uska sum, warna 0)
            const totalDist = loads.reduce((sum, load) => sum + (Number(load.distance) || 0), 0);

            setStats({
                completed: completedLoads.length,
                active: activeLoads.length,
                pending: pendingLoads.length,
                revenue: totalRevenue.toLocaleString(), // 1000 -> 1,000 format
                distance: totalDist.toFixed(0)
            });

        } catch (err) {
            console.error("Dashboard Fetch Error:", err);
            toast.error("Failed to sync dashboard stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.status) {
            setIsAvailable(user.status === 'Available');
        }
    }, []);

    const toggleStatus = async () => {
        const newStatus = isAvailable ? 'Off Duty' : 'Available'; 
        const toastId = toast.loading("Updating duty status...");

        try {
            const res = await driverAPI.updateStatus(newStatus);
            if (res.data.success) {
                setIsAvailable(!isAvailable);
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    user.status = newStatus;
                    localStorage.setItem('user', JSON.stringify(user));
                }
                toast.success(`Duty Status: ${newStatus}`, { id: toastId });
            }
        } catch (err) {
            toast.error("Failed to update status", { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] flex justify-center py-10 px-4">
            <Toaster position="top-center" />
            
            <div className="w-full max-w-[450px] flex flex-col gap-6">
                
                {/* --- Header Section --- */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-black text-[#001529] italic uppercase tracking-tighter leading-none">
                        {brand.name}<span className="text-[#FFC107]">IO</span>
                    </h1>
                    
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={toggleStatus}
                            className={`group relative flex items-center gap-3 px-6 py-2.5 rounded-full border-2 transition-all duration-300 shadow-sm active:scale-95 ${
                                isAvailable 
                                ? 'bg-white border-green-500 text-green-600' 
                                : 'bg-white border-red-500 text-red-600'
                            }`}
                        >
                            <span className={`h-2.5 w-2.5 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                            <span className="text-[10px] font-black uppercase italic tracking-widest">
                                {isAvailable ? 'On Duty / Available' : 'Off Duty / On Leave'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* --- Stats Cards --- */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Revenue Card */}
                    <div className="col-span-1 bg-[#001529] py-10 px-4 rounded-[4rem] shadow-xl text-center flex flex-col justify-between items-center border-4 border-white">
                        <p className="text-[#FFC107] text-[10px] font-black uppercase italic leading-tight">Total<br/>Earnings</p>
                        <h2 className="text-3xl font-black text-white italic my-4">${stats.revenue}</h2>
                        <p className="text-white/30 text-[8px] font-bold uppercase tracking-tighter italic leading-tight">Lifetime<br/>Payout</p>
                    </div>

                    {/* Completed Card */}
                    <div className="col-span-1 bg-white py-10 px-4 rounded-[4rem] border border-gray-200 shadow-sm text-center flex flex-col justify-between items-center">
                        <p className="text-gray-400 text-[10px] font-black uppercase italic leading-tight">Completed<br/>Trips</p>
                        <h2 className="text-5xl font-black text-[#001529] italic my-4">{stats.completed}</h2>
                        <p className="text-gray-400 text-[8px] font-bold uppercase italic leading-tight">Delivered<br/>Cargo</p>
                    </div>

                    {/* Active/Accepted Card */}
                    <div className="col-span-1 bg-[#FFC107] py-10 px-4 rounded-[4rem] shadow-lg text-center flex flex-col justify-between items-center border-4 border-white">
                        <p className="text-[#001529] text-[10px] font-black uppercase italic leading-tight">In<br/>Progress</p>
                        <h2 className="text-5xl font-black text-[#001529] italic my-4">{stats.active}</h2>
                        <p className="text-[#001529]/50 text-[8px] font-bold uppercase italic leading-tight">Live<br/>Assignments</p>
                    </div>

                    {/* New/Pending Card */}
                    <div className="col-span-1 bg-white py-10 px-4 rounded-[4rem] border border-gray-200 shadow-sm text-center flex flex-col justify-between items-center">
                        <p className="text-gray-400 text-[10px] font-black uppercase italic leading-tight">Pending<br/>Dispatches</p>
                        <h2 className="text-5xl font-black text-[#001529] italic my-4">{stats.pending}</h2>
                        <p className="text-gray-400 text-[8px] font-bold uppercase italic leading-tight">Waiting for<br/>Acceptance</p>
                    </div>
                </div>

                {/* --- Action Section --- */}
                <div className="bg-white border-2 border-gray-100 p-8 rounded-[3rem] shadow-sm flex flex-col items-center gap-6 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-[#FFC107] flex items-center justify-center text-[#001529] shadow-inner">
                        <HiOutlineTruck size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[#001529] uppercase italic tracking-tighter">Fleet Logistics</h3>
                        <p className="text-gray-400 text-[10px] font-bold uppercase leading-tight px-4 mt-2">
                            Manage your accepted loads and complete deliveries to increase your lifetime earnings.
                        </p>
                    </div>
                    <button 
                        onClick={() => window.location.href = '/driver/my-loads'}
                        className="w-full bg-[#001529] text-white py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-[#FFC107] hover:text-[#001529] transition-all shadow-lg active:scale-95"
                    >
                        Go to My Loads 
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DriverDashboard;