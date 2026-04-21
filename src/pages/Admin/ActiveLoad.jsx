import React, { useState, useEffect } from 'react';
import { LuActivity, LuMapPin, LuNavigation, LuUser, LuWeight, LuMap, LuPackage, LuLoader } from "react-icons/lu";
import API from '../../services/api';

const ActiveLoad = () => {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ── Fetch assigned + dispatched + pending loads ──
  useEffect(() => {
    const fetchLoads = async () => {
      try {
        setLoading(true);
        const response = await API.get('/load/all');

        console.log("📦 RAW DATA:", response.data);

        // 'pending' ko bhi filter mein shamil kiya taake wo dikh sakein
        const activeData = response.data.filter(load =>
          load.status === 'assigned' ||
          load.status === 'dispatched' ||
          load.status === 'pending'
        );

        setLoads(activeData);
      } catch (err) {
        console.error("Loads fetch error:", err);
        setError("Loads load nahi ho sake");
      } finally {
        setLoading(false);
      }
    };
    fetchLoads();
  }, []);

  // ── Status Style Helper (Update it to support pending) ──
  const statusStyle = (status) => {
    switch (status) {
      case 'dispatched': return 'bg-emerald-500/10 text-emerald-500';
      case 'assigned': return 'bg-blue-500/10 text-blue-500';
      case 'pending': return 'bg-amber-500/10 text-amber-500'; // Amber color for pending
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const dotStyle = (status) => {
    switch (status) {
      case 'dispatched': return 'bg-emerald-500 animate-pulse';
      case 'assigned': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500'; // Static amber dot
      default: return 'bg-gray-400';
    }
  };

  const transitCount = loads.filter(l => l.status === 'dispatched').length;
  const assignedCount = loads.filter(l => l.status === 'assigned').length;

  // ... (Baki UI ka part same rahega)

  return (
    <div className="space-y-8 animate-fade-in pb-10">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-text-main flex items-center gap-3 uppercase italic">
            <div className="relative">
              <LuActivity className="text-brand-primary" size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
            </div>
            Live <span className="text-brand-primary">Dispatch</span> Center
          </h2>
          <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.3em] mt-1 opacity-70">
            Monitoring {loads.length} Active Fleet Units
          </p>
        </div>

        <div className="hidden md:flex gap-3">
          <div className="bg-app-card border border-border-main px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-text-main uppercase">
              Transit: {String(transitCount).padStart(2, '0')}
            </span>
          </div>
          <div className="bg-app-card border border-border-main px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-primary rounded-full" />
            <span className="text-[10px] font-black text-text-main uppercase">
              Assigned: {String(assignedCount).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="flex items-center justify-center py-24 gap-3">
          <LuLoader className="animate-spin text-brand-primary" size={22} />
          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest animate-pulse">
            Loading Fleet Data...
          </span>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div className="text-center py-20 text-red-500 font-black text-sm uppercase">
          {error}
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && loads.length === 0 && (
        <div className="bg-app-card rounded-[2.5rem] border border-border-main p-20 text-center">
          <LuPackage className="text-text-muted mx-auto mb-4" size={40} />
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
            Abhi koi active load nahi hai
          </p>
          <p className="text-xs text-text-muted mt-2 opacity-60">
            Admin se load assign karwao
          </p>
        </div>
      )}

      {/* ── Load Cards ── */}
      {!loading && !error && loads.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {loads.map((load) => (
            <div
              key={load._id}
              className="bg-app-card rounded-[2.5rem] border border-border-main shadow-sm hover:shadow-2xl hover:border-brand-primary/20 transition-all duration-500 overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row h-full">

                {/* ── Left: Details ── */}
                <div className="flex-[1.5] p-8 space-y-8">

                  {/* Top Row */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="bg-app-bg text-brand-primary border border-border-main px-4 py-2 rounded-xl text-xs font-black italic tracking-widest">
                        #{load._id.slice(-6).toUpperCase()}
                      </span>
                      {load.quoteAmount && (
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-app-bg px-3 py-2 rounded-lg border border-border-main">
                          PKR {Number(load.quoteAmount).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 ${statusStyle(load.status)}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${dotStyle(load.status)}`} />
                      {load.status}
                    </div>
                  </div>

                  {/* Title */}
                  {load.title && (
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest -mt-4">
                      {load.title}
                    </p>
                  )}

                  {/* Route Visualizer */}
                  <div className="relative py-6">
                    <div className="flex items-center justify-between relative z-10">
                      <div className="text-left">
                        <p className="text-[9px] font-black text-text-muted uppercase mb-1 tracking-widest">Origin</p>
                        <h4 className="text-lg font-black text-text-main italic uppercase leading-none">
                          {load.pickupLocation}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black text-text-muted uppercase mb-1 tracking-widest">Destination</p>
                        <h4 className="text-lg font-black text-text-main italic uppercase leading-none">
                          {load.dropLocation}
                        </h4>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-app-bg -translate-y-1/2 rounded-full overflow-hidden border border-border-main">
                      <div
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-1000"
                        style={{ width: load.status === 'dispatched' ? '65%' : '15%' }}
                      />
                    </div>

                    {/* Truck Icon */}
                    <TruckIcon progress={load.status === 'dispatched' ? 65 : 15} />
                  </div>

                  {/* Info Pills */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-app-bg/50 p-4 rounded-2xl border border-border-main">
                      <p className="text-[8px] font-black text-text-muted uppercase mb-1">Driver</p>
                    
                      <div className="flex items-center gap-2 text-xs font-black text-text-main italic">
                        <LuUser className="text-brand-primary" size={14} />
                        {/* Agar assignedTo null hai, to sirf "Unassigned" dikhao */}
                        {load.assignedTo ? (
                          load.assignedTo.fullName || load.assignedTo.name || "Unknown Driver"
                        ) : (
                          "Unassigned"
                        )}
                      </div>
                    </div>
                    <div className="bg-app-bg/50 p-4 rounded-2xl border border-border-main">
                      <p className="text-[8px] font-black text-text-muted uppercase mb-1">Payload</p>
                      <div className="flex items-center gap-2 text-xs font-black text-text-main italic">
                        <LuWeight className="text-brand-accent" size={14} />
                        {load.weight || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-app-bg/50 p-4 rounded-2xl border border-border-main">
                      <p className="text-[8px] font-black text-text-muted uppercase mb-1">Assigned By</p>
                      <div className="flex items-center gap-2 text-xs font-black text-text-main italic">
                        <LuMapPin className="text-emerald-500" size={14} />
                        {load.admin?.name || 'Admin'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right: Map Placeholder ── */}
                <div className="flex-1 bg-app-bg min-h-[250px] relative overflow-hidden border-l border-border-main group-hover:border-brand-primary/30 transition-all">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="p-4 bg-brand-primary/10 rounded-full inline-block border border-brand-primary/20">
                        <LuMap className="text-brand-primary animate-bounce" size={32} />
                      </div>
                      <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                        Live Satellite Feed
                      </p>
                    </div>
                  </div>

                  {/* Bottom Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-app-card/90 backdrop-blur-md p-4 rounded-2xl border border-border-main shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[8px] font-black text-brand-accent uppercase">Load ID</p>
                        <p className="text-sm font-black text-text-main italic">
                          #{load._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                      <button className="bg-brand-primary text-white p-3 rounded-xl shadow-lg shadow-brand-primary/20 hover:scale-110 transition-transform">
                        <LuNavigation size={18} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Truck Icon on Progress Bar ──
const TruckIcon = ({ progress }) => (
  <div
    className="absolute top-1/2 h-8 w-8 bg-brand-primary text-white rounded-lg flex items-center justify-center shadow-lg border-2 border-app-card -translate-y-1/2 transition-all duration-1000 z-20"
    style={{ left: `calc(${progress}% - 16px)` }}
  >
    <LuNavigation size={16} className="rotate-90" />
  </div>
);

export default ActiveLoad;
