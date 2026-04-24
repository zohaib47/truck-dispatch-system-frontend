import React, { useState } from 'react';
import { FiPlusCircle, FiMapPin, FiCalendar, FiDollarSign, FiZap, FiAlignLeft } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createLoad } from "../../services/api";

const CreateLoad = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    pickupLocation: '',
    dropLocation: '',
    weight: '',
    material: '',
    truckType: 'Cargo Small Truck',
    price: '', // ✅ Sirf 'price' rakha hai, 'fare' nikal diya
    pickupDate: '',
    deadline: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form se jane wala data:", formData);
    setIsSubmitting(true);
    
    try {
      // ✅ 'createLoad' function hi use ho raha hai
      const response = await createLoad(formData); 
      
      if (response.status === 201 || response.status === 200) {
        toast.success("🚀 Shipment Dispatched Successfully!");
        setFormData({
          title: '', pickupLocation: '', dropLocation: '', weight: '',
          material: '', truckType: 'Cargo Small Truck', price: '',
          pickupDate: '', deadline: '', instructions: ''
        });
      }
    } catch (error) {
      console.error("Backend Error Detail:", error.response?.data);
      toast.error(error.response?.data?.msg || "Submission failed. Check your data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <ToastContainer position="top-right" />
      
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter flex items-center gap-3">
                <FiPlusCircle className="text-brand-primary" /> Create <span className="text-brand-primary">New Load</span>
            </h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fill in the logistics details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Trip Title</label>
              <input 
                type="text" required name="title" placeholder="e.g. Textile Export"
                className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Vehicle Type</label>
              <select 
                name="truckType"
                className="w-full bg-transparent outline-none text-sm font-bold text-slate-800 cursor-pointer"
                onChange={handleChange}
                value={formData.truckType}
              >
                <option value="Cargo Small Truck">Cargo Small Truck</option>
                <option value="Small Truck">Small Truck (6-Wheel)</option>
                <option value="Heavy Load">Heavy Load (Trailer)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Pickup City</label>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-emerald-500" />
                <input 
                  type="text" required name="pickupLocation" placeholder="Where to pick?"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                  onChange={handleChange}
                  value={formData.pickupLocation}
                />
              </div>
            </div>

            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Drop-off City</label>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-brand-primary" />
                <input 
                  type="text" required name="dropLocation" placeholder="Where to deliver?"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                  onChange={handleChange}
                  value={formData.dropLocation}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Pickup Date</label>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-slate-400" />
                <input 
                  type="datetime-local" required name="pickupDate"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                  onChange={handleChange}
                  value={formData.pickupDate}
                />
              </div>
            </div>

            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Deadline</label>
              <div className="flex items-center gap-2">
                <FiZap className="text-amber-500" />
                <input 
                  type="datetime-local" required name="deadline"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                  onChange={handleChange}
                  value={formData.deadline}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Material</label>
              <input 
                type="text" required name="material" placeholder="Goods"
                className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                onChange={handleChange}
                value={formData.material}
              />
            </div>
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Weight</label>
              <input 
                type="text" required name="weight" placeholder="e.g. 5 Tons"
                className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                onChange={handleChange}
                value={formData.weight}
              />
            </div>
            <div className="group border-b border-gray-200 pb-2">
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Price (PKR)</label>
              <div className="flex items-center gap-1">
                <FiDollarSign className="text-emerald-500" />
                <input 
                  type="number" required name="price" placeholder="Amount"
                  className="w-full bg-transparent outline-none text-sm font-bold text-slate-800"
                  onChange={handleChange}
                  value={formData.price}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">
              <FiAlignLeft /> Instructions
            </label>
            <textarea 
              rows="3" name="instructions"
              placeholder="Any special notes..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm"
              onChange={handleChange}
              value={formData.instructions}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all
              ${isSubmitting ? "bg-gray-200 text-gray-500" : "bg-slate-900 text-white hover:bg-brand-primary active:scale-95"}`}
          >
            {isSubmitting ? "Processing..." : "Dispatch Shipment"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateLoad;