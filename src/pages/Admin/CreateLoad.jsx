import React, { useState } from 'react';
import { FiPlusCircle, FiMapPin, FiTruck, FiDollarSign, FiCalendar, FiBox, FiClipboard } from "react-icons/fi";

const CreateLoad = () => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    weight: '',
    truckType: 'Flatbed',
    price: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Load Data for Backend:", formData);
    alert("Load successfully created!");
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-10">
      <div className="bg-app-card rounded-[2.5rem] shadow-2xl shadow-black/5 border border-border-main overflow-hidden transition-all duration-500">
        
        {/* Header Section */}
        <div className="bg-app-header p-8 border-b border-border-main relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-text-main flex items-center gap-3 uppercase tracking-tight italic">
              <div className="p-2 bg-brand-primary/10 rounded-xl">
                <FiPlusCircle className="text-brand-primary" size={24} />
              </div>
              Create New <span className="text-brand-primary">Shipment</span>
            </h2>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-70">
              Enter load details for dispatching
            </p>
          </div>
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Pickup Location */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiMapPin className="text-brand-accent" /> Pickup Point
              </label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                placeholder="e.g. Karachi Port Terminal"
                onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
              />
            </div>

            {/* 2. Dropoff Location */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiMapPin className="text-brand-primary" /> Delivery Destination
              </label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                placeholder="e.g. Lahore Industrial Estate"
                onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})}
              />
            </div>

            {/* 3. Pickup Date */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiCalendar className="text-brand-accent" /> Pickup Date
              </label>
              <input 
                type="date" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
              />
            </div>

            {/* 4. Dropoff Date */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiCalendar className="text-brand-primary" /> Expected Delivery
              </label>
              <input 
                type="date" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                onChange={(e) => setFormData({...formData, dropoffDate: e.target.value})}
              />
            </div>

            {/* 5. Weight */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiBox className="text-brand-accent" /> Weight (Tons)
              </label>
              <input 
                type="number" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                placeholder="25"
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>

            {/* 6. Truck Type */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiTruck className="text-brand-primary" /> Required Vehicle
              </label>
              <select 
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none cursor-pointer shadow-inner appearance-none"
                onChange={(e) => setFormData({...formData, truckType: e.target.value})}
              >
                <option value="Flatbed">Flatbed Trailer</option>
                <option value="Reefer">Reefer (Cold Chain)</option>
                <option value="Container">Container (20ft/40ft)</option>
                <option value="Lowboy">Lowboy Heavy Haul</option>
              </select>
            </div>

            {/* 7. Price / Budget */}
            <div className="space-y-3">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiDollarSign className="text-emerald-500" /> Freight Price (PKR)
              </label>
              <input 
                type="number" 
                required
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner"
                placeholder="150,000"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>

            {/* 8. Additional Notes */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                <FiClipboard className="text-brand-primary" /> Shipment Notes
              </label>
              <textarea 
                rows="3"
                className="w-full px-5 py-4 bg-app-bg border border-border-main rounded-2xl text-text-main font-bold text-sm focus:border-brand-primary/50 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all shadow-inner resize-none"
                placeholder="Any special instructions (e.g. Handle with care, Fragile)..."
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit" 
                className="w-full bg-brand-primary hover:opacity-90 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer uppercase tracking-widest text-xs"
              >
                Confirm & Dispatch Load <FiPlusCircle size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLoad;