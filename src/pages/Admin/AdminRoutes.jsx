import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../../components/layouts/AdminLayout';
import AdminDashboard from './AdminDashboard';
// import StatsOverview from '../../components/Admin/StatsOverview';
import Inventory from './Inventory';
import ContactMessage from './ContactMessage';
import ActiveLoad from './ActiveLoad';
import CreateLoad from './CreateLoad';
import AssignLoad from './AssignLoad';
import ManageDrivers from './ManageDrivers';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
       
        <Route index element={<AdminDashboard />} /> 
        
   
        <Route path="inventory" element={<Inventory />} />
        

        <Route path="messages" element={<ContactMessage />} />
        
        {/* Mazeed paths... */}
        <Route path="assign-load" element={<AssignLoad />} />
        <Route path="active-load" element={<ActiveLoad />} />
        <Route path="create-load" element={<CreateLoad />} />
        <Route path="drivers" element={<ManageDrivers />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;