import React from 'react';
import { FiTruck, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
// import { brand } from '../../config/brand'; 
// Agar brand context se aa raha hai toh: const { brand } = useBrand();
import brand from "../../config/brand"

const Footer = () => {
  return (
    // yahan 'bg-[#001529]' wahi primary color hai jo humne baqi pages pe use kiya
    <footer className="bg-[#001529] text-white pt-16 pb-8 px-10 relative overflow-hidden">
      {/* Decorative background element for premium feel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC107] opacity-5 rounded-full -mr-32 -mt-32"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/5 pb-12 relative z-10">
        
        {/* --- 1. Company Info (Brand Name) --- */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            {/* yahan primary color (Gold) use ho raha hai */}
            <FiTruck className="text-[#FFC107]" size={24} />
            <span className="text-2xl font-black italic uppercase tracking-tighter">
              {brand.name.split(' ')[0]}
              <span className="text-[#FFC107]">{brand.name.split(' ')[1] || ""}</span>
            </span>
          </div>
          <p className="text-white/60 text-[13px] leading-relaxed max-w-xs font-medium">
            {brand.name} is leading the digital transformation in truck dispatching. 
            We provide smart logistics solutions for local and international corporate clients.
          </p>
        </div>

        {/* --- 2. Quick Links --- */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFC107]">Navigation</h4>
          <ul className="text-white/70 text-sm space-y-3 font-bold uppercase italic">
            <li>
                <a href="/home" className="hover:text-[#FFC107] transition-all flex items-center gap-2 group">
                   <span className="w-0 group-hover:w-2 h-[2px] bg-[#FFC107] transition-all"></span> Home
                </a>
            </li>
            <li>
                <a href="/about" className="hover:text-[#FFC107] transition-all flex items-center gap-2 group">
                   <span className="w-0 group-hover:w-2 h-[2px] bg-[#FFC107] transition-all"></span> Our Mission
                </a>
            </li>
            <li>
                <a href="/contact" className="hover:text-[#FFC107] transition-all flex items-center gap-2 group">
                   <span className="w-0 group-hover:w-2 h-[2px] bg-[#FFC107] transition-all"></span> Support
                </a>
            </li>
          </ul>
        </div>

        {/* --- 3. Contact Info --- */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFC107]">Direct Contact</h4>
          <div className="space-y-4 text-white/80 text-sm font-medium">
            <p className="flex items-center gap-3 hover:text-white transition-colors">
                <FiMail className="text-[#FFC107]" /> info@{brand.name.toLowerCase().replace(' ', '')}.com
            </p>
            <p className="flex items-center gap-3 hover:text-white transition-colors">
                <FiPhone className="text-[#FFC107]" /> +92 300 000 0000
            </p>
            <p className="flex items-center gap-3 leading-tight">
                <FiMapPin className="text-[#FFC107] shrink-0" /> 
                Main Industrial Complex, <br/>Phase 2, Karachi, Pakistan
            </p>
          </div>
        </div>
      </div>

      {/* --- Bottom Copyright --- */}
      <div className="mt-10 text-center">
        <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} {brand.name} Logistics. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;