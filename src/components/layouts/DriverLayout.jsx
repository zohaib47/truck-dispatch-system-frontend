import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Admin/Header'; // Driver ka Top/Bottom Nav
import DriverNavbar from '../../pages/Driver/DriverNavbar';

const DriverLayout = () => {
  return (

    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      
      <DriverNavbar/>
      <main className="flex-grow p-4 pb-24"> 

        <div className="max-w-md mx-auto">
          <Outlet />
        </div>
      </main>

    

    </div>
  );
};

export default DriverLayout;