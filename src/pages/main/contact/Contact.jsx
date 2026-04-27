import { useState } from 'react';
import { notify } from '../../../utils/toast';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', companyName: '', 
    email: '', phone: '', vehicleCount: '', message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend API call
      const res = await axios.post('https://truck-dispatch-system-backend.vercel.app/api/contact/submit', formData);
       notify.success("Message sent successfuly.");
    } catch (err) {
      console.error(err);
       notify.error("Error sending message.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white mt-28 mb-10 p-8 rounded-lg shadow-2xl font-sans">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Contact Us</h2>
        <p className="text-gray-500 mt-2">Tell us a bit about yourself and we'll get in touch.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company name</label>
          <input type="text" onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">How many vehicles or assets do you have?</label>
          <select onChange={(e) => setFormData({...formData, vehicleCount: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white">
            <option value="">Select...</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="50+">50+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Let us know how we can help you</label>
          <textarea rows="4" onChange={(e) => setFormData({...formData, message: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;