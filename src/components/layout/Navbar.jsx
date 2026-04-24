import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTruck, FiMenu, FiX, FiLogOut, FiLogIn } from "react-icons/fi";
import brand from '../../config/brand'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Initializing user state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ── Scroll Listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Session & Storage Sync ──
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('user');
      const loginTimestamp = localStorage.getItem('loginTimestamp');

      if (storedUser && loginTimestamp) {
        const currentTime = new Date().getTime();
        const twelveHours = 12 * 60 * 60 * 1000;
        
        // Auto-logout if session expired
        if (currentTime - loginTimestamp > twelveHours) {
          handleLogout();
        } else {
          const parsedUser = JSON.parse(storedUser);
          if (JSON.stringify(user) !== JSON.stringify(parsedUser)) {
            setUser(parsedUser);
          }
        }
      } else {
        // Agar dusre device/browser mein hain jahan storage empty hai
        if (user) setUser(null);
      }
    };

    window.addEventListener('storage', checkSession); // Sync across tabs
    const interval = setInterval(checkSession, 60000); // Check every minute
    
    return () => {
      window.removeEventListener('storage', checkSession);
      clearInterval(interval);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTimestamp');
    setUser(null);
    navigate('/login');
  };

  const handleLogoClick = () => {
    user ? navigate('/home') : navigate('/');
  };

  // ── UI Styles ──
  const logoPrefix = brand.name.slice(0, brand.name.length - brand.highlight.length);
  const logoSuffix = brand.highlight;
  const linkColor = scrolled ? '#64748B' : 'rgba(255,255,255,0.85)';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled 
          ? 'rgba(255,255,255,0.98)' 
          : 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E2E8F0' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* ── Logo ── */}
        <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105"
            style={{ 
              background: scrolled ? brand.colors.dark : 'rgba(255,255,255,0.2)',
              backdropFilter: !scrolled ? 'blur(10px)' : 'none' 
            }}
          >
            <FiTruck size={20} color={scrolled ? '#fff' : brand.colors.gold} />
          </div>
          <span
            className="text-2xl font-black italic uppercase tracking-tighter font-['Rajdhani']"
            style={{ color: scrolled ? brand.colors.dark : '#ffffff' }}
          >
            {logoPrefix}<span style={{ color: brand.colors.gold }}>{logoSuffix}</span>
          </span>
        </div>

        {/* ── Desktop Menu ── */}
        <div className="hidden md:flex flex-1 items-center justify-between font-bold text-[10px] uppercase tracking-[0.2em]">
          
          <div className="flex items-center gap-10 mx-auto">
            {['Home', 'About', 'Contact'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="transition-colors duration-300 hover:text-[#C9971E]"
                style={{ color: linkColor }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* ── Auth Toggle Logic ── */}
          {user ? (
            <div className="flex items-center gap-4 border-l pl-6 transition-all" 
                 style={{ borderColor: scrolled ? '#E2E8F0' : 'rgba(255,255,255,0.2)' }}>
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-black italic" style={{ color: scrolled ? brand.colors.dark : '#fff' }}>
                  HI, {user.name.split(' ')[0]}
                </span>
                <span className="text-[7px] tracking-widest text-[#C9971E]">ONLINE</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50/10 transition-all"
              >
                <FiLogOut size={14} /> LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-2.5 rounded-full font-black tracking-[0.15em] shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ 
                background: scrolled ? brand.colors.dark : brand.colors.gold,
                color: '#fff' 
              }}
            >
              <FiLogIn size={14} /> LOGIN
            </Link>
          )}
        </div>

        {/* ── Mobile Menu Toggle ── */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors"
          style={{ color: scrolled ? brand.colors.dark : '#fff' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* ── Mobile Sidebar/Menu ── */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col p-8 gap-6 animate-in fade-in slide-in-from-top-4">
          {['Home', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="text-[#1A202C] text-sm tracking-widest border-b pb-2"
            >
              {item}
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col gap-4 pt-4">
              <span className="text-[#C9971E]">USER: {user.name}</span>
              <button onClick={handleLogout} className="text-red-500 flex items-center gap-2">
                <FiLogOut /> LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-[#C9971E] font-black">
              LOGIN TO ACCOUNT
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;