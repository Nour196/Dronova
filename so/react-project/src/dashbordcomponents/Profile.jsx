import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        // First try to use data from localStorage
        if (userData?.name) {
          setAdminName(userData.name);
          setLoading(false);
        }

        // Then try to fetch from API
        if (token) {
          try {
            const response = await axios.get('http://localhost:5000/api/users/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.data?.name) {
              setAdminName(response.data.name);
              // Update localStorage with new data
              localStorage.setItem('userData', JSON.stringify({
                ...userData,
                ...response.data
              }));
            }
          } catch (error) {
            console.error('Error fetching admin data:', error);
            // If API call fails, we already have the data from localStorage
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchAdminData:', error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <Link to="/profile" className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
      <span className="text-sm">{adminName || 'Admin'}</span>
      <div className="w-8 h-8 bg-gray-500 rounded-full overflow-hidden">
        <img 
          src="/images/profile-placeholder.svg" 
          alt="Profile" 
          className="w-full h-full object-cover" 
        />
      </div>
    </Link>
  );
} 