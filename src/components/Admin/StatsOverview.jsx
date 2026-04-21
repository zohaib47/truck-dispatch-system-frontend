import React, { useState } from 'react';
import { LuTruck, LuUsers, LuPackage, LuDollarSign, LuTrendingUp, LuArrowUpRight, LuInfo, LuExternalLink } from "react-icons/lu";
import Modal from '../ui/Modal'; 
import brand from '../../config/brand';

const StatsOverview = () => {
  const [selectedStat, setSelectedStat] = useState(null);

  const stats = [
    { 
      id: 'active_loads',
      label: 'Active Loads', 
      val: '24', 
      accent: 'text-brand-accent', 
      bg: 'bg-brand-accent/10', 
      icon: <LuTruck size={24} />,
      detail: "14 In-Transit, 10 At Warehouse",
      chartColor: "#F59E0B" 
    },
    { 
      id: 'drivers_online',
      label: 'Drivers Online', 
      val: '12', 
      accent: 'text-emerald-500', 
      bg: 'bg-emerald-500/10', 
      icon: <LuUsers size={24} />,
      detail: "8 Available, 4 On Duty",
      chartColor: "#10B981" 
    },
    { 
      id: 'loads_ready',
      label: 'Loads Ready', 
      val: '08', 
      accent: 'text-brand-primary', 
      bg: 'bg-brand-primary/10', 
      icon: <LuPackage size={24} />,
      detail: "Awaiting Dispatch",
      chartColor: "#3B82F6" 
    },
    { 
      id: 'monthly_revenue',
      label: 'Revenue', 
      val: '45.2k', 
      accent: 'text-purple-500', 
      bg: 'bg-purple-500/10', 
      icon: <LuDollarSign size={24} />,
      detail: "15% increase from last month",
      chartColor: "#A855F7" 
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header with Pulse Signal */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Live System Health: Optimal</p>
        </div>
        <div className="text-[10px] font-black text-brand-primary uppercase bg-brand-primary/5 px-4 py-1.5 rounded-full border border-brand-primary/10">
            Updated: Just Now
        </div>
      </div>

      {/* 2. Professional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedStat(item)}
            className="bg-app-card p-6 rounded-[2.5rem] border border-border-main shadow-sm hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="flex justify-between items-start mb-6">
              <div className={`${item.bg} ${item.accent} w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rounded-[1.5rem] group-hover:scale-110 shadow-inner`}>
                {item.icon}
              </div>
              <button className="p-2 opacity-0 group-hover:opacity-100 bg-app-bg rounded-xl border border-border-main text-text-muted transition-all duration-300">
                <LuInfo size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">
                {item.label}
              </p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black text-text-main italic">
                  {item.val}
                </h3>
                <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black mb-1">
                    <LuTrendingUp size={12}/> +12%
                </div>
              </div>
            </div>

            {/* Sub-detail Progress Bar */}
            <div className="mt-6 pt-6 border-t border-border-main/50 space-y-3">
                <div className="flex justify-between items-center text-[9px] font-black uppercase text-text-muted tracking-widest">
                    <span>Performance</span>
                    <span className={item.accent}>High</span>
                </div>
                <div className="h-1.5 w-full bg-app-bg rounded-full overflow-hidden border border-border-main/50 p-[2px]">
                    <div 
                        className={`h-full rounded-full ${item.accent.replace('text', 'bg')} transition-all duration-1000 w-0 group-hover:w-[70%]`}
                    />
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Analytics Chart Placeholder (Professional Look) */}
      <div className="bg-app-card rounded-[3rem] border border-border-main p-8 relative overflow-hidden group">
         <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-lg font-black text-text-main uppercase italic tracking-tight">
                  {brand.name.replace(brand.highlight,"")}
  <span className="text-brand-primary">
    {brand.highlight}
  </span>
                </h3>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">Last 30 days performance metrics</p>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase border border-brand-primary/20 px-4 py-2 rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                Export Data <LuExternalLink size={14}/>
            </button>
         </div>
         
         {/* Simple Visual for Graph Area */}
         <div className="h-[250px] w-full flex items-end gap-3 pb-2 border-b border-border-main">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                <div 
                    key={i} 
                    className="flex-1 bg-brand-primary/10 hover:bg-brand-primary rounded-t-xl transition-all duration-500 cursor-pointer group/bar relative"
                    style={{ height: `${h}%` }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-app-card border border-border-main px-2 py-1 rounded text-[8px] font-black opacity-0 group-hover/bar:opacity-100 transition-opacity">
                        {h}%
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* POPUP: Detail View */}
      <Modal 
        isOpen={!!selectedStat} 
        onClose={() => setSelectedStat(null)}
        title={`${selectedStat?.label} Insights`}
        subtitle="Deep dive into current metrics"
      >
        {selectedStat && (
          <div className="space-y-6 animate-in zoom-in duration-300">
             <div className={`p-8 rounded-[2rem] ${selectedStat.bg} border border-border-main/20 flex flex-col items-center text-center`}>
                <div className={`${selectedStat.accent} text-5xl mb-4`}>{selectedStat.icon}</div>
                <h4 className="text-4xl font-black text-text-main">{selectedStat.val}</h4>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-2">{selectedStat.detail}</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-app-bg border border-border-main rounded-2xl">
                    <p className="text-[9px] font-black text-text-muted uppercase">Target</p>
                    <p className="text-sm font-black text-emerald-500 italic">Achieved</p>
                </div>
                <div className="p-4 bg-app-bg border border-border-main rounded-2xl">
                    <p className="text-[9px] font-black text-text-muted uppercase">Efficiency</p>
                    <p className="text-sm font-black text-brand-primary italic">94.2%</p>
                </div>
             </div>

             <button className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20">
                Generate Detailed Report
             </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StatsOverview;