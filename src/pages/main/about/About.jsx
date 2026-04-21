import React, { useState, useRef, useEffect } from 'react';
import brand from '../../../config/brand';
import { FiPlay, FiX, FiTrendingUp, FiGlobe, FiUsers, FiAward, FiMapPin } from 'react-icons/fi';

import safety from '../../../assets/images/Safety.webp'
import sastainability from '../../../assets/images/Sustainability.webp'
import efficiency from '../../../assets/images/efficency.jpeg'
import aboutvideo from '../../../assets/video/intelligencevideo.webm';


import AwardSection from './AwardSection';
import HistorySection from './History';
import LocationsSection from './Location';

const AboutPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  const missionTabs = [
    { title: "Safety", desc: `${brand.name} helps people get home safely each and every day with AI-powered safety programs used to train and protect employees.`, img: safety },
    { title: "Efficiency", desc: `${brand.name} helps organizations find inefficiencies with end-to-end visibility, so they can improve productivity and reduce costs.`, img: efficiency },
    { title: "Sustainability", desc: `${brand.name} helps monitor carbon emissions and track fuel and energy usage, saving customers millions of gallons of fuel annually.`, img: sastainability }
  ];

  // ── Mission Tab Switching Logic ──
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((prevTab) => (prevTab + 1) % missionTabs.length);
          return 0;
        }
        return prev + 1; // 40ms * 100 = 4 seconds
      });
    }, 40);
    return () => clearInterval(interval);
  }, [activeTab]);

  const navTabs = [
    { name: 'Our Mission', id: 'mission' },
    { name: 'Quick Facts', id: 'facts' },
    { name: 'Award Winning', id: 'awards' },
    { name: 'Our History', id: 'history' },
    { name: 'Our People', id: 'people' },
    { name: 'Our Offices', id: 'offices' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans scroll-smooth">
      
      {/* ── 1. Video Hero Section (Refined) ── */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <video autoPlay muted loop playsInline className="absolute z-10 w-full h-full object-cover opacity-60">
          <source src={aboutvideo} type="video/webm" />
        </video>
        <div className="absolute z-20 inset-0 bg-gradient-to-b from-transparent to-black/40" />

        <div className="relative z-30 text-center px-4 ">
          <h1 className="text-4xl md:text-5xl font-bold font-['Rajdhani'] text-white uppercase tracking-widest leading-none mb-6">
            DIGITIZING THE <br /> <span className="text-white">WORLD OF OPERATIONS</span>
          </h1>
          <button 
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-3 mx-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all px-6 py-3 rounded-full text-white text-xs font-bold tracking-[0.2em]"
          >
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <FiPlay fill="currentColor" size={10} />
            </div>
            DEMO VIDEO
          </button>
        </div>
      </section>

      {/* ── 2. Floating Navbar (Navy BG) ── */}
      <nav className="sticky top-0 z-[40] -mt-8 px-6">
        <div className="max-w-5xl mx-auto bg-brand-navy shadow-2xl rounded-xl border border-white/10 p-1 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px]">
            {navTabs.map((tab) => (
              <a 
                key={tab.id} 
                href={`#${tab.id}`}
                className="group relative flex-1 text-center py-4 text-[11.6px] font-black font-bold uppercase tracking-widest text-white hover:text-white transition-colors"
              >
                {tab.name}
                {/* Golden Line for Active Hover/Status */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 3. Our Mission Section (Samsara Style) ── */}
      <section id="mission" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
    {/* Golden Label */}
    <p className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">
      Our Mission
    </p>
    
    {/* Main Large Heading */}
    <h2 className="text-4xl md:text-6xl font-bold text-brand-navy max-w-5xl mx-auto leading-[1.1] mb-8 font-['Rajdhani']">
      Improve the safety, efficiency, and sustainability of the operations that power the global economy
    </h2>

    {/* 5-Line English Description */}
    <p className="text-gray-500 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-10">
      Each day, millions of people work to ensure our communities run smoothly. They are the frontlines 
      that build our cities, deliver our goods, and keep the water running and the lights on. 
      {brand.name} is working every day to make this essential work better, safer, and easier 
      for organizations managing complex physical operations and the people that power them. 
      Through our connected cloud, we empower the workers who are the backbone of our global society.
    </p>

    {/* Learn More Button */}
    <button className="bg-brand-primary cursor-pointer hover:bg-brand-accent text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all  shadow-brand-primary/20 transform hover:-translate-y-1">
      Learn More
    </button>
  </div>

  {/* ── Yahan se aapka Auto-Switching Tab wala code start hoga (Pehle wala) ── */}
  <div className="grid grid-cols-3 gap-1 border-b border-gray-100 mb-12">
     {/* ... Tabs logic ... */}
  </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-3 gap-1 border-b border-gray-100 mb-12">
          {missionTabs.map((tab, idx) => (
            <button 
              key={idx} 
              onClick={() => { setActiveTab(idx); setProgress(0); }}
              className={`pb-4 text-left px-2 transition-all cursor-pointer ${activeTab === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <span className=" text-[23px] block mb-2 cursor-pointer">{tab.title}</span>
              <div className="h-1 bg-gray-100 w-full relative overflow-hidden">
                {activeTab === idx && (
                  <div className="absolute top-0 left-0 h-full bg-brand-primary transition-all ease-linear" style={{ width: `${progress}%` }} />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
          <div>
            <p className="text-xl text-gray-600 leading-relaxed">
              {missionTabs[activeTab].desc}
            </p>
            <button className="mt-8 bg-brand-navy text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-brand-primary transition-all shadow-lg cursor-pointer">
              Learn More
            </button>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={missionTabs[activeTab].img} 
              alt={missionTabs[activeTab].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>


      {/* Section: Quick Facts */}
    <section id="facts" className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16">
    
    {/* Left Side: Heading & Description */}
    <div className="md:w-1/3">
      <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">Quick facts</p>
      <h2 className="text-5xl font-semibold text-slate-900 mb-6 leading-tight">
       <span >
         <span  style={{color: brand.colors.gold}}> {brand.name}</span> in <br />a year
      </span>
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed">
        {brand.name} customers include the world's leading organizations across construction, 
        transportation and warehousing, field services, manufacturing, retail, logistics, 
        and the public sector.
      </p>
    </div>

    {/* Right Side: Stats Grid */}
    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
      
      {/* Stat 1 */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-5xl font-light text-gray mb-4">Tens of thousands</h3>
        <p className="text-gray-600 text-xl">of customers globally rely on {brand.name}</p>
      </div>

      {/* Stat 2 */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-5xl font-light text-gray mb-4">25 trillion</h3>
        <p className="text-gray-600 text-xl">data points processed</p>
      </div>

      {/* Stat 3 */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-5xl font-light text-gray mb-4">340 million</h3>
        <p className="text-gray-600 text-xl">workflows digitized</p>
      </div>

      {/* Stat 4 */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-5xl font-light text-gray mb-4">Billions</h3>
        <p className="text-gray-600 text-xl">of pounds of CO2 reduced</p>
      </div>

    </div>
  </div>
</section>

     


     <AwardSection />
     <HistorySection />
     <LocationsSection />


      {/* Video Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 z-[1010] text-white bg-white/10 p-2 rounded-full hover:bg-brand-primary">
              <FiX size={20} />
            </button>
            <video autoPlay controls className="w-full h-full">
              <source src={aboutvideo} type="video/webm" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;