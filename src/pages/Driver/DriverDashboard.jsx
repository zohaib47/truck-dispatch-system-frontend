import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RiTruckLine, RiMoonLine, RiSunLine, RiLogoutCircleRLine,
  RiNotification3Line, RiCheckDoubleLine, RiSteering2Line,
  RiCloseLine, RiSearchLine, RiMapPinUserLine, RiMapPin2Line,
  RiMoneyDollarCircleLine, RiWeightLine, RiTimeLine, RiPhoneLine,
  RiUserLine, RiInformationLine, RiBellFill, RiMapLine,
  RiNavigationLine, RiLoader4Line
} from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { getDriverTrips, updateTripStatus } from '../../services/api';

// ─────────────────────────────────────────────────────────────────
// Leaflet CSS inject karo
// ─────────────────────────────────────────────────────────────────
const injectLeafletCSS = () => {
  if (document.getElementById('leaflet-css')) return;
  const link  = document.createElement('link');
  link.id     = 'leaflet-css';
  link.rel    = 'stylesheet';
  link.href   = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);
};

// ─────────────────────────────────────────────────────────────────
// Nominatim geocoder — city name → {lat, lng}  (free, no API key)
// ─────────────────────────────────────────────────────────────────
const geocode = async (address) => {
  try {
    const q   = encodeURIComponent(address + ', Pakistan');
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const data = await res.json();
    if (data?.[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    return null;
  } catch { return null; }
};

// ─────────────────────────────────────────────────────────────────
// LiveMap — Leaflet map with pickup / dropoff / driver markers
// Bahar define — re-mount se bachne ke liye
// ─────────────────────────────────────────────────────────────────
const LiveMap = ({ pickup, dropoff, driverPos, isActive }) => {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);   // Leaflet map instance
  const markersRef   = useRef({});
  const [status, setStatus] = useState('loading'); // loading | ready | error

  // Map initialize
  const initMap = useCallback(async () => {
    if (!containerRef.current || !pickup || !dropoff) return;
    setStatus('loading');

    // Leaflet JS lazy-load
    if (!window.L) {
      await new Promise((res, rej) => {
        const s   = document.createElement('script');
        s.src     = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        s.onload  = res;
        s.onerror = rej;
        document.head.appendChild(s);
      }).catch(() => { setStatus('error'); return; });
    }

    const L = window.L;

    // Purana map hata do
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    markersRef.current = {};

    // Geocode
    const [pc, dc] = await Promise.all([geocode(pickup), geocode(dropoff)]);
    if (!pc || !dc) { setStatus('error'); return; }

    // Map banao — dark CartoDB tiles (free)
    const map = L.map(containerRef.current, { zoomControl: true, attributionControl: false });
    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

    // Icon factory
    const pinIcon = (color, emoji, sz = 38) => L.divIcon({
      html: `<div style="
        width:${sz}px;height:${sz}px;background:${color};
        border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 16px ${color}70;border:2px solid rgba(255,255,255,.25);">
        <span style="transform:rotate(45deg);font-size:${sz*.44}px;line-height:1">${emoji}</span>
      </div>`,
      className:'', iconSize:[sz,sz], iconAnchor:[sz/2,sz], popupAnchor:[0,-sz]
    });

    const truckIcon = L.divIcon({
      html: `
        <style>@keyframes pr{0%{box-shadow:0 0 0 0 rgba(59,130,246,.6)}70%{box-shadow:0 0 0 14px rgba(59,130,246,0)}100%{box-shadow:0 0 0 0 rgba(59,130,246,0)}}</style>
        <div style="width:46px;height:46px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);
          border-radius:50%;display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 20px rgba(59,130,246,.5);border:3px solid #fff;
          animation:pr 1.4s ease-in-out infinite;">
          <span style="font-size:22px">🚛</span>
        </div>`,
      className:'', iconSize:[46,46], iconAnchor:[23,23], popupAnchor:[0,-28]
    });

    // Markers
    const pm = L.marker([pc.lat, pc.lng], { icon: pinIcon('#22c55e','📦') })
      .addTo(map).bindPopup(`<b>📦 Pickup</b><br>${pickup}`);
    const dm = L.marker([dc.lat, dc.lng], { icon: pinIcon('#ef4444','🏁') })
      .addTo(map).bindPopup(`<b>🏁 Dropoff</b><br>${dropoff}`);

    const sp  = driverPos || pc;
    const trm = L.marker([sp.lat, sp.lng], { icon: truckIcon })
      .addTo(map).bindPopup('<b>🚛 Aap yahan hain</b>');

    // Dashed route line
    const line = L.polyline([[pc.lat,pc.lng],[dc.lat,dc.lng]],
      { color:'#3b82f6', weight:4, opacity:.65, dashArray:'12,8' }).addTo(map);

    markersRef.current = { pickup: pm, dropoff: dm, driver: trm, route: line,
      pickupCoords: pc, dropoffCoords: dc };

    // Fit bounds
    map.fitBounds(L.latLngBounds([[pc.lat,pc.lng],[dc.lat,dc.lng],[sp.lat,sp.lng]]),
      { padding:[55,55] });

    setStatus('ready');
  }, [pickup, dropoff]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    injectLeafletCSS();
    initMap();
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [initMap]);

  // Live driver position update — map reinit ke bina
  useEffect(() => {
    const { driver, route, dropoffCoords } = markersRef.current;
    if (!mapRef.current || !driver || !driverPos) return;
    driver.setLatLng([driverPos.lat, driverPos.lng]);
    if (route && dropoffCoords) {
      route.setLatLngs([[driverPos.lat, driverPos.lng],[dropoffCoords.lat, dropoffCoords.lng]]);
    }
  }, [driverPos]);

  return (
    <div className="relative rounded-[2rem] overflow-hidden border border-border-main shadow-2xl"
      style={{ height: 300 }}>
      <div ref={containerRef} style={{ width:'100%', height:'100%', background:'#0f172a' }} />

      {status === 'loading' && (
        <div className="absolute inset-0 bg-app-card/90 flex flex-col items-center justify-center gap-3 z-[400]">
          <RiLoader4Line className="text-brand-primary animate-spin" size={30} />
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Map load ho raha hai...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 bg-app-card/90 flex flex-col items-center justify-center gap-3 z-[400]">
          <RiMapLine className="text-red-400 opacity-60" size={32} />
          <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Location nahi mili</p>
          <p className="text-[9px] text-text-muted text-center px-10">Address check karein</p>
        </div>
      )}

      {status === 'ready' && isActive && (
        <div className="absolute top-3 left-3 z-[400] flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white">Live</span>
        </div>
      )}

      {status === 'ready' && (
        <div className="absolute bottom-3 right-3 z-[400] bg-black/70 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 space-y-1">
          {[['📦','Pickup'],['🏁','Dropoff'],['🚛','Aap']].map(([e,l]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="text-xs">{e}</span>
              <span className="text-[9px] font-black text-white uppercase tracking-widest">{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────────
const Toast = ({ message, onClose }) => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] animate-fade-in px-4">
    <div className="flex items-center gap-3 bg-brand-primary text-white px-6 py-4 rounded-2xl shadow-2xl shadow-brand-primary/40 border border-white/20 max-w-sm">
      <RiBellFill size={18} className="animate-bounce shrink-0" />
      <p className="text-sm font-black uppercase tracking-widest leading-snug">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0">
        <RiCloseLine size={18} />
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────
// Trip Details Modal (map preview included)
// ─────────────────────────────────────────────────────────────────
const TripDetailsModal = ({ trip, onClose, onAccept, accepting }) => {
  if (!trip) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-app-card w-full max-w-md rounded-[2.5rem] border border-border-main shadow-2xl overflow-hidden animate-fade-in max-h-[90vh] overflow-y-auto">

        <div className="bg-brand-primary/10 border-b border-border-main px-8 py-6 flex justify-between items-center sticky top-0 bg-app-card z-10">
          <div>
            <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-0.5">Trip Details</p>
            <h3 className="text-xl font-black italic uppercase">{trip.tripCustomId}</h3>
          </div>
          <button onClick={onClose} className="p-2.5 bg-app-bg border border-border-main rounded-xl text-text-muted hover:text-text-main cursor-pointer transition-all">
            <RiCloseLine size={18} />
          </button>
        </div>

        {/* Map preview */}
        <div className="p-5 pb-0">
          <LiveMap pickup={trip.pickup} dropoff={trip.dropoff} driverPos={null} isActive={false} />
        </div>

        <div className="p-5 space-y-2.5">
          {[
            { icon: <RiMapPin2Line size={13}/>,           label:'Pickup',    value: trip.pickup },
            { icon: <RiMapPinUserLine size={13}/>,        label:'Dropoff',   value: trip.dropoff },
            { icon: <RiMoneyDollarCircleLine size={13}/>, label:'Fare',      value:`PKR ${trip.fare}` },
            { icon: <RiWeightLine size={13}/>,            label:'Cargo',     value: trip.cargoType    || 'N/A' },
            { icon: <RiTimeLine size={13}/>,              label:'Est. Time', value: trip.estimatedTime|| 'N/A' },
            { icon: <RiUserLine size={13}/>,              label:'Customer',  value: trip.customerName || 'N/A' },
            { icon: <RiPhoneLine size={13}/>,             label:'Contact',   value: trip.customerPhone|| 'N/A' },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between px-4 py-2.5 bg-app-bg rounded-xl border border-border-main">
              <div className="flex items-center gap-2 text-text-muted text-[9px] font-black uppercase tracking-widest">{r.icon}{r.label}</div>
              <div className="text-sm font-black text-text-main italic">{r.value}</div>
            </div>
          ))}
        </div>

        <div className="px-5 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-border-main text-text-muted font-black text-[10px] uppercase tracking-widest hover:bg-app-bg transition-all cursor-pointer">Close</button>
          <button onClick={onAccept} disabled={accepting}
            className="flex-[2] py-4 rounded-2xl bg-brand-primary text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-primary/30 hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 cursor-pointer">
            {accepting ? 'Accept ho raha hai...' : '✓ Accept Trip'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────────────────────────
const DriverDashboard = () => {
  const navigate  = useNavigate();
  const [isDark,    setIsDark]    = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [trips,     setTrips]     = useState({ current: null, next: null });
  const [toast,     setToast]     = useState(null);
  const [accepting, setAccepting] = useState(false);
  const [updating,  setUpdating]  = useState(false);
  const [driverPos, setDriverPos] = useState(null);  // {lat,lng} from GPS

  const prevNextTripId = useRef(null);
  const geoWatchRef    = useRef(null);
  const driverData     = JSON.parse(localStorage.getItem('user') || '{}');
  const driverId       = driverData?._id;

  const statusFlow = {
    'accepted':   { label:'Arrived at Pickup',  next:'arrived',    color:'bg-brand-primary', progress:20  },
    'arrived':    { label:'Start Loading',       next:'loaded',     color:'bg-amber-500',     progress:40  },
    'loaded':     { label:'Start Journey',       next:'in-transit', color:'bg-brand-accent',  progress:60  },
    'in-transit': { label:'Reached Destination', next:'delivered',  color:'bg-indigo-500',    progress:85  },
    'delivered':  { label:'Trip Completed ✓',    next:null,         color:'bg-emerald-500',   progress:100 },
  };

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 5000);
  }, []);

  const sendBrowserNotif = useCallback((title, body) => {
    if (!('Notification' in window)) return;
    const send = () => new Notification(title, { body, icon:'/favicon.ico' });
    if (Notification.permission === 'granted') send();
    else if (Notification.permission !== 'denied') Notification.requestPermission().then(p => p==='granted' && send());
  }, []);

  // GPS watch
  useEffect(() => {
    if (!navigator.geolocation) return;
    geoWatchRef.current = navigator.geolocation.watchPosition(
      pos => setDriverPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => console.warn('GPS:', err),
      { enableHighAccuracy: true, maximumAge: 8000, timeout: 15000 }
    );
    return () => { if (geoWatchRef.current) navigator.geolocation.clearWatch(geoWatchRef.current); };
  }, []);

  const fetchDashboardData = useCallback(async () => {
    if (!driverId) return;
    try {
      const res      = await getDriverTrips(driverId);
      const nCurrent = res.data.ongoingTrip || null;
      const nNext    = res.data.pendingTrip  || null;
      setTrips({ current: nCurrent, next: nNext });

      if (nNext && nNext._id !== prevNextTripId.current && prevNextTripId.current !== null) {
        showToast(`🚛 Naya load assign hua: ${nNext.pickup} → ${nNext.dropoff}`);
        sendBrowserNotif('FleetPro — Naya Load!', `${nNext.pickup} se ${nNext.dropoff}. Fare: PKR ${nNext.fare}`);
      }
      prevNextTripId.current = nNext?._id || null;
    } catch(e) { console.error(e); }
  }, [driverId, showToast, sendBrowserNotif]);

  useEffect(() => {
    const init = async () => {
      if (!driverId) { setLoading(false); return; }
      try {
        const res  = await getDriverTrips(driverId);
        const nNext = res.data.pendingTrip || null;
        prevNextTripId.current = nNext?._id || null;
        setTrips({ current: res.data.ongoingTrip || null, next: nNext });
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    };
    init();
    if ('Notification' in window && Notification.permission==='default') Notification.requestPermission();
    const iv = setInterval(fetchDashboardData, 15000);
    return () => clearInterval(iv);
  }, [driverId, fetchDashboardData]);

  const handleAcceptTrip = async () => {
    if (!trips.next || accepting) return;
    setAccepting(true);
    try {
      await updateTripStatus(trips.next._id, 'accepted');
      showToast('✅ Trip accept — admin ko notify kar diya');
      setShowModal(false);
      fetchDashboardData();
    } catch { showToast('❌ Accept nahi hua, dobara try karo'); }
    finally { setAccepting(false); }
  };

  const handleStatusUpdate = async (tripId, currentStatus) => {
    const next = statusFlow[currentStatus]?.next;
    if (!next || updating) return;
    setUpdating(true);
    try { await updateTripStatus(tripId, next); fetchDashboardData(); }
    catch { showToast('❌ Status update nahi hua'); }
    finally { setUpdating(false); }
  };

  const handleLogout = () => { localStorage.clear(); navigate('/'); };

  const curInfo    = trips.current ? (statusFlow[trips.current.status] || statusFlow['accepted']) : null;
  const activeTrip = trips.current || trips.next;

  return (
    <div className={`min-h-screen transition-all duration-500 pb-16 ${isDark?'dark bg-app-bg':'bg-app-bg'} text-text-main`}>

      {toast && <Toast message={toast} onClose={()=>setToast(null)} />}
      {showModal && <TripDetailsModal trip={trips.next} onClose={()=>setShowModal(false)} onAccept={handleAcceptTrip} accepting={accepting} />}

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-app-header/80 border-b border-border-main px-6 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-primary p-2 rounded-lg shadow-lg shadow-brand-primary/20">
                <RiTruckLine className="text-white" size={22} />
              </div>
              <span className="text-xl font-black italic tracking-tighter uppercase">
                Fleet<span className="text-brand-primary">Pro</span>
              </span>
            </div>
            <button onClick={()=>setIsDark(!isDark)} className="p-2 rounded-xl border border-border-main bg-app-card cursor-pointer hover:scale-110 transition-all shadow-sm">
              {isDark ? <RiSunLine className="text-amber-400"/> : <RiMoonLine className="text-brand-primary"/>}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>trips.next && setShowModal(true)}
              className={`relative p-2.5 rounded-xl border transition-all cursor-pointer ${trips.next?'border-brand-primary bg-brand-primary/10 text-brand-primary':'border-border-main bg-app-card text-text-muted'}`}>
              <RiNotification3Line size={20} className={trips.next?'animate-bounce':''} />
              {trips.next && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-app-bg animate-pulse">1</span>}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 font-black text-[10px] uppercase tracking-widest border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all cursor-pointer">
              Logout <RiLogoutCircleRLine size={16}/>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-6 space-y-8 animate-fade-in">

        {/* Greeting */}
        <div className="px-1 pt-2">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
            Salam, <span className="text-brand-primary">{driverData?.name || driverData?.fullName || 'Driver'}</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${trips.current?'bg-brand-primary animate-pulse':'bg-emerald-500'}`}/>
            <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.4em]">
              {trips.current ? 'On Mission' : 'Standby — Ready'}
            </p>
            {driverPos && (
              <span className="ml-auto flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                <RiNavigationLine size={11}/> GPS Active
              </span>
            )}
          </div>
        </div>

        {/* New load banner */}
        {trips.next && !trips.current && (
          <div className="bg-brand-primary/5 border-2 border-brand-primary rounded-[2rem] p-5 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-brand-primary p-2.5 rounded-xl shrink-0">
                <RiBellFill className="text-white animate-bounce" size={18}/>
              </div>
              <div>
                <p className="text-[9px] font-black text-brand-primary uppercase tracking-widest">Naya Load Assign Hua!</p>
                <p className="text-sm font-black italic uppercase text-text-main mt-0.5">{trips.next.pickup} → {trips.next.dropoff}</p>
              </div>
            </div>
            <button onClick={()=>setShowModal(true)} className="shrink-0 text-[10px] font-black uppercase text-brand-primary border border-brand-primary px-4 py-2.5 rounded-xl hover:bg-brand-primary hover:text-white transition-all cursor-pointer tracking-widest">
              Dekhein
            </button>
          </div>
        )}

        {/* ── LIVE MAP — current ya pending trip hone par ── */}
        {!loading && activeTrip && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <RiMapLine className="text-brand-primary" size={18}/>
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Live Route Map</h2>
              </div>
              {driverPos && (
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"/>
                  <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Live Tracking On</span>
                </div>
              )}
            </div>

            <LiveMap
              pickup={activeTrip.pickup}
              dropoff={activeTrip.dropoff}
              driverPos={driverPos}
              isActive={!!trips.current}
            />

            {/* Route info strip */}
            <div className="flex items-center gap-3 bg-app-card border border-border-main rounded-2xl px-5 py-3.5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-base shrink-0">📦</span>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Pickup</p>
                  <p className="text-xs font-black italic uppercase truncate">{activeTrip.pickup}</p>
                </div>
              </div>
              <BsArrowRight className="text-brand-primary shrink-0 opacity-50" size={18}/>
              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <div className="min-w-0 text-right">
                  <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Dropoff</p>
                  <p className="text-xs font-black italic uppercase truncate">{activeTrip.dropoff}</p>
                </div>
                <span className="text-base shrink-0">🏁</span>
              </div>
            </div>
          </section>
        )}

        {/* Active Load */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <RiSteering2Line className={`text-brand-primary ${trips.current?'animate-spin-slow':'opacity-40'}`} size={18}/>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Active Load</h2>
          </div>

          {loading ? (
            <div className="bg-app-card rounded-[2.5rem] border border-border-main p-12 text-center animate-pulse">
              <p className="text-[10px] font-black uppercase text-text-muted tracking-widest">Loading...</p>
            </div>
          ) : trips.current ? (
            <div className="bg-app-card rounded-[2.5rem] border border-border-main shadow-xl overflow-hidden">
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{trips.current.tripCustomId}</p>
                    <h3 className="text-xl font-black italic uppercase leading-tight">
                      {trips.current.pickup}
                      <BsArrowRight className="inline mx-2 opacity-30"/>
                      {trips.current.dropoff}
                    </h3>
                  </div>
                  <span className={`shrink-0 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${curInfo?.color} text-white`}>
                    {trips.current.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60">
                    <span>Route Completion</span>
                    <span className="text-brand-primary">{curInfo?.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-border-main rounded-full overflow-hidden p-0.5">
                    <div className={`h-full ${curInfo?.color} rounded-full transition-all duration-700`} style={{width:`${curInfo?.progress}%`}}/>
                  </div>
                  <div className="flex justify-between pt-1">
                    {['accepted','arrived','loaded','in-transit','delivered'].map((s,i)=>(
                      <div key={s} className="flex flex-col items-center gap-1">
                        <div className={`w-2 h-2 rounded-full transition-all ${curInfo?.progress>=[20,40,60,85,100][i]?(statusFlow[s]?.color||'bg-brand-primary'):'bg-border-main'}`}/>
                        <span className="text-[7px] font-black uppercase opacity-40 hidden sm:block">{s.replace('-',' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {curInfo?.next ? (
                  <button onClick={()=>handleStatusUpdate(trips.current._id,trips.current.status)} disabled={updating}
                    className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-brand-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer">
                    <RiMapPinUserLine size={18}/>
                    {updating ? 'Update ho raha hai...' : curInfo.label}
                  </button>
                ) : (
                  <div className="w-full py-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                    <RiCheckDoubleLine size={18}/> Trip Mukammal Ho Gaya!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-app-card rounded-[2.5rem] border-2 border-dashed border-border-main p-12 text-center">
              <RiCheckDoubleLine className="text-emerald-500 mx-auto mb-4 opacity-30" size={40}/>
              <h3 className="text-lg font-black italic uppercase opacity-50">Koi Active Ride Nahi</h3>
              <p className="text-text-muted text-[9px] font-bold uppercase tracking-widest mt-1">Assignment ka intezaar hai</p>
            </div>
          )}
        </section>

        {/* Incoming Load */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <RiNotification3Line className={`text-brand-primary ${trips.next?'animate-pulse':'opacity-40'}`} size={18}/>
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60">Incoming Load</h2>
          </div>

          {trips.next ? (
            <div className="bg-app-card rounded-[2.5rem] border-2 border-brand-primary bg-brand-primary/5 shadow-xl overflow-hidden animate-fade-in">
              <div className="p-8 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="bg-brand-primary text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">Priority Request</span>
                  <p className="text-xs font-black italic opacity-40">{trips.next.tripCustomId}</p>
                </div>
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Route</p>
                    <p className="font-black italic text-lg uppercase leading-tight">
                      {trips.next.pickup}<br/><span className="text-brand-primary">→</span> {trips.next.dropoff}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Fare</p>
                    <p className="font-black italic text-2xl text-emerald-500">PKR {trips.next.fare}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={()=>setShowModal(true)} className="flex-1 border border-border-main py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-app-bg transition-all cursor-pointer flex items-center justify-center gap-2">
                    <RiInformationLine size={14}/> Details
                  </button>
                  <button onClick={handleAcceptTrip} disabled={accepting}
                    className="flex-[2] bg-brand-primary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 cursor-pointer">
                    {accepting ? 'Accept ho raha hai...' : '✓ Accept Trip'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-app-card rounded-[2.5rem] border border-border-main p-8 flex items-center gap-4 opacity-50">
              <RiSearchLine className="text-brand-primary animate-pulse shrink-0" size={24}/>
              <p className="text-[10px] font-black uppercase italic">Naye loads scan ho rahe hain...</p>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-app-card p-6 rounded-[2rem] border border-border-main text-center shadow-sm">
            <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1 italic">Rating</p>
            <p className="text-2xl font-black italic">4.9/5</p>
          </div>
          <div className="bg-app-card p-6 rounded-[2rem] border border-border-main text-center shadow-sm">
            <p className="text-[8px] font-black uppercase tracking-widest text-text-muted mb-1 italic">Wallet</p>
            <p className="text-2xl font-black italic text-brand-primary">12,500</p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default DriverDashboard;
