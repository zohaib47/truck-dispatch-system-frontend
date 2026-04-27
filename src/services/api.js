import axios from 'axios';

const API = axios.create({
  baseURL: 'https://truck-dispatch-system-backend.vercel.app/api',
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
export const createLoad = (loadData) => API.post('/load/create-load', loadData);

export const assignDriverToLoad = (loadId, driverId) =>  API.patch(`/load/assign-driver/${loadId}`, { driverId });
export const getDriverTrips = (driverId) => API.get(`/load/driver/${driverId}`);
export const updateTripStatus = (loadId, status) => API.patch(`/load/status/${loadId}`, { status });
export const fetchAllDrivers = () => API.get('/driver');

export const getActiveLoads = () => API.get('/load/all?status=assigned');
export const getAllLoads     = () => API.get('/load/all');


// Driver Dashboard Related APIs
export const driverAPI = {
    // 1. Get My Loads
    getMyLoads: () => API.get('/load/driver/my-load'),
    updateLoadStatus: (id, status) => API.put(`/load/update-status/${id}`, { status }),   
    // Hum "status" ko object ke andar bhej rahe hain kyunke backend "req.body" use kar raha hai
    updateStatus: (status) => API.put('/driver/update-status', { status }),

    // 3. Update Shipment Status (Picked-up/Delivered)
    // Isme aksar humein loadId bhi chahiye hoti hai
    // updateShipmentStatus: (loadId, status) => API.put(`/load/status/${loadId}`, { status })
};
export const loadAPI = {
    // Ye function ID aur Status dono bhejega
    updateLoadStatus: (id, status) => API.put(`/load/driver/status/${id}`, { status }),
    
    
};


export default API;