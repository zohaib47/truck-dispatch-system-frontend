import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS yahan lazmi bhejni hai
import MainRoutes from "./pages/main/MainRoutes";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import DriverRoutes from "./pages/Driver/DriverRoutes";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register"
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import DriverDashboard from "./pages/Driver/DriverDashboard";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import Home from "./pages/main/home/Home";
// import AboutPage from "./pages/main/about/About";
// import Contact from "./pages/main/contact/Contact";
// import ContactMessage from "./pages/Admin/ContactMessage";
// import MainLayout from "./pages/main/MainLayout";
// import Services from "./pages/main/Services";
// import LandingPage from "./pages/main/LandingPage";
// import ClientSection from "./pages/main/ClientSection";
// import RouteMap from "./pages/main/RouteMap";
// import IntelligenceSection from "./pages/main/IntelligenceSection";





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