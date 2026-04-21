import React from 'react';
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children, subtitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative bg-app-card w-full max-w-lg rounded-[2.5rem] border border-border-main shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-border-main flex justify-between items-start bg-app-header">
          <div>
            <h3 className="text-xl font-black text-text-main uppercase italic tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-app-bg rounded-xl text-text-muted hover:text-brand-primary transition-all cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content Area (Children) */}
        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;