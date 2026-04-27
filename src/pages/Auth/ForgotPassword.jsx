import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiPhone, FiArrowLeft, FiLoader, FiCheckCircle } from "react-icons/fi";
import { toast, Toaster } from 'react-hot-toast';
import API from '../../services/api'; 

const ForgotPassword = () => {
    const [method, setMethod] = useState('email'); 
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await API.post("/auth/forgot-password", {
                method,
                value: inputValue
            });

            if (response.data.success) {
                toast.success(`OTP sent to your ${method}!`);
                setIsSent(true);
                
                setTimeout(() => {
                    navigate('/reset-password', { 
                        state: { method, value: inputValue } 
                    });
                }, 2500);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "User not found with these details";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        // BG ko light gray rakha hai (bg-gray-50)
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
            <Toaster position="top-right" />
            
            {/* Card ab white background aur soft shadow ke saath hai */}
            <div className="max-w-[450px] w-full bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden p-8 animate-fade-in">
                
                {/* Text colors ko text-slate-500 par shift kiya */}
                <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary text-[11px] font-black uppercase tracking-widest mb-8 transition-all group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                </Link>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">
                        Reset <span className="text-brand-primary">Access</span>
                    </h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Verification Required</p>
                </div>

                {/* Method Switcher - Light Theme */}
                <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8 border border-gray-200">
                    <button 
                        type="button"
                        onClick={() => { setMethod('email'); setIsSent(false); }}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${method === 'email' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        Email Address
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setMethod('mobile'); setIsSent(false); }}
                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${method === 'mobile' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        Mobile Number
                    </button>
                </div>

                {!isSent ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            {/* Icons colors changed to slate */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                {method === 'email' ? <FiMail size={18} /> : <FiPhone size={18} />}
                            </div>
                            <input 
                                type={method === 'email' ? "email" : "tel"} 
                                required
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-brand-primary/40 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-300 transition-all"
                                placeholder={method === 'email' ? "Enter registered email" : "Enter mobile number"}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-brand-primary/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <FiLoader className="animate-spin" /> : "REQUEST RESET CODE"}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                           <FiCheckCircle className="text-green-500" size={40} />
                        </div>
                        <h3 className="text-slate-800 font-black italic uppercase tracking-tight text-lg">Code Dispatched!</h3>
                        <p className="text-slate-500 text-[10px] font-bold mt-2 uppercase tracking-widest">
                            Check your {method} inbox for the OTP
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;