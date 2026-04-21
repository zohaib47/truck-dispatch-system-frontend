import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverLayout from '../../components/layouts/DriverLayout';
import DriverDashboard from './DriverDashboard';

const DriverRoutes = () => {
  return (
    <Routes>
      <Route element={<DriverLayout />}>
        <Route path="driver-dashboard" element={<DriverDashboard />} />
        {/* <Route path="trips" element={<DriverTrips />} /> */}
      </Route>
    </Routes>
  );
};

export default DriverRoutes;