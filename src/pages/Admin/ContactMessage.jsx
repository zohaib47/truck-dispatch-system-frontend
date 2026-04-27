import React, { useState, useEffect } from 'react';
import { FiMail, FiTrash2, FiUser, FiCalendar, FiMessageSquare, FiSearch, FiCornerUpLeft } from "react-icons/fi";
import axios from 'axios';
import { notify } from '../../utils/toast';

const ContactMessage = () => {

  const API_BASE_URL = 'https://truck-dispatch-system-backend.vercel.app/api/contact';
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Bearer ${token}` } };
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/all`, getAuthHeaders());
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
      notify.error("Failed to load messages from server.");
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${id}`, getAuthHeaders());
        setMessages(messages.filter(msg => msg._id !== id));
        notify.success("Message deleted successfully.");
      } catch (err) {
        notify.error("Unable to delete message.");
      }
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-app-card p-6 rounded-[2rem] border border-border-main shadow-sm">
        <div>
          <h2 className="text-xl font-black text-text-main flex items-center gap-3 uppercase italic">
            <FiMail className="text-brand-primary" /> System <span className="text-brand-primary">Inbox</span>
          </h2>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
            Auto-delete active (48h policy)
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Filter by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-app-bg border border-border-main rounded-xl text-xs font-bold outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* Messages Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div key={msg._id} className="bg-app-card p-6 rounded-[2.5rem] border border-border-main hover:shadow-xl hover:shadow-brand-primary/5 transition-all group relative overflow-hidden">
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex gap-2">
                 <a href={`mailto:${msg.email}`} className="p-2 bg-app-bg rounded-full text-text-muted hover:text-brand-primary transition-all">
                    <FiCornerUpLeft size={16} />
                 </a>
                 <button onClick={() => handleDelete(msg._id)} className="p-2 bg-app-bg rounded-full text-text-muted hover:text-red-500 transition-all">
                    <FiTrash2 size={16} />
                 </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-primary/20">
                    {msg.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-text-main text-sm uppercase tracking-tight">{msg.name}</h3>
                    <p className="text-[10px] text-text-muted font-bold lowercase">{msg.email}</p>
                    {msg.phone && <p className="text-[10px] text-brand-primary font-black">{msg.phone}</p>}
                  </div>
                </div>

                <div className="p-5 bg-app-bg/50 rounded-3xl border border-border-main/50 text-sm text-text-muted leading-relaxed relative">
                  <FiMessageSquare className="absolute -top-2 -left-2 text-brand-primary" size={20} />
                  {msg.message}
                </div>

                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase tracking-tighter">
                    <FiCalendar className="text-brand-primary" />
                    {new Date(msg.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-50">
            <FiMail className="mx-auto mb-4" size={48} />
            <p className="font-black uppercase text-xs tracking-[0.3em]">Inbox Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessage;