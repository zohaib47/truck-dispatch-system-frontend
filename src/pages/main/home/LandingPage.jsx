import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTruck, FiUsers, FiPackage, FiTrendingUp, FiArrowRight, FiPhone } from "react-icons/fi";

import truckvideo from '../../../assets/video/video1.mp4';

import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import RouteMap from './RouteMap';
import ServicesSection from './Services';
import ClientsSection from './ClientSection';
import IntelligenceSection from './IntelligenceSection';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [statsData, setStatsData] = useState({ trucks: 0, drivers: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const fetchLiveStats = async () => {
  //     try {
  //       const truckRes = await axios.get('http://localhost:5000/api/truck/count');
  //       const driverRes = await axios.get('http://localhost:5000/api/driver/count');
  //       setStatsData({ trucks: truckRes.data.count, drivers: driverRes.data.count });
  //     } catch (err) {
  //       console.error("Backend connection error:", err);
  //     }
  //   };
  //   fetchLiveStats();
  // }, []);

  const stats = [
    { id: 1, label: "Total Trucks", value: statsData.trucks || "28", icon: <FiTruck />, color: "text-[#C9971E]", bg: "bg-[#C9971E]/10", change: "↑ 2 Is Month Add" },
    { id: 2, label: "Total Drivers", value: statsData.drivers || "34", icon: <FiUsers />, color: "text-blue-400", bg: "bg-blue-400/10", change: "↑ 5 Naye Drivers" },
    { id: 3, label: "Happy Clients", value: "1,240", icon: <FiTrendingUp />, color: "text-emerald-400", bg: "bg-emerald-400/10", change: "↑ 98% Satisfaction" },
    { id: 4, label: "Deliveries", value: "8,500", icon: <FiPackage />, color: "text-amber-500", bg: "bg-amber-500/10", change: "🏆 Record High" },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4FF] text-[#0F172A] font-sans">

      {/* ────────────────────────────────────────────────
          VIDEO HERO — h-screen so it goes BEHIND navbar
          Your separate Navbar component sits above this
          with position:fixed, so the video fills 100vh
          including the navbar area automatically.
      ──────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">

        {/* Video — fills entire screen top to bottom */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source src={truckvideo} type="video/mp4" />
        </video>

        {/* Gradient overlay — heavy on left for text, lighter on right */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.20) 100%)',
          }}
        />

        {/* ── LEFT-ALIGNED CONTENT ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-14 pt-20">
          <div className="max-w-xl">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-[0.3em] text-[#C9971E] uppercase mb-7">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Pakistan's Number 1 Network
            </div>

            {/* Heading — pure white with soft glow */}
            <h1
              className="text-5xl md:text-[72px] font-bold font-['Rajdhani'] leading-[0.95] tracking-tighter mb-6 uppercase"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.4)' }}
            >
              <span className="text-white">Future of</span>
              <br />
              <span
                style={{
                  color: '#C9971E',
                  textShadow: '0 0 50px rgba(201,151,30,0.6)',
                }}
              >
                Logistics
              </span>
              <br />
              <span
                className="text-white"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.25)' }}
              >
                Management
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="text-sm md:text-base leading-relaxed mb-9"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                fontWeight: 500,
              }}
            >
              FleetPro ke saath apne business ko digital banayein. Real-time tracking,
              dedicated trucks aur 98% on-time delivery — sirf aapke liye.
            </p>

            {/* ── TWO BUTTONS ── */}
            <div className="flex flex-wrap gap-4">

              {/* Primary: See Our Services */}
              <button
                className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 active:scale-95"
                style={{
                  background: '#C9971E',
                  color: '#fff',
                  boxShadow: '0 8px 30px rgba(201,151,30,0.50)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E8B830';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,151,30,0.65)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C9971E';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,151,30,0.50)';
                }}
              >
                <FiTruck size={16} />
                See Our Services
                <FiArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              {/* Secondary: Contact Us */}
              <button
                className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold tracking-widest transition-all duration-300 hover:-translate-y-1 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  color: '#fff',
                  backdropFilter: 'blur(14px)',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')
                }
              >
                <FiPhone size={15} />
                Contact Us
              </button>

            </div>

            {/* Mini stats strip */}
            <div className="flex items-center gap-7 mt-10">
              {[
                { val: '28+', label: 'Trucks' },
                { val: '98%', label: 'On-Time' },
                { val: '1,240+', label: 'Clients' },
              ].map((item, i) => (
                <React.Fragment key={item.label}>
                  <div>
                    <div
                      className="text-2xl font-black font-['Rajdhani']"
                      style={{ color: '#C9971E' }}
                    >
                      {item.val}
                    </div>
                    <div className="text-[9px] font-bold tracking-widest text-white/50 uppercase">
                      {item.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="w-px h-8 bg-white/15" />
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats Cards (overlapping hero bottom) ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group p-8 bg-white/95 backdrop-blur-sm border border-white rounded-[2.5rem] shadow-2xl hover:border-[#C9971E]/50 transition-all duration-300"
            >
              <div
                className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6`}
              >
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold font-['Rajdhani'] mb-1 text-[#0A1628]">
                {stat.value}
              </h3>
              <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mb-4">
                {stat.label}
              </p>
              <div className="text-[9px] font-black text-emerald-600 bg-emerald-600/10 px-3 py-1 rounded-full w-fit uppercase">
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
