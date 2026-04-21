import React, { useEffect, useRef } from 'react';

const routes = [
  {
    id: 1,
    from: "Karachi",
    to: "Lahore",
    fromCoords: [24.8607, 67.0011],
    toCoords: [31.5204, 74.3587],
    status: "On Route",
    truck: "FP-001",
    statusColor: "bg-emerald-500",
    color: "#C9971E",
  },
  {
    id: 2,
    from: "Islamabad",
    to: "Peshawar",
    fromCoords: [33.6844, 73.0479],
    toCoords: [34.0151, 71.5249],
    status: "Delivering",
    truck: "FP-007",
    statusColor: "bg-blue-500",
    color: "#60A5FA",
  },
  {
    id: 3,
    from: "Quetta",
    to: "Multan",
    fromCoords: [30.1798, 66.975],
    toCoords: [30.1575, 71.5249],
    status: "Loading",
    truck: "FP-013",
    statusColor: "bg-amber-500",
    color: "#F59E0B",
  },
  {
    id: 4,
    from: "Faisalabad",
    to: "Hyderabad",
    fromCoords: [31.4504, 73.135],
    toCoords: [25.396, 68.3578],
    status: "Returning",
    truck: "FP-019",
    statusColor: "bg-purple-500",
    color: "#A78BFA",
  },
];

const RouteMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = window.L;
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [29.5, 71.5],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      routes.forEach((route) => {
        const svgIcon = (color) => L.divIcon({
          html: `<div style="
            width:14px;height:14px;border-radius:50%;
            background:${color};
            border:2px solid white;
            box-shadow:0 0 10px ${color}88;
          "></div>`,
          className: '',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        L.marker(route.fromCoords, { icon: svgIcon(route.color) })
          .addTo(map)
          .bindPopup(`<b>${route.from}</b><br/>Truck: ${route.truck}`);

        L.marker(route.toCoords, { icon: svgIcon(route.color) })
          .addTo(map)
          .bindPopup(`<b>${route.to}</b><br/>Status: ${route.status}`);

        L.polyline([route.fromCoords, route.toCoords], {
          color: route.color,
          weight: 2.5,
          opacity: 0.8,
          dashArray: '8, 8',
        }).addTo(map);
      });
    };
    document.head.appendChild(script);

    return () => {};
  }, []);

  return (
    <section className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9971E]/10 border border-[#C9971E]/30 text-[10px] font-black tracking-[0.3em] text-[#C9971E] uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Live Fleet Tracking
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white font-['Rajdhani'] uppercase tracking-tighter leading-none">
            Real-Time <span className="text-[#C9971E]">Route Network</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xl">
            Pakistan bhar mein hamare trucks live routes par chal rahe hain. Har delivery ka status real-time track karein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Cards */}
          <div className="space-y-4 lg:col-span-1">
            {routes.map((route) => (
              <div key={route.id}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C9971E]/40 transition-all duration-300 group cursor-pointer backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Truck {route.truck}</span>
                  <span className={`${route.statusColor} text-[9px] font-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                    {route.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-sm font-black text-white font-['Rajdhani']">{route.from}</div>
                    <div className="text-[8px] text-gray-500 uppercase">Origin</div>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-px flex-1 border-t border-dashed border-gray-600"></div>
                    <span style={{ color: route.color }} className="text-xs">🚛</span>
                    <div className="h-px flex-1 border-t border-dashed border-gray-600"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-white font-['Rajdhani']">{route.to}</div>
                    <div className="text-[8px] text-gray-500 uppercase">Dest.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: '440px' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteMap;
