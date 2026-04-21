import React, { useState, useEffect } from 'react';
import { FiTruck, FiPlus, FiSearch, FiEye, FiEdit2, FiTrash2, FiTag } from "react-icons/fi";
import Modal from '../../components/ui/Modal';
import { notify } from '../../utils/toast';
import brand from '../../config/brand';
import axios from 'axios';

const Inventory = () => {
  // --- CONFIGURATION ---
  const API_BASE_URL = 'http://localhost:5000/api/truck';
  
  // Helper function to get headers (Reusable)
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { 
      headers: { 'Authorization': `Bearer ${token}` } 
    };
  };

  const [fleet, setFleet] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState('add');
  const [selectedTruck, setSelectedTruck] = useState(null);

  const [formData, setFormData] = useState({
    truckName: '',
    plateNumber: '',
    truckType: 'Mini Truck',
    capacityValue: '',
    ownerName: '',
    status: 'Available'
  });

// 1. Fetch Trucks
const fetchTrucks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/all`, getAuthHeaders());
    
    if (Array.isArray(res.data)) {
      setFleet(res.data);
    } else {
      setFleet([]); 
      notify.error("Data format sahi nahi hai!");
    }
  } catch (err) {
    setFleet([]); 
    if(err.response?.status === 401) {
      notify.error("Session expired, please login again.");
    } else {
      notify.error("Trucks load not hua.");
    }
  }
};

useEffect(() => { fetchTrucks(); }, []);

// 2. Add / Update Truck
const handleSubmit = async (e) => {
  e.preventDefault();

  const url = viewType === 'edit' 
    ? `${API_BASE_URL}/update/${selectedTruck._id}`
    : `${API_BASE_URL}/add`;
  
  const method = viewType === 'edit' ? 'put' : 'post';

  try {
    await axios[method](url, formData, getAuthHeaders());
   
    setIsModalOpen(false);
    setTimeout(() => {
    fetchTrucks();
}, 500);

   
    notify.success(viewType === 'edit' ? "Truck updated" : "Add New truck successfully");

  } catch (err) {
    
    notify.error(err.response?.data?.msg || "Action failed!");
  }
};

// 3. Delete Truck
const handleDelete = async (id) => {
  if(window.confirm("Do you want to delete truck?")) {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`, getAuthHeaders());
      fetchTrucks();
      // Alert removed, Toast added
      notify.info("Truck delete successfully.");
    } catch (err) { 
      // Alert removed, Toast added
      notify.error("Can't Delete "); 
    }
  }
};

  // Filter Logic
  const filteredFleet = fleet.filter(t => 
    t.plateNumber?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'All' || t.status === filterStatus)
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-emerald-500/10 text-emerald-500';
      case 'On Trip': return 'bg-blue-500/10 text-blue-500';
      case 'Maintenance': return 'bg-amber-500/10 text-amber-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Header & Search Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-app-card p-6 rounded-[2rem] border border-border-main shadow-sm">
        <div>
          <h2 className="text-xl font-black text-text-main flex items-center  uppercase italic">
            <FiTruck className="text-brand-primary mr-2" />{brand.name.replace(brand.highlight, "")} <span className="text-brand-primary"> {brand.highlight} </span>
          </h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Total: {fleet.length}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search Plate Number..." 
              className="w-full pl-12 pr-4 py-3 bg-app-bg border border-border-main rounded-xl text-xs font-bold outline-none focus:border-brand-primary"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { 
              setViewType('add'); 
              setFormData({truckName:'', plateNumber:'', truckType:'Mini Truck', capacityValue:'', ownerName:'', status:'Available'}); 
              setIsModalOpen(true); 
            }}
            className="bg-brand-primary text-white px-5 py-3 rounded-xl font-black flex items-center gap-2 text-[10px] uppercase tracking-widest hover:opacity-90 transition-all"
          >
            <FiPlus size={16} /> Add Truck
          </button>
        </div>
      </div>

      {/* Excel Style List */}
      <div className="bg-app-card rounded-[2rem] border border-border-main overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-app-bg/50 border-b border-border-main">
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Vehicle / Model</th>
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Plate No</th>
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Type</th>
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Capacity</th>
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main/50">
              {filteredFleet.map((truck) => (
                <tr key={truck._id} className="hover:bg-app-bg/30 transition-all group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-app-bg rounded-lg text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <FiTruck size={16} />
                      </div>
                      <span className="font-bold text-text-main text-sm">{truck.truckName}</span>
                    </div>
                  </td>
                  <td className="p-5 font-black text-brand-accent text-xs uppercase italic">{truck.plateNumber}</td>
                  <td className="p-5 text-xs font-bold text-text-muted">{truck.truckType}</td>
                  <td className="p-5 text-xs font-bold text-text-main">{truck.capacity?.value} Tons</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusColor(truck.status)}`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelectedTruck(truck); setViewType('view'); setIsModalOpen(true); }} className="p-2 hover:text-brand-primary transition-colors"><FiEye size={16}/></button>
                      <button onClick={() => { 
                        setSelectedTruck(truck); 
                        setFormData({ ...truck, capacityValue: truck.capacity.value }); 
                        setViewType('edit'); 
                        setIsModalOpen(true); 
                      }} className="p-2 hover:text-blue-500 transition-colors"><FiEdit2 size={16}/></button>
                      <button onClick={() => handleDelete(truck._id)} className="p-2 hover:text-brand-primary transition-colors"><FiTrash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={viewType === 'add' ? "Register New Truck" : (viewType === 'edit' ? "Edit Truck" : "Truck Details")}
      >
        {viewType === 'view' ? (
           <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-app-bg rounded-2xl border border-border-main">
                   <p className="text-[10px] font-black text-text-muted uppercase mb-1">Owner</p>
                   <p className="font-bold text-sm text-text-main">{selectedTruck?.ownerName}</p>
                </div>
                <div className="p-4 bg-app-bg rounded-2xl border border-border-main">
                   <p className="text-[10px] font-black text-text-muted uppercase mb-1">Type</p>
                   <p className="font-bold text-sm text-text-main">{selectedTruck?.truckType}</p>
                </div>
              </div>
              <div className="p-5 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl text-center">
                 <p className="text-[10px] font-black text-brand-primary uppercase">Current Status</p>
                 <p className="text-xl font-black italic text-brand-primary">{selectedTruck?.status}</p>
              </div>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase">Truck Name/Model</label>
                <input required type="text" value={formData.truckName} onChange={(e)=>setFormData({...formData, truckName: e.target.value})} className="w-full p-3 bg-app-bg border border-border-main rounded-xl text-sm outline-none focus:border-brand-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase">Plate Number</label>
                <input required type="text" value={formData.plateNumber} disabled={viewType==='edit'} onChange={(e)=>setFormData({...formData, plateNumber: e.target.value})} className="w-full p-3 bg-app-bg border border-border-main rounded-xl text-sm outline-none focus:border-brand-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase">Truck Type</label>
                <select value={formData.truckType} onChange={(e)=>setFormData({...formData, truckType: e.target.value})} className="w-full p-3 bg-app-bg border border-border-main rounded-xl text-sm outline-none appearance-none">
                   <option value="Mini Truck">Mini Truck</option>
                   <option value="Small Truck">Small Truck</option>
                   <option value="Medium Truck">Medium Truck</option>
                   <option value="Heavy Duty (22 Wheeler)">Heavy Duty (22 Wheeler)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-text-muted uppercase">Capacity (Tons)</label>
                <input required type="number" value={formData.capacityValue} onChange={(e)=>setFormData({...formData, capacityValue: e.target.value})} className="w-full p-3 bg-app-bg border border-border-main rounded-xl text-sm outline-none focus:border-brand-primary" />
              </div>
            </div>
            {viewType === 'edit' && (
               <div className="space-y-1">
                 <label className="text-[10px] font-black text-text-muted uppercase">Status</label>
                 <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-app-bg border border-border-main rounded-xl text-sm outline-none">
                    <option value="Available">Available</option>
                    <option value="On Trip">On Trip</option>
                    <option value="Maintenance">Maintenance</option>
                 </select>
               </div>
            )}
            <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl font-black uppercase text-xs shadow-lg shadow-brand-primary/20 mt-4 cursor-pointer active:scale-95 transition-all">
              {viewType === 'edit' ? "Update Vehicle" : "Confirm Registration"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Inventory;