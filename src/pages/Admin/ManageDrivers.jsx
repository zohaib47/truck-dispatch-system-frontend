import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiUsers, FiUserPlus, FiPhone, FiTruck, FiInfo,
  FiTrash2, FiEdit3, FiSave, FiCheckCircle,
  FiBriefcase, FiHash, FiUser, FiAlertTriangle, FiLock, FiEye, FiEyeOff
} from "react-icons/fi";
import Modal from '../../components/ui/Modal';

const API = 'http://localhost:5000/api/driver';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const emptyForm = {
  fullName:    '',
  phone:       '',
  cnicNumber:  '',
  experience:  '',
  vehicleType: 'Large Truck',
  password:    '',
};

// ─────────────────────────────────────────────────────────────
// DriverForm — ManageDrivers ke BAHAR define kiya
// Wajah: agar andar hota to har state change par naya component
// banta, input unmount/remount hota aur focus chali jati
// ─────────────────────────────────────────────────────────────
const DriverForm = ({
  formData,
  handleChange,
  formError,
  submitting,
  showPassword,
  setShowPassword,
  onSubmit,
  submitLabel,
  showPasswordField,
}) => (
  <form onSubmit={onSubmit} className="space-y-4 pt-2">

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">Full Name</label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiUser size={15} className="text-text-muted" />
        <input
          name="fullName" value={formData.fullName} onChange={handleChange}
          required placeholder="Ahmed Ali"
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none placeholder:text-text-muted/40"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">Phone Number</label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiPhone size={15} className="text-text-muted" />
        <input
          name="phone" value={formData.phone} onChange={handleChange}
          required placeholder="03001234567"
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none placeholder:text-text-muted/40"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">CNIC Number</label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiHash size={15} className="text-text-muted" />
        <input
          name="cnicNumber" value={formData.cnicNumber} onChange={handleChange}
          required placeholder="4210112345671" maxLength={13}
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none placeholder:text-text-muted/40"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">Experience (Years)</label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiBriefcase size={15} className="text-text-muted" />
        <input
          name="experience" value={formData.experience} onChange={handleChange}
          required type="number" min="0" max="50" placeholder="5"
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none placeholder:text-text-muted/40"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">Vehicle Type</label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiTruck size={15} className="text-text-muted" />
        <select
          name="vehicleType" value={formData.vehicleType} onChange={handleChange}
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none cursor-pointer"
        >
          <option value="Car">Car</option>
          <option value="Small Truck">Small Truck</option>
          <option value="Large Truck">Large Truck</option>
        </select>
      </div>
    </div>

    {showPasswordField && (
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">Password</label>
        <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
          <FiLock size={15} className="text-text-muted" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 6 chars, ek letter zaroori"
            className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none placeholder:text-text-muted/40"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="text-text-muted hover:text-brand-primary transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        </div>
        <p className="text-[10px] text-text-muted font-bold mt-1.5 pl-1">
          * Password mein kam az kam ek letter (a-z / A-Z) hona zaroori hai
        </p>
      </div>
    )}

    {formError && (
      <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl text-xs font-bold">
        <FiAlertTriangle size={14} /> {formError}
      </div>
    )}

    <button
      type="submit" disabled={submitting}
      className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 mt-2"
    >
      <FiSave size={15} />
      {submitting ? 'Saving...' : submitLabel}
    </button>
  </form>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const ManageDrivers = () => {
  const [drivers,        setDrivers]        = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [modalType,      setModalType]      = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData,       setFormData]       = useState(emptyForm);
  const [formError,      setFormError]      = useState('');
  const [submitting,     setSubmitting]     = useState(false);
  const [showPassword,   setShowPassword]   = useState(false);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('driversScroll');
    if (savedScroll) window.scrollTo(0, parseInt(savedScroll));
    return () => { sessionStorage.setItem('driversScroll', window.scrollY); };
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { headers: authHeader() });
      setDrivers(res.data);
    } catch (err) {
      console.error("Drivers fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const validatePassword = (password) => {
    if (!password) return 'Password required hai';
    if (!/[a-zA-Z]/.test(password)) return 'Password mein kam az kam ek letter hona zaroori hai';
    if (password.length < 6) return 'Password kam az kam 6 characters ka hona chahiye';
    return '';
  };

  const openAdd = () => {
    setFormData(emptyForm);
    setFormError('');
    setShowPassword(false);
    setModalType('add');
    setIsModalOpen(true);
  };

  const openDetails = (driver) => {
    setSelectedDriver(driver);
    setModalType('details');
    setIsModalOpen(true);
  };

  const openEdit = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      fullName:    driver.fullName,
      phone:       driver.phone,
      cnicNumber:  driver.cnicNumber,
      experience:  driver.experience,
      vehicleType: driver.vehicleType,
    });
    setFormError('');
    setModalType('edit');
    setIsModalOpen(true);
  };

  const openDelete = (driver) => {
    setSelectedDriver(driver);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
    setFormError('');
    setShowPassword(false);
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    const pwdError = validatePassword(formData.password);
    if (pwdError) { setFormError(pwdError); return; }
    setSubmitting(true);
    setFormError('');
    try {
      const res = await axios.post(API, formData, { headers: authHeader() });
      setDrivers(prev => [res.data, ...prev]);
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Driver add karne mein masla hua');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      const res = await axios.put(`${API}/${selectedDriver._id}`, formData, { headers: authHeader() });
      setDrivers(prev => prev.map(d => d._id === selectedDriver._id ? res.data : d));
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Update karne mein masla hua');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDriver = async () => {
    setSubmitting(true);
    try {
      await axios.delete(`${API}/${selectedDriver._id}`, { headers: authHeader() });
      setDrivers(prev => prev.filter(d => d._id !== selectedDriver._id));
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Delete karne mein masla hua');
    } finally {
      setSubmitting(false);
    }
  };

  const formProps = { formData, handleChange, formError, submitting, showPassword, setShowPassword };

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-text-main flex items-center gap-3 uppercase italic">
          <div className="p-2 bg-brand-primary/10 rounded-xl">
            <FiUsers className="text-brand-primary" />
          </div>
          Driver <span className="text-brand-primary">Management</span>
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-3 bg-brand-primary text-white font-black py-4 px-8 rounded-2xl transition-all cursor-pointer shadow-xl shadow-brand-primary/20 active:scale-95 text-xs uppercase tracking-widest"
        >
          <FiUserPlus size={18} /> Add New Driver
        </button>
      </div>

      <div className="bg-app-card rounded-[2.5rem] border border-border-main overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center font-black text-text-muted animate-pulse">LOADING FLEET DATA...</div>
        ) : drivers.length === 0 ? (
          <div className="p-20 text-center font-black text-text-muted">Koi driver nahi mila — pehla driver add karein</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-app-header border-b border-border-main">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Driver</th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Vehicle</th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest text-center">Experience</th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver._id} className="border-b border-border-main/50 hover:bg-brand-primary/5 transition-colors">
                  <td className="px-8 py-5">
                    <div className="font-black text-text-main uppercase text-sm italic">{driver.fullName}</div>
                    <div className="text-[10px] text-text-muted font-bold mt-0.5">{driver.phone}</div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-text-muted">{driver.vehicleType}</td>
                  <td className="px-8 py-5 text-center text-xs font-bold text-text-muted">{driver.experience} Yrs</td>
                  <td className="px-8 py-5">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase italic ${
                      driver.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500'
                      : driver.status === 'On Trip'  ? 'bg-brand-accent/10 text-brand-accent'
                      : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openDetails(driver)} className="p-2.5 bg-app-bg border border-border-main rounded-xl text-text-muted hover:text-brand-primary cursor-pointer transition-all" title="Details"><FiInfo size={16} /></button>
                      <button onClick={() => openEdit(driver)} className="p-2.5 bg-app-bg border border-border-main rounded-xl text-text-muted hover:text-blue-500 cursor-pointer transition-all" title="Edit"><FiEdit3 size={16} /></button>
                      <button onClick={() => openDelete(driver)} className="p-2.5 bg-app-bg border border-border-main rounded-xl text-text-muted hover:text-red-500 cursor-pointer transition-all" title="Delete"><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isModalOpen && modalType === 'add'} onClose={closeModal} title="New Enrollment" subtitle="Add to Fleet">
        <DriverForm {...formProps} onSubmit={handleAddDriver} submitLabel="Add Driver" showPasswordField={true} />
      </Modal>

      <Modal isOpen={isModalOpen && modalType === 'edit'} onClose={closeModal} title="Driver Update" subtitle={selectedDriver?.fullName}>
        <DriverForm {...formProps} onSubmit={handleUpdateDriver} submitLabel="Save Changes" showPasswordField={false} />
      </Modal>

      <Modal isOpen={isModalOpen && modalType === 'details'} onClose={closeModal} title="Driver Profile" subtitle={selectedDriver?.fullName}>
        {selectedDriver && (
          <div className="space-y-3 pt-2">
            {[
              { label: 'Full Name',    value: selectedDriver.fullName,              icon: <FiUser size={14}/> },
              { label: 'Phone',        value: selectedDriver.phone,                 icon: <FiPhone size={14}/> },
              { label: 'CNIC',         value: selectedDriver.cnicNumber,            icon: <FiHash size={14}/> },
              { label: 'Experience',   value: `${selectedDriver.experience} Years`, icon: <FiBriefcase size={14}/> },
              { label: 'Vehicle Type', value: selectedDriver.vehicleType,           icon: <FiTruck size={14}/> },
              { label: 'Status',       value: selectedDriver.status,                icon: <FiCheckCircle size={14}/> },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3 bg-app-bg rounded-xl border border-border-main">
                <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest">{row.icon} {row.label}</div>
                <div className="text-sm font-black text-text-main uppercase italic">{row.value}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal isOpen={isModalOpen && modalType === 'delete'} onClose={closeModal} title="Driver Remove" subtitle="Confirm karo">
        {selectedDriver && (
          <div className="pt-2 space-y-5">
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4">
              <FiAlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm font-bold text-text-main leading-relaxed">
                <span className="text-red-500 uppercase font-black">{selectedDriver.fullName}</span> ko permanently remove karna chahte hain? Yeh action undo nahi ho sakta.
              </p>
            </div>
            {formError && <div className="text-red-500 bg-red-500/10 px-4 py-3 rounded-xl text-xs font-bold">{formError}</div>}
            <div className="flex gap-3">
              <button onClick={closeModal} className="flex-1 py-3.5 rounded-xl border border-border-main text-text-muted font-black text-xs uppercase tracking-widest hover:bg-app-bg transition-all">Cancel</button>
              <button onClick={handleDeleteDriver} disabled={submitting} className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                <FiTrash2 size={14} />
                {submitting ? 'Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default ManageDrivers;
