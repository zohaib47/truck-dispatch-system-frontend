import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { driverAPI } from '../../services/api';
import { HiOutlineMapPin, HiOutlineTruck, HiArrowLeft, HiOutlineUser, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { toast, Toaster } from 'react-hot-toast';

const LoadDetails = () => {
    const navigate = useNavigate();
    const [activeLoads, setActiveLoads] = useState([]); // Array for multiple loads
    const [loading, setLoading] = useState(true);

    const fetchActiveLoads = async () => {
        try {
            setLoading(true);
            const res = await driverAPI.getMyLoads();
            
            // --- FILTER LOGIC ---
            // Sirf wo loads rakhein jo 'completed' NAHI hain
            const filtered = res.data.loads.filter(l => 
                l.status === 'pending' || 
                l.status === 'assigned' || 
                l.status === 'picked-up' || 
                l.status === 'on-the-way'
            );
            
            setActiveLoads(filtered);
        } catch (err) { 
            console.error(err);
            toast.error("Failed to sync active tasks");
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchActiveLoads();
    }, []);

    const handleUpdate = async (loadId, newStatus) => {
        const toastId = toast.loading(`Updating status...`);
        try {
            const statusToSend = newStatus === 'delivered' ? 'completed' : newStatus;
            await driverAPI.updateLoadStatus(loadId, statusToSend);
            
            toast.success("Status Updated!", { id: toastId });
            
            // Page refresh kiye bagair data dobara fetch karein
            // Completed wala load khud hi list se nikal jayega filter ki wajah se
            fetchActiveLoads();
            
        } catch (err) { 
            toast.error("Update failed", { id: toastId });
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse">SYNCING ACTIVE LOADS...</div>;

    return (
        <div className="min-h-screen bg-[#F1F5F9] pb-10">
            <Toaster position="top-center" />
            
            <div className="bg-[#001529] text-white p-8 rounded-b-[3.5rem] shadow-2xl">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#FFC107] text-[10px] font-black uppercase italic mb-6">
                    <HiArrowLeft /> Back to Dashboard
                </button>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                    Active <span className="text-[#FFC107]">Assignments</span>
                </h2>
                <p className="text-[10px] text-white/30 uppercase mt-2 font-bold">
                    Showing {activeLoads.length} tasks in progress
                </p>
            </div>

            <div className="max-w-[450px] mx-auto p-4 -mt-8 space-y-6">
                {activeLoads.length === 0 ? (
                    <div className="bg-white p-10 rounded-[2.5rem] text-center shadow-xl">
                        <p className="font-black italic text-gray-300">NO ACTIVE LOADS FOUND</p>
                    </div>
                ) : (
                    activeLoads.map((load) => (
                        <div key={load._id} className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-white">
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                <span className="text-[10px] font-black text-[#001529] uppercase font-mono">ID: {load._id.slice(-6)}</span>
                                <span className="px-3 py-1 rounded-full bg-[#FFC107] text-[#001529] text-[8px] font-black uppercase italic">
                                    {load.status}
                                </span>
                            </div>

                            {/* Route Info */}
                            <div className="p-6 space-y-6">
                                <div className="flex gap-4">
                                    <HiOutlineMapPin className="text-[#001529]" size={20}/>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase">Pickup</p>
                                        <p className="text-xs font-bold text-[#001529] uppercase">{load.pickupLocation}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <HiOutlineMapPin className="text-[#FFC107]" size={20}/>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase">Drop-off</p>
                                        <p className="text-xs font-bold text-[#001529] uppercase">{load.dropLocation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="px-6 pb-6 text-[11px] text-gray-500 italic">
                                <p className="text-[8px] font-black text-gray-300 uppercase not-italic mb-1">Dispatcher Notes:</p>
                                "{load.description || "No notes provided."}"
                            </div>

                            {/* Actions */}
                            <div className="p-4 bg-gray-50">
                                {load.status === 'pending' || load.status === 'assigned' ? (
                                    <button 
                                        onClick={() => handleUpdate(load._id, 'picked-up')}
                                        className="w-full bg-[#001529] text-white py-4 rounded-2xl font-black uppercase italic text-[10px] shadow-lg active:scale-95 transition-all"
                                    >
                                        Confirm Pickup 🚚
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleUpdate(load._id, 'delivered')}
                                        className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase italic text-[10px] shadow-lg active:scale-95 transition-all"
                                    >
                                        Mark as Delivered ✅
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LoadDetails;