import React, { useState } from 'react';
import { FiTruck, FiMapPin, FiPackage, FiShield, FiClock, FiBarChart2 } from 'react-icons/fi';
import brand from '../../../config/brand'

const services = [
  {
    id: 1,
    icon: <FiTruck size={28} />,
    title: "Full Truckload (FTL)",
    subtitle: "Dedicated Freight",
    desc: "An entire truck dedicated exclusively to your goods. From Karachi to Lahore, Islamabad to Peshawar — direct delivery with no intermediate stops.",
    color: "#C9971E",
    bg: "from-[#C9971E]/20 to-[#C9971E]/5",
    border: "border-[#C9971E]/30",
    tag: "Most Popular",
  },
  {
    id: 2,
    icon: <FiPackage size={28} />,
    title: "Less Than Load (LTL)",
    subtitle: "Shared Logistics",
    desc: "Small shipment? No problem. Only pay for the space you use. A cost-effective and equally fast logistics solution.",
    color: "#60A5FA",
    bg: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/30",
    tag: "Budget Friendly",
  },
  {
    id: 3,
    icon: <FiMapPin size={28} />,
    title: "Real-Time GPS Tracking",
    subtitle: "Live Monitoring",
    desc: "Track your cargo's location every second. Live updates via mobile app or dashboard — 24/7 visibility guaranteed.",
    color: "#34D399",
    bg: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    tag: "Tech-Powered",
  },
  {
    id: 4,
    icon: <FiShield size={28} />,
    title: "Cargo Insurance",
    subtitle: "Full Protection",
    desc: "Your cargo is safe with us. Insurance coverage for every shipment. Complete reimbursement in case of any damage or loss.",
    color: "#A78BFA",
    bg: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/30",
    tag: "Zero Risk",
  },
  {
    id: 5,
    icon: <FiClock size={28} />,
    title: "Express Delivery",
    subtitle: "Same Day / Next Day",
    desc: "Urgent shipment? Our express service ensures your goods arrive on time using priority handling and the fastest possible routes.",
    color: "#FB923C",
    bg: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/30",
    tag: "Ultra Fast",
  },
  {
    id: 6,
    icon: <FiBarChart2 size={28} />,
    title: "Fleet Analytics Dashboard",
    subtitle: "Business Intelligence",
    desc: "Complete business insights — delivery times, fuel costs, and driver performance. A powerful dashboard for data-driven decisions.",
    color: "#F472B6",
    bg: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30",
    tag: "Smart Tech",
  }

];

const Services = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-28 bg-[#F0F4FF] relative overflow-hidden" id="services-section">
      {/* Decorative bg shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9971E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9971E]/10 border border-[#C9971E]/30 text-[10px] font-black tracking-[0.3em] text-[#C9971E] uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#C9971E] rounded-full animate-pulse"></span>
            What We Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A1628] font-['Rajdhani'] uppercase tracking-tighter">
            Our <span className="text-[#C9971E]"> Services</span>
          </h2>
          <p className="text-[#64748B] mt-4 text-sm max-w-xl mx-auto leading-relaxed">
The most reliable and modern logistics network in Pakistan with {brand.name}. Every service is professionally managed.          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              onMouseEnter={() => setHovered(svc.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative p-8 rounded-[2rem] border bg-gradient-to-br ${svc.bg} ${svc.border} transition-all duration-500 cursor-pointer overflow-hidden group`}
              style={{
                transform: hovered === svc.id ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === svc.id ? `0 20px 60px ${svc.color}22` : '0 2px 20px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(12px)',
                background: hovered === svc.id
                  ? `linear-gradient(135deg, ${svc.color}18, ${svc.color}06)`
                  : undefined,
              }}
            >
              {/* Tag */}
              <div className="absolute top-6 right-6">
                <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ color: svc.color, borderColor: `${svc.color}44`, background: `${svc.color}12` }}>
                  {svc.tag}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{ background: `${svc.color}18`, color: svc.color }}>
                {svc.icon}
              </div>

              {/* Text */}
              <div className="text-[9px] font-black tracking-[0.25em] uppercase mb-2"
                style={{ color: svc.color }}>{svc.subtitle}</div>
              <h3 className="text-xl font-bold font-['Rajdhani'] text-[#0A1628] mb-3 leading-tight uppercase tracking-tight">
                {svc.title}
              </h3>
              <p className="text-[#64748B] text-xs leading-relaxed">{svc.desc}</p>

              {/* Bottom CTA */}
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                style={{ color: svc.color }}>
                Learn More <span className="text-base">→</span>
              </div>

              {/* Hover glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-[2rem] transition-all duration-500"
                style={{ background: hovered === svc.id ? svc.color : 'transparent' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
