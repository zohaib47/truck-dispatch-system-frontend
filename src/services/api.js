import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// --- AXIOS INTERCEPTOR (Token attach karne ke liye) ---
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // ← seedha token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});


// --- APIs ---
export const assignLoad = (loadData) => API.post('/load/assign', loadData);
export const getDriverTrips = (driverId) => API.get(`/load/driver/${driverId}`);
export const updateTripStatus = (loadId, status) => API.patch(`/load/status/${loadId}`, { status });
export const fetchAllDrivers = () => API.get('/driver', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

export const getActiveLoads = () => API.get('/load/all?status=assigned');
export const getAllLoads     = () => API.get('/load/all');


export default API;