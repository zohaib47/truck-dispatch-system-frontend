import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverLayout from '../../components/layouts/DriverLayout';
import DriverDashboard from './DriverDashboard';
import MyLoad from './MyLoad';
import LoadDetails from './LoadDetails';
import DriverProfile from './DriverProfile';

const DriverRoutes = () => {
  return (
    <Routes>
      <Route element={<DriverLayout />}>
        <Route path="driver-dashboard" element={<DriverDashboard />} />
        <Route path="myload" element={<MyLoad />} />
        <Route path="load-details" element={<LoadDetails />} />
        <Route path="driver-profile" element={<DriverProfile />} />

      </Route>
    </Routes>
  );
};

export default DriverRoutes;