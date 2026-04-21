import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../components/layouts/MainLayout';
import Home from './home/Home';
import About from './about/About';
import Contact from './contact/Contact';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about-page" element={<About />} />
        <Route path="contact" element={<Contact />} />
           <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;