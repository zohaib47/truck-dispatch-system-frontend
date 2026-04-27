import React, { useState, useEffect } from "react";
import {
  RiTruckLine,
  RiMapPinRangeLine,
  RiUserReceived2Line,
  RiArrowRightUpLine,
  RiCheckLine,
} from "react-icons/ri";
import {
  getAllLoads,
  fetchAllDrivers,
  assignDriverToLoad,
} from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

const AssignLoad = () => {
  const [loadsList, setLoadsList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedLoadId, setSelectedLoadId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadsRes, driversRes] = await Promise.all([
          getAllLoads(),
          fetchAllDrivers(),
        ]);
        setLoadsList(
          loadsRes.data.filter((l) => l.status === "pending" || !l.assignedTo),
        );
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
      await assignDriverToLoad(selectedLoadId, selectedDriverId);
      toast.success("🚀 Trip successfully assigned!");
      setLoadsList(loadsList.filter((l) => l._id !== selectedLoadId));
      setSelectedLoadId(null);
      setSelectedDriverId(null);
    } catch (error) {
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
    <div className="min-h-screen bg-slate-50 dark:bg-app-bg p-4 md:p-8 font-sans transition-all">
      <ToastContainer position="top-right" theme="colored" />

      <header className="max-w-7xl mx-auto mb-8 md:mb-10 text-center md:text-left">
        <h1
          className={`text-3xl md:text-4xl font-black italic uppercase tracking-tighter ${theme.text}`}
        >
          Fleet <span className="text-brand-primary">Dispatch Center</span>
        </h1>
        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
          Connect available loads with live drivers
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
        {/* LEFT: PENDING LOADS LIST (Scrollable on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          <h3
            className={`text-xs md:text-sm font-black uppercase italic flex items-center gap-2 ${theme.text}`}
          >
            <RiTruckLine className="text-brand-primary" /> Pending Shipments (
            {loadsList.length})
          </h3>

          <div className="grid grid-cols-1 gap-4 max-h-[600px] lg:max-h-none overflow-y-auto pr-1">
            {isLoading ? (
              <p className="animate-pulse font-bold text-slate-400">
                Loading Loads...
              </p>
            ) : loadsList.length > 0 ? (
              loadsList.map((load) => (
                <div
                  key={load._id}
                  onClick={() => setSelectedLoadId(load._id)}
                  className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm gap-4
                    ${
                      selectedLoadId === load._id
                        ? "border-brand-primary bg-brand-primary/5 shadow-brand-primary/10 scale-[1.01]"
                        : `${theme.card} hover:border-slate-300`
                    }`}
                >
                  <div className="w-full md:w-auto">
                    <h4
                      className={`font-black uppercase italic text-sm md:text-base ${theme.text}`}
                    >
                      {load.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <RiMapPinRangeLine /> {load.pickupLocation}
                      </span>
                      <RiArrowRightUpLine className="text-brand-primary hidden md:block" />
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <RiMapPinRangeLine /> {load.dropLocation}
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                    <p className="text-sm md:text-base font-black text-brand-primary">
                      PKR {load.price}
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">
                      {load.weight} Tons
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border-2 border-dashed rounded-[2rem] text-slate-300 font-bold uppercase italic">
                No Pending Loads
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: DRIVER SELECTION & ACTION */}
        <div className="space-y-6">
          <div
            className={`${theme.card} rounded-[2rem] md:rounded-[3rem] border-2 p-6 md:p-8 shadow-xl sticky top-8`}
          >
            <h3
              className={`text-xs md:text-sm font-black italic uppercase mb-6 flex items-center gap-2 ${theme.text}`}
            >
              <RiUserReceived2Line className="text-brand-primary" /> Select
              Driver
            </h3>

            <div className="space-y-3 max-h-[350px] md:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {driversList.map((driver) => (
                <div
                  key={driver._id}
                  onClick={() => setSelectedDriverId(driver._id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between 
                    ${
                      selectedDriverId === driver._id
                        ? "border-brand-primary bg-brand-primary/5"
                        : `${theme.border} hover:bg-slate-50 dark:hover:bg-white/5`
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs md:text-sm">
                      {driver.fullName?.charAt(0)}
                    </div>
                    <div>
                      <p
                        className={`text-[10px] font-black uppercase ${theme.text}`}
                      >
                        {driver.fullName}
                      </p>
                      <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">
                        {driver.vehicleType || "Fleet Truck"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        driver.status === "Available"
                          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                          : driver.status === "On Trip"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    ></span>

                    <span
                      className={`text-[8px] font-black uppercase tracking-tighter ${
                        driver.status === "Available"
                          ? "text-green-500"
                          : driver.status === "On Trip"
                            ? "text-orange-500"
                            : "text-red-500"
                      }`}
                    >
                      {driver.status || "Off Duty"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAssign}
              disabled={isSubmitting || !selectedLoadId || !selectedDriverId}
              className={`w-full mt-8 py-4 md:py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                ${
                  isSubmitting || !selectedLoadId || !selectedDriverId
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-brand-primary shadow-xl active:scale-95"
                }`}
            >
              {isSubmitting ? "Assigning..." : "Confirm Dispatch"}{" "}
              <RiCheckLine size={18} />
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AssignLoad;
