import React, { useState, useEffect } from "react";
import {
  RiMapPinRangeLine,
  RiWeightLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiInformationLine,
  RiUserReceived2Line,
  RiArrowRightUpLine,
} from "react-icons/ri";

import { assignLoad, fetchAllDrivers } from "../../services/api";

const AssignLoad = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [driversList, setDriversList] = useState([]);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(true);

  // UPDATED: Backend keys ke mutabiq state banayi
  const [formData, setFormData] = useState({
    driverId: "",
    title: "",            // New field required by backend
    pickupLocation: "",   // 'pickup' ko 'pickupLocation' kiya
    dropLocation: "",     // 'dropoff' ko 'dropLocation' kiya
    weight: "",
    material: "",
    fare: "",
    deadline: "",
    instructions: "",
  });

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const response = await fetchAllDrivers();
        setDriversList(response.data);
      } catch (error) {
        console.error("Drivers load nahi ho sakay:", error);
      } finally {
        setIsLoadingDrivers(false);
      }
    };
    getDrivers();
  }, []);

  // UPDATED: Validation logic with new keys
  const isFormIncomplete =
    !formData.driverId ||
    !formData.title ||
    !formData.pickupLocation ||
    !formData.dropLocation ||
    !formData.weight ||
    !formData.material ||
    !formData.fare ||
    !formData.deadline;

  const theme = {
    card: "bg-white dark:bg-app-header border-border-main",
    input: "bg-slate-50 dark:bg-white/5 border-border-main focus:border-brand-primary",
    text: "text-slate-900 dark:text-text-main",
    muted: "text-text-muted",
    border: "border-border-main",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await assignLoad(formData);
      if (response.status === 201 || response.status === 200) {
        alert("🎉 Load Assigned Successfully!");
        // Reset form with correct keys
        setFormData({
          driverId: "",
          title: "",
          pickupLocation: "",
          dropLocation: "",
          weight: "",
          material: "",
          fare: "",
          deadline: "",
          instructions: "",
        });
      }
    } catch (error) {
      console.log("FULL ERROR DETAILS:", error.response || error);
      alert(error.response?.data?.error || "Backend connection failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-app-bg p-8 font-sans transition-colors duration-500">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className={`text-4xl font-black italic uppercase tracking-tighter ${theme.text}`}>
          Assign <span className="text-brand-primary">New Load</span>
        </h1>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          <div className={`${theme.card} rounded-[3rem] border-2 p-12 shadow-2xl shadow-brand-primary/5`}>
            <h3 className={`text-xl font-black italic uppercase mb-8 pb-4 border-b ${theme.border}`}>
              Trip Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  label: "Trip Title (e.g. Rice Export)",
                  icon: RiInformationLine,
                  key: "title", // Backend requirement
                  type: "text",
                },
                {
                  label: "Pickup Point",
                  icon: RiMapPinRangeLine,
                  key: "pickupLocation", // Backend key
                  type: "text",
                },
                {
                  label: "Destination",
                  icon: RiArrowRightUpLine,
                  key: "dropLocation", // Backend key
                  type: "text",
                },
                {
                  label: "Material Type",
                  icon: RiInformationLine,
                  key: "material",
                  type: "text",
                },
                {
                  label: "Total Tonnage",
                  icon: RiWeightLine,
                  key: "weight",
                  type: "text",
                },
                {
                  label: "Fare (PKR)",
                  icon: RiMoneyDollarCircleLine,
                  key: "fare",
                  type: "number",
                },
                {
                  label: "Deadline",
                  icon: RiCalendarCheckLine,
                  key: "deadline",
                  type: "datetime-local",
                },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${theme.muted} ml-2`}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary" size={20} />
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      className={`w-full pl-12 pr-6 py-5 rounded-2xl border-2 outline-none transition-all ${theme.input}`}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ${theme.muted} ml-2`}>
                Special Instructions
              </label>
              <textarea
                rows="4"
                value={formData.instructions}
                className={`w-full px-6 py-5 rounded-[2rem] border-2 outline-none ${theme.input}`}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isFormIncomplete}
            className={`w-full py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] transition-all
              ${isSubmitting || isFormIncomplete
                ? "bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-50"
                : "bg-brand-primary text-white hover:scale-[1.01] shadow-2xl shadow-brand-primary/30"}`}
          >
            {isSubmitting ? "Sending to Database..." : "Assign Trip & Notify Driver"}
          </button>
        </form>

        <div className="space-y-8">
          <div className={`${theme.card} rounded-[3rem] border-2 p-8 shadow-xl`}>
            <h3 className={`text-sm font-black italic uppercase mb-6 flex items-center gap-2 ${theme.text}`}>
              <RiUserReceived2Line className="text-brand-primary" /> Select Driver
            </h3>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {isLoadingDrivers ? (
                <p className="text-center text-[10px] uppercase font-black animate-pulse py-10">Fetching Live Drivers...</p>
              ) : driversList.length > 0 ? (
                driversList.map((driver) => (
                  <div
                    key={driver._id}
                    onClick={() => setFormData({ ...formData, driverId: driver._id })}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 
                      ${formData.driverId === driver._id
                        ? "border-brand-primary bg-brand-primary/5"
                        : `${theme.border} hover:bg-slate-50 dark:hover:bg-white/5`}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center font-black text-brand-primary text-lg">
                      {driver.fullName?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-black uppercase tracking-tight ${theme.text}`}>
                        {driver.fullName}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[9px] font-bold text-brand-primary uppercase">
                          {driver.experience} Yrs Exp
                        </span>
                        <span className="text-[9px] font-black text-slate-400 uppercase">
                          {driver.vehicleType}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs opacity-50 py-10">No drivers found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignLoad;