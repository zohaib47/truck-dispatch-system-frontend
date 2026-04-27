import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiTruck, FiArrowRight, FiLoader, FiEye, FiEyeOff } from "react-icons/fi";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ThemeToggle from '../../components/theme/ThemeToggle';
import brand from '../../config/brand';
import API from '../../services/api'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Agar response successful hai (Status 200)
      if (response.data.success) {
        const { token, user } = response.data;
        
        // Data save karna
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast.success(`Welcome back, ${user.name}!`);

        // Role-based Navigation
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'driver') {
            navigate('/driver/driver-dashboard');
          } else {
            // Normal user ke liye Home page
            navigate('/'); 
          }
        });
      }
    } catch (error) {
      // Backend se bheja gaya error message
      const errorMsg = error.response?.data?.message || "Something went wrong";
      const statusCode = error.response?.status;

      if (statusCode === 404) {
        // (Not Registered)
        toast.error("You are not registered! Please create an account.");
      } else if (statusCode === 401) {
        // (Invalid Password)
        toast.error("Invalid Password! Please try again.");
      } else {
       
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden transition-colors duration-500">
      <Toaster position="top-right" />
      
      {/* Background Video  */}
      {/* <video 
        autoPlay loop muted playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/truck-bg.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay to make content readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Login Card */}
      <div className="max-w-[450px] w-full bg-app-card/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden animate-fade-in relative z-20 transition-all">
        
        {/* Header Section */}
        <div className="bg-app-header/50 p-10 text-center relative border-b border-white/10">
          <div className="inline-flex p-4 bg-app-bg/60 rounded-2xl mb-4 border border-border-main shadow-inner">
            <FiTruck className="text-brand-primary" size={30} />
          </div>
          <h2 className="text-2xl font-black text-text-main  italic uppercase">
           
             {brand.name.replace(brand.highlight, "")}
             <span className="text-brand-primary">{brand.highlight}</span>
          </h2>
         
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
              <input 
                type="email" required
                className="w-full pl-12 pr-4 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
              <input 
                type={showPass ? "text" : "password"} required
                className="w-full pl-12 pr-12 py-4 bg-app-bg/40 border border-border-main rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-text-main"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-primary cursor-pointer"
              >
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-primary hover:opacity-90 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            {loading ? <FiLoader className="animate-spin" /> : <>SIGN IN <FiArrowRight /></>}
          </button>

          <p className="text-center text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] pt-4 border-t border-border-main mt-6">
            Need an account? <Link to="/register" className="text-brand-primary hover:underline">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;