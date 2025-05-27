import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../dashbordcomponents/h";
import RequestDashboard from "../dashbordcomponents/KAPing";
import Users from "../dashbordcomponents/Uesers";
import Services from "../dashbordcomponents/Services12";
import HomeDash2 from "../dashbordcomponents/HomeDash2";

const Dashbord123 = () => {
  return (
    <div>
      <Routes>
        {/* Main Dashboard Layout */}
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Other Pages */}
        <Route path="requests" element={<RequestDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="services" element={<Services />} />
        <Route path="profile" element={<HomeDash2 />} />
      </Routes>
    </div>
  );
};

export default Dashbord123;
