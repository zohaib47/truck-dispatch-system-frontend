import React, { useState, useEffect } from 'react';
import { LuTruck, LuUsers, LuPackage, LuDollarSign, LuTrendingUp, LuInfo, LuExternalLink, LuLoader2 } from "react-icons/lu";
import Modal from '../ui/Modal'; 
import brand from '../../config/brand';
import API from '../../config/api'; 

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
        // Dono APIs ko ek saath call kar rahe hain performance ke liye
        const [loadsRes, driversRes] = await Promise.all([
          API.get('/load/all'),
          API.get('/driver')
        ]);

        const loads = loadsRes.data || [];
        const drivers = driversRes.data || [];

        // 1. Active Loads (Jo assigned ya in-transit hon)
        const active = loads.filter(l => l.status === 'assigned' || l.status === 'in-transit').length;
        
        // 2. Loads Pending (Jo abhi tak dispatch nahi huye)
        const pending = loads.filter(l => l.status === 'pending').length;

        // 3. Drivers Online (Maan lete hain status 'available' ya 'on-duty' online hai)
        const online = drivers.filter(d => d.status === 'available' || d.status === 'on-duty').length;

        // 4. Total Revenue (Sirf 'delivered' loads ki price calculate karein)
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
      icon: <LuTruck size={24} />,
      detail: `${dynamicStats.activeLoads} currently on the move`,
    },
    { 
      id: 'drivers_online',
      label: 'Drivers Online', 
      val: dynamicStats.driversOnline, 
      accent: 'text-emerald-500', 
      bg: 'bg-emerald-500/10', 
      icon: <LuUsers size={24} />,
      detail: "Ready for assignment",
    },
    { 
      id: 'loads_ready',
      label: 'Pending Loads', 
      val: dynamicStats.loadsPending, 
      accent: 'text-brand-primary', 
      bg: 'bg-brand-primary/10', 
      icon: <LuPackage size={24} />,
      detail: "Awaiting Dispatch",
    },
    { 
      id: 'monthly_revenue',
      label: 'Total Revenue', 
      val: `$${(dynamicStats.totalRevenue / 1000).toFixed(1)}k`, 
      accent: 'text-purple-500', 
      bg: 'bg-purple-500/10', 
      icon: <LuDollarSign size={24} />,
      detail: "Calculated from delivered loads",
    },
  ];

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <LuLoader2 className="animate-spin text-brand-primary" size={40} />
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section... wahi rahega jo aapka tha */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedStat(item)}
            className="bg-app-card p-6 rounded-[2.5rem] border border-border-main shadow-sm hover:shadow-2xl hover:border-brand-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            {/* Card Content... wahi UI use karein jo aapne banaya hai */}
            {/* val ki jagah ab {item.val} dynamic aayega */}
            <div className="flex justify-between items-start mb-6">
              <div className={`${item.bg} ${item.accent} w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rounded-[1.5rem] group-hover:scale-110 shadow-inner`}>
                {item.icon}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</p>
              <h3 className="text-3xl font-black text-text-main italic">{item.val}</h3>
            </div>
            
            {/* Progress bar and other UI components */}
          </div>
        ))}
      </div>

      {/* Analytics Chart aur Modal... wahi rahega */}
    </div>
  );
};

export default StatsOverview;