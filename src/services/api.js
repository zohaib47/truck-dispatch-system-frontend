import axios from 'axios';
const API = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://truck-dispatch-system-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  }
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});




// --- APIs ---
export const createLoad = (loadData) => API.post('/load/create-load', loadData);

export const assignDriverToLoad = (loadId, driverId) =>  API.patch(`/load/assign-driver/${loadId}`, { driverId });
export const getDriverTrips = (driverId) => API.get(`/load/driver/${driverId}`);
export const updateTripStatus = (loadId, status) => API.patch(`/load/status/${loadId}`, { status });
export const fetchAllDrivers = () => API.get('/driver');

export const getActiveLoads = () => API.get('/load/all?status=assigned');
export const getAllLoads     = () => API.get('/load/all');


export const driverAPI = {
    getMyLoads: () => API.get('/load/driver/my-load'),
    updateLoadStatus: (id, status) => API.put(`/load/update-status/${id}`, { status }),   
    updateStatus: (status) => API.put('/driver/update-status', { status }),

};
export const loadAPI = {
    updateLoadStatus: (id, status) => API.put(`/load/driver/status/${id}`, { status }),
    
    
};


export default API;