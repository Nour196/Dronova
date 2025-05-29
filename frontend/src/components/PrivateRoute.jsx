import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  console.log('PrivateRoute Debug:', { token, userData, requiredRole });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userData.role !== requiredRole) {
    console.log('Role check failed:', { userRole: userData.role, requiredRole });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute; 