import React from 'react';
import { FiTruck, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12">
        
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FiTruck className="text-orange-500" size={24} />
            <span className="text-xl font-black italic uppercase tracking-tighter">Fleet<span className="text-orange-500">Pro</span></span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Leading the digital transformation in truck dispatching. We provide smart logistics solutions for local and international corporate clients.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Navigation</h4>
          <ul className="text-slate-300 text-sm space-y-2 font-medium">
            <li><a href="/home" className="hover:text-white transition-colors">Operations Home</a></li>
            <li><a href="/about" className="hover:text-white transition-colors">Our Mission</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Support Center</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">Contact Us</h4>
          <div className="space-y-3 text-slate-300 text-sm">
            <p className="flex items-center gap-3"><FiMail className="text-orange-500" /> support@fleetpro.com</p>
            <p className="flex items-center gap-3"><FiPhone className="text-orange-500" /> +92 300 1234567</p>
            <p className="flex items-center gap-3"><FiMapPin className="text-orange-500" /> Industrial Area, Phase 2, Karachi</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em]">
          © 2026 FleetPro Logistics Systems. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;