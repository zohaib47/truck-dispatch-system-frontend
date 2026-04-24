import React, { useState, useEffect } from "react";
import { driverAPI } from "../../services/api";
import {
  HiOutlineCube,
  HiCheckCircle,
  HiArrowRight,
  HiMapPin,
  HiClock,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyLoads = () => {
  const [loads, setLoads] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchLoads = async () => {
    setLoading(true);
    try {
      const res = await driverAPI.getMyLoads();
      if (res.data && res.data.loads) {
        setLoads(res.data.loads);
      } else {
        setLoads([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Fleet sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  // --- Logic for Filtering and Pagination ---
  const filteredLoads = loads.filter((l) => {
    if (activeTab === "pending") return l.status === "pending" || l.status === "assigned";
    if (activeTab === "active") return l.status === "picked-up" || l.status === "on-the-way";
    
    // History specific filtering with Date
    if (activeTab === "history") {
      const isCompleted = l.status === "completed";
      const matchesDate = selectedDate ? l.updatedAt?.startsWith(selectedDate) : true;
      return isCompleted && matchesDate;
    }
    return false;
  });

  const totalCompletedCount = loads.filter(l => l.status === "completed").length;

  // Pagination for History Table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activeTab === "history" 
    ? filteredLoads.slice(indexOfFirstItem, indexOfLastItem) 
    : filteredLoads;

  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage);

  const handleAcceptLoad = async (e, loadId) => {
    e.stopPropagation();
    const toastId = toast.loading("Picking up...");
    try {
      await driverAPI.updateLoadStatus(loadId, "picked-up");
      toast.success("Shipment Picked Up!", { id: toastId });
      fetchLoads();
    } catch (err) {
      toast.error("Failed to accept", { id: toastId });
    }
  };

  const handleCompleteLoad = async (e, loadId) => {
    e.stopPropagation();
    const toastId = toast.loading("Finalizing delivery...");
    try {
      await driverAPI.updateLoadStatus(loadId, "completed");
      toast.success("Shipment Delivered!", { id: toastId, icon: "✅" });
      fetchLoads();
    } catch (err) {
      toast.error("Process failed!", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex justify-center py-6 px-4 font-sans">
      <div className="w-full max-w-[450px] flex flex-col">
        
        {/* --- Header --- */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-black text-[#001529] uppercase italic tracking-tighter">
            Fleet <span className="text-[#FFC107]">Shipments</span>
          </h2>
        </div>

        {/* --- Tab Switcher --- */}
        <div className="flex bg-white p-1.5 rounded-[2rem] border border-gray-200 shadow-sm mb-6">
          {["pending", "active", "history"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`flex-1 py-3 rounded-[1.8rem] text-[9px] font-black uppercase italic transition-all ${
                activeTab === tab ? "bg-[#001529] text-white shadow-lg" : "text-gray-400"
              }`}
            >
              {tab === "pending" ? "New" : tab === "active" ? "Live" : "Done"}
            </button>
          ))}
        </div>

        {/* --- History Filter Bar (Only in History Tab) --- */}
        {activeTab === "history" && (
          <div className="bg-[#001529] p-5 rounded-[2rem] mb-6 flex justify-between items-center text-white shadow-xl">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-[#FFC107] uppercase mb-1">Filter Date</span>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-xs font-bold outline-none cursor-pointer invert"
              />
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black opacity-60 uppercase">Lifetime Done</p>
              <p className="text-2xl font-black italic text-[#FFC107] leading-none">{totalCompletedCount}</p>
            </div>
          </div>
        )}

        {/* --- Content Area --- */}
        <div className="space-y-6 overflow-y-auto pb-20">
          {loading ? (
            <div className="text-center py-20 font-black text-[#001529]/20 uppercase italic animate-pulse">Syncing...</div>
          ) : filteredLoads.length > 0 ? (
            activeTab === "history" ? (
              /* --- EXCEL TABLE VIEW --- */
              <div className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-3 text-left font-black text-gray-400 uppercase">Date</th>
                      <th className="p-3 text-left font-black text-gray-400 uppercase">Route</th>
                      <th className="p-3 text-right font-black text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentItems.map((load) => (
                      <tr key={load._id} className="hover:bg-yellow-50/30 transition-colors">
                        <td className="p-3 font-bold text-gray-500 whitespace-nowrap">
                          {new Date(load.updatedAt).toLocaleDateString('en-GB')}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col max-w-[120px]">
                            <span className="font-black text-[#001529] uppercase truncate">{load.pickupLocation}</span>
                            <span className="text-[8px] text-gray-400 truncate">To: {load.dropLocation}</span>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-black text-[8px] uppercase">Done</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination UI */}
                {totalPages > 1 && (
                  <div className="p-4 flex justify-center gap-1 bg-gray-50 border-t border-gray-100">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`h-6 w-6 rounded-lg text-[10px] font-black transition-all ${
                          currentPage === i + 1 ? "bg-[#001529] text-white" : "bg-white text-gray-400"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* --- CARDS VIEW (Pending/Active) --- */
              filteredLoads.map((load) => (
                <div key={load._id} onClick={() => navigate(`/driver/load/${load._id}`)} className="bg-white rounded-[3rem] p-8 shadow-md relative cursor-pointer active:scale-95 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-[#001529] flex items-center justify-center text-[#FFC107]"><HiOutlineCube size={24} /></div>
                    <div>
                      <p className="text-[8px] font-black text-gray-300 uppercase leading-none mb-1">ID: {load._id.slice(-6)}</p>
                      <h3 className="text-sm font-black text-[#001529] uppercase italic">{load.title}</h3>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-dashed border-gray-100 pl-6 space-y-4 relative">
                    <HiMapPin className="absolute -left-[9px] -top-1 text-[#001529]" size={16} />
                    <HiMapPin className="absolute -left-[9px] -bottom-1 text-[#FFC107]" size={16} />
                    <div><p className="text-[10px] font-bold text-[#001529] uppercase">{load.pickupLocation}</p></div>
                    <div><p className="text-[10px] font-bold text-[#001529] uppercase">{load.dropLocation}</p></div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50">
                    {activeTab === "pending" ? (
                      <button onClick={(e) => handleAcceptLoad(e, load._id)} className="w-full bg-[#FFC107] text-[#001529] py-3 rounded-xl font-black uppercase text-[10px]">Accept Load</button>
                    ) : (
                      <button onClick={(e) => handleCompleteLoad(e, load._id)} className="w-full bg-green-600 text-white py-3 rounded-xl font-black uppercase text-[10px]">Complete Delivery</button>
                    )}
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-[9px] font-black text-gray-300 uppercase italic tracking-widest">No {activeTab} shipments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLoads;