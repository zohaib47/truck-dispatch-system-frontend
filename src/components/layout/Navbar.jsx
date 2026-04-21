import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTruck, FiMenu, FiX, FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";
import brand from '../../config/brand';   

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);         
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkSession = () => {
      const storedUser      = localStorage.getItem('user');
      const loginTimestamp  = localStorage.getItem('loginTimestamp');

      if (storedUser && loginTimestamp) {
        const currentTime  = new Date().getTime();
        const twelveHours  = 12 * 60 * 60 * 1000;
        if (currentTime - loginTimestamp > twelveHours) {
          handleLogout();
        } else {
          const parsedUser = JSON.parse(storedUser);
          if (JSON.stringify(user) !== JSON.stringify(parsedUser)) setUser(parsedUser);
        }
      } else if (!storedUser && user) {
        setUser(null);
      }
    };

    checkSession();
    window.addEventListener('storage', checkSession);
    const interval = setInterval(checkSession, 60000);
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
    if (user) navigate('/home');
    else navigate('/');
  };

  // ── Logo text — "Trax" white/dark + "io" gold ──
  const logoPrefix   = brand.name.slice(0, brand.name.length - brand.highlight.length);
  const logoSuffix   = brand.highlight;

  // Nav link color based on scroll
  const linkColor    = scrolled ? '#64748B' : 'rgba(255,255,255,0.80)';
  const linkHover    = brand.colors.gold;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 transition-all duration-300"
      style={{
        // Background logic change karein
  background: scrolled 
    ? 'rgba(255,255,255,0.95)' 
    : 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
  backdropFilter: scrolled ? 'blur(16px)' : 'none',
  // ... rest of the code
        borderBottom : scrolled ? '1px solid #E2E8F0' : 'none',
        boxShadow    : scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* ── Logo ── */}
        <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300"
            style={{ background: scrolled ? brand.colors.dark : 'rgba(255,255,255,0.15)', backdropFilter: !scrolled ? 'blur(10px)' : 'none' }}
          >
            <FiTruck size={18} color={scrolled ? '#fff' : brand.colors.gold} />
          </div>
          <span
            className="text-xl font-black italic uppercase tracking-tighter font-['Rajdhani'] transition-colors duration-300"
            style={{ color: scrolled ? brand.colors.dark : '#ffffff' }}
          >
            {logoPrefix}
            <span style={{ color: brand.colors.gold }}>{logoSuffix}</span>
          </span>
        </div>

        {/* ── Desktop Menu ── */}
        <div className="hidden md:flex flex-1 items-center justify-between font-bold text-[10px] uppercase tracking-[0.2em]">

          {/* Nav Links — centered */}
          <div className="flex items-center gap-8 mx-auto">
          {[
            { label: 'Home',        to: '/'       },
            { label: 'About', to: '/about-page'  },
            { label: 'Contact', to: '/contact'},
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors duration-200"
              style={{ color: linkColor }}
              onMouseEnter={e => e.currentTarget.style.color = linkHover}
              onMouseLeave={e => e.currentTarget.style.color = linkColor}
            >
              {link.label}
            </Link>
          ))}
          </div>

          {/* Auth area */}
          {user ? (
            <div
              className="flex items-center gap-4 ml-4 pl-4"
              style={{ borderLeft: `1px solid ${scrolled ? '#E2E8F0' : 'rgba(255,255,255,0.2)'}` }}
            >
              <div className="flex flex-col items-end">
                <span
                  className="text-[11px] font-black italic uppercase"
                  style={{ color: scrolled ? brand.colors.dark : '#ffffff' }}
                >
                  Hi, {user.name}
                </span>
                <span className="text-[8px] font-bold leading-none" style={{ color: brand.colors.gold }}>
                  ACTIVE SESSION
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-lg transition-all text-red-400 hover:bg-red-500/10"
              >
                <FiLogOut size={13} /> LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              {localStorage.getItem('hadPreviousLogin') ? (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
                  style={{
                    background: scrolled ? brand.colors.dark : 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    backdropFilter: !scrolled ? 'blur(10px)' : 'none',
                    border: !scrolled ? '1px solid rgba(255,255,255,0.25)' : 'none',
                  }}
                >
                  <FiLogIn size={13} /> LOGIN
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg transition-all hover:-translate-y-0.5"
                  style={{ background: brand.colors.gold, color: '#fff' }}
                >
                  <FiUserPlus size={13} /> CREATE ACCOUNT
                </Link>
              )}
            </div>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden transition-colors"
          style={{ color: scrolled ? brand.colors.dark : '#ffffff' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2E8F0] p-6 flex flex-col gap-4 font-bold text-[10px] uppercase tracking-widest shadow-2xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-[#0A1628] hover:text-[#C9971E]">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-[#64748B] hover:text-[#C9971E]">Fleet Stats</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-[#64748B] hover:text-[#C9971E]">Live Routes</Link>
          {user ? (
            <>
              <div className="py-2 border-t border-[#E2E8F0]" style={{ color: brand.colors.gold }}>
                USER: {user.name}
              </div>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="text-red-500 text-left flex items-center gap-2"
              >
                <FiLogOut size={13} /> LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} style={{ color: brand.colors.gold }}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
