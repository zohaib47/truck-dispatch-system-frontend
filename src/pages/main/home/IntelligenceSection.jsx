import React, { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiX, FiZap } from 'react-icons/fi';

// import localvideo from '../../../assets/video/intelligencevideo.webm';
import { Media_link } from '../../../assets/media';

const IntelligenceSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(true);

  const previewRef = useRef(null);
  const modalRef = useRef(null);

  const togglePreview = () => {
    if (!previewRef.current) return;
    if (isPlaying) {
      previewRef.current.pause();
      setIsPlaying(false);
    } else {
      previewRef.current.play();
      setIsPlaying(true);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setModalPlaying(true);
  };

  useEffect(() => {
    if (showModal && modalRef.current && previewRef.current) {
      modalRef.current.currentTime = previewRef.current.currentTime;
      modalRef.current.play();
    }
  }, [showModal]);

  const closeModal = () => {
    if (modalRef.current) {
      if (previewRef.current)
        previewRef.current.currentTime = modalRef.current.currentTime;
      modalRef.current.pause();
    }
    setShowModal(false);
  };

  const toggleModal = () => {
    if (!modalRef.current) return;
    if (modalPlaying) {
      modalRef.current.pause();
      setModalPlaying(false);
    } else {
      modalRef.current.play();
      setModalPlaying(true);
    }
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    if (showModal) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showModal]);

  return (
    <>
      {/* Background set to Navy Blue (#0D1B2E) */}
      <section className="relative py-24 bg-[#0D1B2E] overflow-hidden">
        
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#ffffff 0.5px, transparent 0.5px), linear-gradient(90deg, #ffffff 0.5px, transparent 0.5px)', 
               backgroundSize: '50px 50px' 
             }} />

        {/* Top Blue Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* ── Header ── */}
          <div className="mb-12 text-center lg:text-left">
            {/* Badge - Using Blue now */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
              <FiZap size={14} className="text-blue-400" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400">
                Fleet Intelligence
              </span>
            </div>

            {/* Heading - White text for dark bg */}
            <h2 className="font-['Rajdhani'] text-4xl md:text-6xl font-bold text-white uppercase leading-none mb-6">
              Hazaron Customers Ki <br />
              <span className="text-blue-500">Intelligence</span> Se Apna <br />
              <span className="text-white">Business</span> Behtar Karein
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              80 billion+ kilometers ke data aur real-time GPS tracking se humara AI-powered
              system aapke fleet ki efficiency maximize karta hai — automatically.
            </p>
          </div>

          {/* ── Video Player ── */}
          <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black group">
            <div className="aspect-[16/7] relative">
              <video
                ref={previewRef}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover opacity-80" >

                <source src={Media_link.intelligencevideo} type="video/webm" />
                
              </video>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2E]/80 via-transparent to-transparent" />

              {/* Play/Pause toggle */}
              <button
                onClick={togglePreview}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
              </button>

              {/* Live Label */}
              <div className="absolute top-5 left-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
                  Live Fleet View
                </span>
              </div>
            </div>
          </div>

          {/* ── Watch Full Video Button - Blue Theme ── */}
          <div className="text-center mt-10">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <FiPlay size={12} fill="currentColor" />
              </div>
              WATCH FULL VIDEO
            </button>
          </div>

        </div>
      </section>

      {/* ── Fullscreen Modal ── */}
      {showModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[9999] bg-[#060E1A]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-5xl bg-[#0D1B2E] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <FiX size={20} />
            </button>

            <div className="aspect-video relative">
              <video
                ref={modalRef}
                loop playsInline
                className="w-full h-full object-cover"
                onClick={toggleModal}
              >
                <source src={localvideo} type="video/webm" />
                  
              </video>

              {!modalPlaying && (
                <div onClick={toggleModal} className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-blue-600/90 flex items-center justify-center text-white shadow-2xl">
                    <FiPlay size={32} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">FleetPro — Live Demo</span>
              </div>
              <button
                onClick={toggleModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                {modalPlaying ? <FiPause size={14} /> : <FiPlay size={14} />}
                {modalPlaying ? 'PAUSE' : 'PLAY'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IntelligenceSection;