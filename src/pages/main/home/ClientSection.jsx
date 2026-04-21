import React, { useState, useEffect, useRef } from 'react';

const allClients = [
  { name: "Engro Corporation", short: "ENGRO", icon: "🏭" },
  { name: "Lucky Cement", short: "LUCKY", icon: "🏗️" },
  { name: "Pakistan Steel", short: "PSTEEL", icon: "⚙️" },
  { name: "Nestle Pakistan", short: "NESTLE", icon: "🥛" },
  { name: "Unilever PK", short: "UL-PK", icon: "🧴" },
  { name: "PTC (Tobacco)", short: "PKTOB", icon: "🚬" },
  { name: "Agha Steel", short: "AGHA", icon: "🔩" },
  { name: "Millat Tractors", short: "MTRAC", icon: "🚜" },
  { name: "Packages Ltd", short: "PKGS", icon: "📦" },
  { name: "Dawood Hercules", short: "DAWOD", icon: "🏢" },
];

// Split into two groups of 5
const group1 = allClients.slice(0, 5);
const group2 = allClients.slice(5, 10);

const ClientSlot = ({ client, isVisible, direction }) => {
  return (
    <div
      className="flex items-center gap-3 w-full transition-all duration-700 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0)'
          : direction === 'in'
          ? 'translateX(-60px)'
          : 'translateX(60px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        position: isVisible ? 'relative' : 'absolute',
      }}
    >
      <span className="text-2xl">{client.icon}</span>
      <div>
        <div className="text-[9px] font-black tracking-[0.25em] text-[#C9971E] uppercase">{client.short}</div>
        <div className="text-sm font-bold text-[#0A1628] font-['Rajdhani'] uppercase">{client.name}</div>
      </div>
    </div>
  );
};

const ClientSection = () => {
  const [activeGroup, setActiveGroup] = useState(1); // 1 or 2
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveGroup(prev => prev === 1 ? 2 : 1);
        setIsTransitioning(false);
      }, 700);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentGroup = activeGroup === 1 ? group1 : group2;
  const count = allClients.length;

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-b border-[#E2E8F0]">
      {/* Decorative lines */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A1628]/5 border border-[#0A1628]/10 text-[10px] font-black tracking-[0.3em] text-[#0A1628] uppercase mb-4">
            Trusted Partners
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] font-['Rajdhani'] uppercase tracking-tighter">
            Companies Jo Hampar <span className="text-[#C9971E]">Bharosa Karti Hain</span>
          </h2>
          <p className="text-[#64748B] mt-3 text-sm">
            Pakistan ki top {count} companies hamare logistics network par rely karti hain
          </p>
        </div>

        {/* Client Display Area — centered, with side space */}
        <div className="max-w-4xl mx-auto">
          {/* Counter bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-[10px] font-black tracking-widest text-[#64748B] uppercase">
              Showing {activeGroup === 1 ? '1–5' : '6–10'} of {count}
            </div>
            {/* Dot indicators */}
            <div className="flex gap-2">
              {[1, 2].map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeGroup === g ? 24 : 8,
                    height: 8,
                    background: activeGroup === g ? '#C9971E' : '#E2E8F0',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Grid of 5 clients */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative min-h-[80px]">
            {currentGroup.map((client, i) => (
              <div
                key={client.name}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#C9971E]/50 hover:bg-[#C9971E]/5 transition-all duration-500 group"
                style={{
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning
                    ? 'translateX(40px)'
                    : 'translateX(0)',
                  transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms`,
                }}
              >
                <span className="text-3xl mb-2">{client.icon}</span>
                <div className="text-[8px] font-black tracking-[0.2em] text-[#C9971E] uppercase mb-1">{client.short}</div>
                <div className="text-[11px] font-bold text-[#0A1628] text-center font-['Rajdhani'] uppercase leading-tight">
                  {client.name}
                </div>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "Years Experience", value: "12+" },
              { label: "Satisfied Clients", value: "1,240+" },
              { label: "On-Time Delivery", value: "98%" },
              { label: "Cities Covered", value: "45+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-black text-[#C9971E] font-['Rajdhani']">{item.value}</div>
                <div className="text-[9px] font-bold tracking-widest text-[#64748B] uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
