import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS yahan lazmi bhejni hai
import MainRoutes from "./pages/main/MainRoutes";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import DriverRoutes from "./pages/Driver/DriverRoutes";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";





function App() {
  return (
    <>

    <Router>
     

      <Routes>
  <Route path="/*" element={<MainRoutes />} />
  <Route path="/admin/*" element={<AdminRoutes />} />
  <Route path="/driver/*" element={<DriverRoutes />} />
  
     
</Routes>
    </Router>

    <ToastContainer 
        position="top-right"
        autoClose={3000}
        theme="dark"
        pauseOnHover
      />
      </>
  )
}

export default App