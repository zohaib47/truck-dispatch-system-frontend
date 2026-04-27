import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiPhone, FiArrowLeft, FiLoader, FiCheckCircle } from "react-icons/fi";
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const [method, setMethod] = useState('email'); 
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

 
    const API_URL = "https://truck-dispatch-system-backend.vercel.app/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/forgot-password`, {
                method,
                value: inputValue
            });

            if (response.data.success) {
                toast.success(`OTP sent to your ${method}!`);
                setIsSent(true);
                // 3 second baad reset page par bhej dein jahan OTP enter karna ho
                setTimeout(() => navigate('/reset-password', { state: { method, value: inputValue } }), 3000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "User not found!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] p-6 font-sans">
            <Toaster position="top-right" />
            
            <div className="max-w-[450px] w-full bg-[#161B22] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden p-8">
                
                <Link to="/login" className="inline-flex items-center gap-2 text-text-muted hover:text-brand-primary text-sm mb-8 transition-colors">
                    <FiArrowLeft /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">
                        Forgot <span className="text-brand-primary">Password?</span>
                    </h2>
                    <p className="text-text-muted text-xs mt-2 font-medium">Choose a method to reset your password</p>
                </div>

                {/* Method Switcher */}
                <div className="flex bg-[#0B0E14] p-1 rounded-2xl mb-8 border border-white/5">
                    <button 
                        onClick={() => { setMethod('email'); setIsSent(false); }}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${method === 'email' ? 'bg-brand-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                    >
                        Email
                    </button>
                    <button 
                        onClick={() => { setMethod('mobile'); setIsSent(false); }}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${method === 'mobile' ? 'bg-brand-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                    >
                        Mobile
                    </button>
                </div>

                {!isSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            {method === 'email' ? (
                                <>
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
                                    <input 
                                        type="email" required
                                        className="w-full pl-12 pr-4 py-4 bg-[#0B0E14] border border-white/10 rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-white"
                                        placeholder="Enter your email"
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-primary" />
                                    <input 
                                        type="tel" required
                                        className="w-full pl-12 pr-4 py-4 bg-[#0B0E14] border border-white/10 rounded-2xl outline-none focus:border-brand-primary/40 text-sm font-semibold text-white"
                                        placeholder="Enter mobile number"
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                </>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-brand-primary hover:opacity-90 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                        >
                            {loading ? <FiLoader className="animate-spin" /> : "SEND RESET OTP"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-10 animate-bounce">
                        <FiCheckCircle className="text-green-500 mx-auto mb-4" size={50} />
                        <p className="text-white font-bold text-sm">Check your {method} for the OTP!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;