import React, { useState, useEffect } from 'react';
import { getAllLoads } from '../../services/api'; 
import { HiOutlineClock, HiOutlineTruck, HiOutlineCheckBadge } from 'react-icons/hi2';

const ActiveLoads = () => {
    const [loads, setLoads] = useState([]);
    const [activeTab, setActiveTab] = useState('pending'); 
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAllLoads();
            setLoads(res.data);
        } catch (err) {
            console.error("Data fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- REFINED STATS CALCULATION ---
    const stats = {
        pendingCount: loads.filter(l => l.status === 'pending' || l.status === 'assigned').length,
        acceptCount: loads.filter(l => l.status === 'picked-up').length,
        completedCount: loads.filter(l => l.status === 'delivered' || l.status === 'completed').length
    };

    // --- REFINED TAB FILTERING LOGIC ---
    const filteredLoads = loads.filter(load => {
        if (activeTab === 'pending') {
            return load.status === 'pending' || load.status === 'assigned';
        }
        if (activeTab === 'delivered') {
            // Completed tab ke liye delivered aur completed dono status show honge
            return load.status === 'delivered' || load.status === 'completed';
        }
        return load.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-white p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER & NAVIGATION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10 md:mb-16 gap-8">
                    
                    {/* 1. Title */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[#001529]">
                            Fleet <span className="text-brand-primary">Monitor</span>
                        </h1>
                    </div>

                    {/* 2. CENTER TABS (Responsive Scrollable) */}
                    <div className="flex bg-[#F1F5F9] p-1.5 rounded-full border border-gray-100 shadow-inner overflow-x-auto max-w-full no-scrollbar">
                        {[
                            { id: 'pending', label: 'Pending', icon: <HiOutlineClock /> },
                            { id: 'picked-up', label: 'Accepted/Live', icon: <HiOutlineTruck /> },
                            { id: 'delivered', label: 'Completed', icon: <HiOutlineCheckBadge /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 md:px-10 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase italic transition-all whitespace-nowrap ${
                                    activeTab === tab.id 
                                    ? 'bg-[#001529] text-white shadow-lg scale-105' 
                                    : 'text-gray-400 hover:text-[#001529]'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* 3. RIGHT STATS */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest">Awaiting</span>
                            <span className="text-lg md:text-xl font-black text-orange-500">{stats.pendingCount}</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-100"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest">Live</span>
                            <span className="text-lg md:text-xl font-black text-green-500">{stats.acceptCount}</span>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}
                {loading ? (
                    <div className="text-center py-24 font-black text-gray-200 uppercase tracking-[0.5em] italic animate-pulse text-xl md:text-2xl">
                        Updating Fleet Live...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {filteredLoads.length > 0 ? (
                            filteredLoads.map((load) => (
                                <div key={load._id} 
                                    className={`relative bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border-2 transition-all duration-500 ${
                                        load.status === 'picked-up' 
                                        ? 'border-green-500 shadow-2xl shadow-green-100 bg-green-50/20 md:scale-[1.02]' 
                                        : 'border-gray-50 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    {/* Pulse Indicator */}
                                    <div className="absolute top-6 md:top-8 right-8 md:right-10 flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${
                                            load.status === 'picked-up' ? 'bg-green-500 animate-ping' : 
                                            (load.status === 'delivered' || load.status === 'completed') ? 'bg-blue-500' : 'bg-gray-200'
                                        }`}></span>
                                        <span className="text-[7px] md:text-[8px] font-black text-gray-300 uppercase tracking-tighter italic">#{load._id.slice(-6)}</span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-black text-[#001529] uppercase italic mb-6 md:mb-8 leading-tight pr-10">
                                        {load.title}
                                    </h3>
                                    
                                    <div className="space-y-5 md:space-y-6 relative mb-8 md:mb-10">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-[#001529]"></div>
                                            <div>
                                                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                                                <p className="text-[10px] md:text-xs font-bold text-[#001529] uppercase">{load.pickupLocation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-brand-primary"></div>
                                            <div>
                                                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</p>
                                                <p className="text-[10px] md:text-xs font-bold text-[#001529] uppercase">{load.dropLocation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 md:pt-8 border-t border-gray-100 flex justify-between items-end">
                                        <div className="max-w-[60%]">
                                            <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Driver</p>
                                            <p className="text-[10px] md:text-[11px] font-black text-brand-primary uppercase italic truncate">
                                                {load.assignedTo?.fullName || 'Awaiting Selection'}
                                            </p>
                                        </div>
                                        <div className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase italic ${
                                            (load.status === 'delivered' || load.status === 'completed') ? 'bg-[#001529] text-white' :
                                            load.status === 'picked-up' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {load.status === 'delivered' || load.status === 'completed' ? 'Completed' : 
                                             load.status === 'picked-up' ? 'Live' : 'Pending'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 md:py-32 text-center bg-[#F8FAFC] rounded-[3rem] md:rounded-[4rem] border-2 border-dashed border-gray-200 mx-4">
                                <p className="text-gray-300 font-black italic uppercase tracking-widest text-xs md:text-sm px-4">
                                    No assignments found in {activeTab}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Hiding scrollbar for Tabs on mobile */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default ActiveLoads;