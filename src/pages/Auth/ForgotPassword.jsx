import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Reset link sent to your email!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Reset Password</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Apna registered email likhein, hum aapko password reset link bhej dein gy.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input 
              type="email" 
              required
              className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="admin@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Submit Button with Cursor Pointer */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md cursor-pointer active:scale-[0.98]"
          >
            Send Reset Link
          </button>

          {/* Back to Login Link with Cursor Pointer */}
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="w-full text-sm text-gray-500 hover:text-blue-600 transition font-medium cursor-pointer py-2"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;