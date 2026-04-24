import React, { useState, useEffect } from 'react';
import { getAllLoads } from '../../services/api'; // Aapki di hui API
import { HiOutlineClock, HiOutlineTruck, HiOutlineCheckBadge } from 'react-icons/hi2';

const ActiveLoads = () => {
    const [loads, setLoads] = useState([]);
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'picked-up' | 'delivered'
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

    // Stats Calculation for Right Side
    const stats = {
        pendingCount: loads.filter(l => l.status === 'pending' || l.status === 'assigned').length,
        acceptCount: loads.filter(l => l.status === 'picked-up').length
    };

    // Tab Filtering Logic
    const filteredLoads = loads.filter(load => {
        if (activeTab === 'pending') return load.status === 'pending' || load.status === 'assigned';
        return load.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-white p-6 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER & NAVIGATION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
                    
                    {/* 1. Title */}
                    <div className="flex-shrink-0">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-[#001529]">
                            Fleet <span className="text-brand-primary">Monitor</span>
                        </h1>
                    </div>

                    {/* 2. CENTER TABS (The Navigation) */}
                    <div className="flex bg-[#F1F5F9] p-1.5 rounded-full border border-gray-100 shadow-inner">
                        {[
                            { id: 'pending', label: 'Pending', icon: <HiOutlineClock /> },
                            { id: 'picked-up', label: 'Accepted/Live', icon: <HiOutlineTruck /> },
                            { id: 'delivered', label: 'Completed', icon: <HiOutlineCheckBadge /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-10 py-3 rounded-full text-[10px] font-black uppercase italic transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-[#001529] text-white shadow-lg scale-105' 
                                    : 'text-gray-400 hover:text-[#001529]'
                                }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* 3. RIGHT STATS (Number Counters) */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Awaiting</span>
                            <span className="text-xl font-black text-orange-500">{stats.pendingCount}</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-100"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Live/Accepted</span>
                            <span className="text-xl font-black text-green-500">{stats.acceptCount}</span>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}
                {loading ? (
                    <div className="text-center py-24 font-black text-gray-200 uppercase tracking-[0.5em] italic animate-pulse text-2xl">
                        Updating Fleet Live...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredLoads.length > 0 ? (
                            filteredLoads.map((load) => (
                                <div key={load._id} 
                                    className={`relative bg-white rounded-[3rem] p-10 border-2 transition-all duration-500 ${
                                        load.status === 'picked-up' 
                                        ? 'border-green-500 shadow-2xl shadow-green-100 bg-green-50/20 scale-[1.02]' 
                                        : 'border-gray-50 shadow-sm hover:shadow-md'
                                    }`}
                                >
                                    {/* Pulse Indicator */}
                                    <div className="absolute top-8 right-10 flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${load.status === 'picked-up' ? 'bg-green-500 animate-ping' : 'bg-gray-200'}`}></span>
                                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter italic">#{load._id.slice(-6)}</span>
                                    </div>

                                    <h3 className="text-xl font-black text-[#001529] uppercase italic mb-8 leading-tight pr-10">{load.title}</h3>
                                    
                                    <div className="space-y-6 relative mb-10">
                                        {/* Minimal Dots for Location */}
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-[#001529]"></div>
                                            <div>
                                                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Pickup</p>
                                                <p className="text-xs font-bold text-[#001529] uppercase">{load.pickupLocation}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 h-2 w-2 rounded-full bg-brand-primary"></div>
                                            <div>
                                                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</p>
                                                <p className="text-xs font-bold text-[#001529] uppercase">{load.dropLocation}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 flex justify-between items-end">
                                        <div>
                                            <p className="text-[7px] font-black text-gray-400 uppercase mb-1">Assigned Driver</p>
                                            <p className="text-[11px] font-black text-brand-primary uppercase italic">
                                                {load.assignedTo?.fullName || 'Awaiting Selection'}
                                            </p>
                                        </div>
                                        <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase italic ${
                                            load.status === 'picked-up' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {load.status === 'picked-up' ? 'In Progress' : 'Pending'}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center bg-[#F8FAFC] rounded-[4rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-300 font-black italic uppercase tracking-widest text-sm">No assignments found in {activeTab}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveLoads;