import React, { useState, useEffect } from 'react';
import { 
  HiOutlineTruck, 
  HiOutlineUsers, 
  HiOutlineCube, 
  HiOutlineCurrencyDollar, 
  HiOutlineArrowTrendingUp, 
  HiOutlineInformationCircle, 
  HiOutlineArrowTopRightOnSquare 
} from "react-icons/hi2"; // Hi2 Icons import
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Spinner ke liye best hai
import Modal from '../ui/Modal'; 
import brand from '../../config/brand';
import API from '../../services/api'; 

const StatsOverview = () => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dynamicStats, setDynamicStats] = useState({
    activeLoads: 0,
    driversOnline: 0,
    loadsPending: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [loadsRes, driversRes] = await Promise.all([
          API.get('/load/all'),
          API.get('/driver')
        ]);

        const loads = loadsRes.data || [];
        const drivers = driversRes.data || [];

        const active = loads.filter(l => l.status === 'assigned' || l.status === 'in-transit').length;
        const pending = loads.filter(l => l.status === 'pending').length;
        const online = drivers.filter(d => d.status === 'available' || d.status === 'on-duty').length;
        const revenue = loads
          .filter(l => l.status === 'delivered')
          .reduce((sum, current) => sum + (Number(current.price) || 0), 0);

        setDynamicStats({
          activeLoads: active,
          driversOnline: online,
          loadsPending: pending,
          totalRevenue: revenue
        });

      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { 
      id: 'active_loads',
      label: 'Active Loads', 
      val: dynamicStats.activeLoads, 
      accent: 'text-brand-accent', 
      bg: 'bg-brand-accent/10', 
      icon: <HiOutlineTruck size={26} />,
      detail: `${dynamicStats.activeLoads} currently on the move`,
    },
    { 
      id: 'drivers_online',
      label: 'Drivers Online', 
      val: dynamicStats.driversOnline, 
      accent: 'text-emerald-500', 
      bg: 'bg-emerald-500/10', 
      icon: <HiOutlineUsers size={26} />,
      detail: "Ready for assignment",
    },
    { 
      id: 'loads_ready',
      label: 'Pending Loads', 
      val: dynamicStats.loadsPending, 
      accent: 'text-brand-primary', 
      bg: 'bg-brand-primary/10', 
      icon: <HiOutlineCube size={26} />,
      detail: "Awaiting Dispatch",
    },
    { 
      id: 'monthly_revenue',
      label: 'Total Revenue', 
      val: `$${(dynamicStats.totalRevenue / 1000).toFixed(1)}k`, 
      accent: 'text-purple-500', 
      bg: 'bg-purple-500/10', 
      icon: <HiOutlineCurrencyDollar size={26} />,
      detail: "Calculated from delivered loads",
    },
  ];

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin text-brand-primary" size={40} />
    </div>
  );

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

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedStat(item)}
            className="bg-app-card p-6 rounded-[2.5rem] border border-border-main shadow-sm hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${item.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="flex justify-between items-start mb-6">
              <div className={`${item.bg} ${item.accent} w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rounded-[1.5rem] group-hover:scale-110 shadow-inner`}>
                {item.icon}
              </div>
              <button className="p-2 opacity-0 group-hover:opacity-100 bg-app-bg rounded-xl border border-border-main text-text-muted transition-all duration-300">
                <HiOutlineInformationCircle size={18} />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black text-text-main italic">{item.val}</h3>
                <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black mb-1">
                    <HiOutlineArrowTrendingUp size={14}/> +12%
                </div>
              </div>
            </div>

            {/* Performance Progress Bar */}
            <div className="mt-6 pt-6 border-t border-border-main/50 space-y-3">
                <div className="flex justify-between items-center text-[9px] font-black uppercase text-text-muted tracking-widest">
                    <span>Performance</span>
                    <span className={item.accent}>High</span>
                </div>
                <div className="h-1.5 w-full bg-app-bg rounded-full overflow-hidden border border-border-main/50 p-[2px]">
                    <div 
                        className={`h-full rounded-full ${item.accent.replace('text', 'bg')} transition-all duration-1000 w-[75%]`}
                    />
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Section with Hi2 Icons */}
      <div className="bg-app-card rounded-[3rem] border border-border-main p-8 relative overflow-hidden group">
         <div className="flex items-center justify-between mb-10">
            <div>
                <h3 className="text-lg font-black text-text-main uppercase italic tracking-tight">
                  {brand.name.replace(brand.highlight,"")}
                  <span className="text-brand-primary">{brand.highlight}</span>
                </h3>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-60">Last 30 days performance metrics</p>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase border border-brand-primary/20 px-4 py-2 rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                Export Data <HiOutlineArrowTopRightOnSquare size={16}/>
            </button>
         </div>
      </div>
    </div>
  );
};

export default StatsOverview;