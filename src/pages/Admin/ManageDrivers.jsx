import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiUsers,
  FiUserPlus,
  FiPhone,
  FiTruck,
  FiInfo,
  FiTrash2,
  FiEdit3,
  FiSave,
  FiCheckCircle,
  FiBriefcase,
  FiHash,
  FiUser,
  FiAlertTriangle,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMail,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../../components/ui/Modal";

const API = "http://localhost:5000/api/driver";

const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  cnicNumber: "",
  experience: "",
  vehicleType: "Large Truck",
  password: "",
};

// ─────────────────────────────────────────────────────────────
// DriverForm
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
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
        Full Name
      </label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiUser size={15} className="text-text-muted" />
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Ahmed Ali"
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
        Email Address
      </label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiMail size={15} className="text-text-muted" />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
          placeholder="driver@fleetpro.com"
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
          Phone
        </label>
        <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
          <FiPhone size={15} className="text-text-muted" />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="0300..."
            className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
          Experience
        </label>
        <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
          <FiBriefcase size={15} className="text-text-muted" />
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            type="number"
            placeholder="5"
            className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
          />
        </div>
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
        CNIC Number
      </label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiHash size={15} className="text-text-muted" />
        <input
          name="cnicNumber"
          value={formData.cnicNumber}
          onChange={handleChange}
          required
          placeholder="42101..."
          maxLength={13}
          className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
        />
      </div>
    </div>

    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
        Vehicle Type
      </label>
      <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
        <FiTruck size={15} className="text-text-muted" />
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
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
        <label className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1.5 block">
          Password
        </label>
        <div className="flex items-center gap-3 bg-app-bg border border-border-main rounded-xl px-4 py-3">
          <FiLock size={15} className="text-text-muted" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type={showPassword ? "text" : "password"}
            placeholder="Min 6 chars"
            className="bg-transparent flex-1 text-sm font-bold text-text-main outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-text-muted hover:text-brand-primary"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        </div>
      </div>
    )}

    {formError && (
      <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-3 rounded-xl text-xs font-bold">
        <FiAlertTriangle size={14} /> {formError}
      </div>
    )}

    <button
      type="submit"
      disabled={submitting}
      className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 mt-2 shadow-lg shadow-brand-primary/20"
    >
      <FiSave size={15} />
      {submitting ? "Saving..." : submitLabel}
    </button>
  </form>
);

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const ManageDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, { headers: authHeader() });
      setDrivers(res.data);
    } catch (err) {
      toast.error("Failed to load drivers list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const openAdd = () => {
    setFormData(emptyForm);
    setFormError("");
    setShowPassword(false);
    setModalType("add");
    setIsModalOpen(true);
  };

  const openDetails = (driver) => {
    setSelectedDriver(driver);
    setModalType("details");
    setIsModalOpen(true);
  };

  const openEdit = (driver) => {
    setSelectedDriver(driver);
    setFormData({
      fullName: driver.fullName,
      email: driver.email || "",
      phone: driver.phone,
      cnicNumber: driver.cnicNumber,
      experience: driver.experience,
      vehicleType: driver.vehicleType,
    });
    setFormError("");
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDelete = (driver) => {
    setSelectedDriver(driver);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
    setFormError("");
    setShowPassword(false);
  };

  const handleAddDriver = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(API, formData, { headers: authHeader() });
      setDrivers((prev) => [res.data, ...prev]);
      toast.success("Driver added successfully! 🚀");
      closeModal();
    } catch (err) {
      const msg = err.response?.data?.message || "Error adding driver";
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateDriver = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.put(`${API}/${selectedDriver._id}`, formData, {
        headers: authHeader(),
      });
      setDrivers((prev) =>
        prev.map((d) => (d._id === selectedDriver._id ? res.data : d)),
      );
      toast.success("Driver updated successfully! ✨");
      closeModal();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDriver = async () => {
    setSubmitting(true);
    try {
      await axios.delete(`${API}/${selectedDriver._id}`, {
        headers: authHeader(),
      });
      setDrivers((prev) => prev.filter((d) => d._id !== selectedDriver._id));
      toast.success("Driver removed from fleet 🗑️");
      closeModal();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setSubmitting(false);
    }
  };

  const formProps = {
    formData,
    handleChange,
    formError,
    submitting,
    showPassword,
    setShowPassword,
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-text-main flex items-center gap-3 uppercase italic">
          <div className="p-2 bg-brand-primary/10 rounded-xl">
            <FiUsers className="text-brand-primary" />
          </div>
          Driver <span className="text-brand-primary">Management</span>
        </h2>

        {/* Premium Matte Button */}
        <button
          onClick={openAdd}
          className="cursor-pointer relative overflow-hidden flex items-center justify-center gap-3 bg-brand-primary text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-[0_10px_20px_rgba(var(--brand-primary-rgb),0.2)] hover:shadow-[0_15px_30px_rgba(var(--brand-primary-rgb),0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group"
        >
          {/* Soft Overlay for Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Icon Container - Halka sa dark shade contrast ke liye */}
          <div className="p-1 bg-black/10 rounded-lg shadow-inner">
            <FiUserPlus size={16} className="text-white" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.2em] relative z-10">
            Add New Driver
          </span>
        </button>
      </div>

      <div className="bg-app-card rounded-[2.5rem] border border-border-main overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-20 text-center font-black text-text-muted animate-pulse italic">
            LOADING FLEET DATA...
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-app-header border-b border-border-main">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Driver
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Vehicle
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr
                  key={driver._id}
                  className="border-b border-border-main/50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="font-black text-text-main uppercase text-sm italic">
                      {driver.fullName}
                    </div>
                    <div className="text-[10px] text-text-muted font-bold mt-0.5 tracking-wider">
                      {driver.email || driver.phone}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-text-muted uppercase italic">
                    {driver.vehicleType}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3">
                      {/* View Details - Soft Blue to Deep Blue */}
                      <button
                        onClick={() => openDetails(driver)}
                        className="cursor-pointer p-3 bg-blue-50/50 rounded-xl text-blue-400 hover:text-blue-600 hover:bg-blue-100 transition-all duration-200 border border-transparent hover:border-blue-200"
                      >
                        <FiInfo size={18} />
                      </button>

                      {/* Edit - Soft Amber to Deep Amber */}
                      <button
                        onClick={() => openEdit(driver)}
                        className="p-3 bg-amber-50/50 rounded-xl cursor-pointer text-amber-400 hover:text-amber-600 hover:bg-amber-100 transition-all duration-200 border border-transparent hover:border-amber-200"
                      >
                        <FiEdit3 size={18} />
                      </button>

                      {/* Delete - Soft Red to Deep Red */}
                      <button
                        onClick={() => openDelete(driver)}
                        className=" cursor-pointer p-3 bg-red-50/50 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-100 transition-all duration-200 border border-transparent hover:border-red-200"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODALS */}
      <Modal
        isOpen={isModalOpen && modalType === "add"}
        onClose={closeModal}
        title="New Enrollment"
      >
        <DriverForm
          {...formProps}
          onSubmit={handleAddDriver}
          submitLabel="Add Driver"
          showPasswordField={true}
        />
      </Modal>

      <Modal
        isOpen={isModalOpen && modalType === "edit"}
        onClose={closeModal}
        title="Driver Update"
        subtitle={selectedDriver?.fullName}
      >
        <DriverForm
          {...formProps}
          onSubmit={handleUpdateDriver}
          submitLabel="Save Changes"
          showPasswordField={false}
        />
      </Modal>

      <Modal
        isOpen={isModalOpen && modalType === "details"}
        onClose={closeModal}
        title="Driver Profile"
        subtitle={selectedDriver?.fullName}
      >
        {selectedDriver && (
          <div className="space-y-3 pt-2">
            {[
              {
                label: "Full Name",
                value: selectedDriver.fullName,
                icon: <FiUser size={14} />,
              },
              {
                label: "Email",
                value: selectedDriver.email || "N/A",
                icon: <FiMail size={14} />,
              },
              {
                label: "Phone",
                value: selectedDriver.phone,
                icon: <FiPhone size={14} />,
              },
              {
                label: "CNIC",
                value: selectedDriver.cnicNumber,
                icon: <FiHash size={14} />,
              },
              {
                label: "Experience",
                value: `${selectedDriver.experience} Years`,
                icon: <FiBriefcase size={14} />,
              },
              {
                label: "Vehicle Type",
                value: selectedDriver.vehicleType,
                icon: <FiTruck size={14} />,
              },
              {
                label: "Status",
                value: selectedDriver.status,
                icon: <FiCheckCircle size={14} />,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-4 py-3 bg-app-bg rounded-xl border border-border-main"
              >
                <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-widest">
                  {row.icon} {row.label}
                </div>
                <div className="text-sm font-black text-text-main uppercase italic">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isModalOpen && modalType === "delete"}
        onClose={closeModal}
        title="Driver Remove"
      >
        {selectedDriver && (
          <div className="pt-2 space-y-5">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-4 flex gap-3 text-center flex-col items-center">
              <FiAlertTriangle size={32} className="text-red-500" />
              <p className="text-sm font-bold text-text-main uppercase mt-2">
                Remove {selectedDriver.fullName}?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className=" cursor-pointer flex-1 py-4 rounded-xl border border-border-main font-black text-[10px] uppercase tracking-widest text-text-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDriver}
                className=" cursor-pointer flex-1 py-4 rounded-xl bg-red-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageDrivers;
