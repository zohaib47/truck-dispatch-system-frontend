import React, { useState, useEffect } from "react";
import { RiTruckLine, RiMapPinRangeLine, RiUserReceived2Line, RiArrowRightUpLine, RiCheckLine } from "react-icons/ri";
import { getAllLoads, fetchAllDrivers,} from "../../services/api"; 
import { assignDriverToLoad } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

const AssignLoad = () => {
  const [loadsList, setLoadsList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected state for assignment
  const [selectedLoadId, setSelectedLoadId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadsRes, driversRes] = await Promise.all([
          getAllLoads(),
          fetchAllDrivers(),
        ]);
        // Sirf wo loads filter kiye jo "pending" hain
        setLoadsList(loadsRes.data.filter(l => l.status === "pending" || !l.assignedTo));
        setDriversList(driversRes.data);
      } catch (error) {
        toast.error("Data load nahi ho saka!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

 const handleAssign = async () => {
  if (!selectedLoadId || !selectedDriverId) {
    return toast.warn("Pehle Load aur Driver dono select karein!");
  }

  setIsSubmitting(true);
  try {
    // ❌ Purana: await API.patch(...)
    // ✅ Naya:
    await assignDriverToLoad(selectedLoadId, selectedDriverId);

    toast.success("🚀 Trip successfully assigned!");
    
    // List refresh
    setLoadsList(loadsList.filter(l => l._id !== selectedLoadId));
    setSelectedLoadId(null);
    setSelectedDriverId(null);
  } catch (error) {
    console.error("Assignment Error:", error.response?.data);
    toast.error(error.response?.data?.msg || "Assignment failed!");
  } finally {
    setIsSubmitting(false);
  }
};

  const theme = {
    card: "bg-white dark:bg-app-header border-border-main",
    text: "text-slate-900 dark:text-text-main",
    border: "border-border-main",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-app-bg p-8 font-sans transition-all">
      <ToastContainer position="top-right" theme="colored" />
      
      <header className="max-w-7xl mx-auto mb-10">
        <h1 className={`text-4xl font-black italic uppercase tracking-tighter ${theme.text}`}>
          Fleet <span className="text-brand-primary">Dispatch Center</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Connect available loads with live drivers</p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: PENDING LOADS LIST */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className={`text-sm font-black uppercase italic flex items-center gap-2 ${theme.text}`}>
            <RiTruckLine className="text-brand-primary" /> Pending Shipments
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
                <p className="animate-pulse font-bold text-slate-400">Loading Loads...</p>
            ) : loadsList.length > 0 ? (
              loadsList.map((load) => (
                <div
                  key={load._id}
                  onClick={() => setSelectedLoadId(load._id)}
                  className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between shadow-sm
                    ${selectedLoadId === load._id 
                      ? "border-brand-primary bg-brand-primary/5 shadow-brand-primary/10 scale-[1.01]" 
                      : `${theme.card} hover:border-slate-300`}`}
                >
                  <div>
                    <h4 className={`font-black uppercase italic ${theme.text}`}>{load.title}</h4>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                            <RiMapPinRangeLine /> {load.pickupLocation}
                        </span>
                        <RiArrowRightUpLine className="text-brand-primary" />
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                            <RiMapPinRangeLine /> {load.dropLocation}
                        </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-brand-primary">PKR {load.price}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{load.weight} Tons</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed rounded-[2rem] text-slate-300 font-bold uppercase italic">No Pending Loads Found</div>
            )}
          </div>
        </div>

        {/* RIGHT: DRIVER SELECTION & ACTION */}
        <div className="space-y-6">
          <div className={`${theme.card} rounded-[3rem] border-2 p-8 shadow-xl`}>
            <h3 className={`text-sm font-black italic uppercase mb-6 flex items-center gap-2 ${theme.text}`}>
              <RiUserReceived2Line className="text-brand-primary" /> Select Driver
            </h3>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {driversList.map((driver) => (
                <div
                  key={driver._id}
                  onClick={() => setSelectedDriverId(driver._id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 
                    ${selectedDriverId === driver._id
                      ? "border-brand-primary bg-brand-primary/5"
                      : `${theme.border} hover:bg-slate-50 dark:hover:bg-white/5`}`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm">
                    {driver.fullName?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-black uppercase ${theme.text}`}>{driver.fullName}</p>
                    <p className="text-[9px] font-bold text-brand-primary uppercase">{driver.vehicleType || "Small Truck"}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAssign}
              disabled={isSubmitting || !selectedLoadId || !selectedDriverId}
              className={`w-full mt-8 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                ${isSubmitting || !selectedLoadId || !selectedDriverId
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-brand-primary shadow-xl"}`}
            >
              {isSubmitting ? "Assigning..." : "Confirm Dispatch"} <RiCheckLine size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignLoad;