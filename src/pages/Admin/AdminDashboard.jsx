
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ActiveLoad from './ActiveLoad';
import CreateLoad from './CreateLoad';
import StatsOverview from '../../components/Admin/StatsOverview';
import Inventory from './Inventory';
import ManageDrivers from './ManageDrivers';
import AssignLoad from './AssignLoad';
import ContactMessage from './ContactMessage';

const AdminDashboard = () => {
  return (
    <div>
      <StatsOverview />
     
    </div>
  );
};

export default AdminDashboard;