import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiLock, FiTruck, FiArrowRight, 
  FiLoader, FiEye, FiEyeOff, FiBriefcase 
} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

 const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const { confirmPassword, ...dataToSend } = formData;
      
      const response = await axios.post("https://truck-dispatch-system-backend.vercel.app/api/auth/register", dataToSend);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Account Created Successfully! 🚛");
        
        setTimeout(() => navigate('/'), 2000); 
      }
    } catch (error) {
  if (error.response) {
    const backendMessage = error.response.data.message || "User already exists";
    toast.error(backendMessage); 
  } 
  else if (error.request) {
    toast.error("No response from server. Check your connection.");
  } 
 
  else {
    toast.error("Registration failed. Please try again.");
  }
  
  console.error("Full Error:", error);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center p-6 transition-colors duration-500">
      <Toaster position="top-right" />

      <div className="max-w-[480px] w-full bg-app-card rounded-[2.5rem] shadow-2xl border border-border-main overflow-hidden animate-fade-in">
        
 
        <div className="bg-app-header p-8 text-center border-b border-border-main">
          <div className="inline-flex p-3 bg-brand-primary/10 rounded-xl mb-3">
            <FiTruck className="text-brand-primary" size={28} />
          </div>
          <h2 className="text-2xl font-black text-text-main uppercase italic tracking-tighter">
            Fleet<span className="text-brand-primary">Pro</span> Join
          </h2>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">Member Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          
         
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" required
              className="w-full pl-12 pr-4 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main transition-all"
              placeholder="Full Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="email" required
              className="w-full pl-12 pr-4 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main transition-all"
              placeholder="Email Address"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>


          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type={showPass ? "text" : "password"} required
              className="w-full pl-12 pr-12 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main transition-all"
              placeholder="Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-primary"
            >
              {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Confirm Password with Hide/Show */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type={showConfirmPass ? "text" : "password"} required
              className="w-full pl-12 pr-12 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main transition-all"
              placeholder="Confirm Password"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-primary"
            >
              {showConfirmPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? <FiLoader className="animate-spin" /> : (
              <span className="flex items-center gap-2 tracking-[0.2em] text-xs">CREATE ACCOUNT <FiArrowRight /></span>
            )}
          </button>

          <p className="text-center text-[10px] font-bold text-text-muted uppercase tracking-widest pt-4 border-t border-border-main">
            Registered? <Link to="/login" className="text-brand-primary hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;