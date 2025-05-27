import { useState, useEffect } from "react";
import { X, PencilLine, User, Home, FileText, Users, Settings, BarChart } from "lucide-react";
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from './Profile';
import axios from 'axios';

export default function HomeDash2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      // Get user data from localStorage as fallback
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (userData) {
        setProfileData({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          confirmPassword: ""
        });
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          password: "",
          confirmPassword: ""
        });
      }

      // Try to fetch from API
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.data) {
            setProfileData({
              name: response.data.name || userData?.name || "",
              email: response.data.email || userData?.email || "",
              password: "",
              confirmPassword: ""
            });
            setFormData({
              name: response.data.name || userData?.name || "",
              email: response.data.email || userData?.email || "",
              password: "",
              confirmPassword: ""
            });
          }
        } catch (apiError) {
          console.warn('API fetch failed, using local data:', apiError);
          // Continue with local data if API fails
        }
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error in profile fetch:', err);
      setError('Failed to load profile data');
      setLoading(false);
    }
  };

  const openModal = () => {
    setFormData({...profileData, password: "", confirmPassword: ""});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put('http://localhost:5000/api/users/me', {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        setProfileData({
          ...response.data,
          password: "",
          confirmPassword: ""
        });
        // Update local storage with new data
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          name: response.data.name,
          email: response.data.email
        }));
      }
      closeModal();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-48 bg-gray-900 border-r border-gray-800 min-h-screen">
        <div className="p-4 pl-6">
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-blue-500">DRO</span>
              <span className="text-white">NOVA</span>
            </div>
          </div>
        </div>

        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900">
        {/* Header */}
        <header className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-800">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search for anything..."
              className="w-full bg-gray-800 text-white rounded-md py-2 px-4 pl-10"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <Profile />
          </div>
        </header>

        {/* Profile Content */}
        <main className="p-8">
          <h1 className="text-2xl font-semibold text-white mb-8">PROFILE DETAILS</h1>
          
          <div className="mb-8">
            <div className="flex items-center">
              <div className="relative">
                <div className="bg-gray-700 w-36 h-36 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
                <button 
                  onClick={openModal}
                  className="absolute bottom-1 right-1 bg-gray-600 rounded-full p-1 hover:bg-gray-500 transition-colors"
                >
                  <PencilLine size={16} className="text-white" />
                </button>
              </div>
              
              <div className="ml-8 border-l border-gray-700 pl-8">
                <h2 className="text-white text-xl">{profileData.name}</h2>
                <p className="text-gray-400">{profileData.email}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={profileData.name}
                disabled
                className="w-full max-w-lg bg-gray-800 border border-gray-700 text-white p-3 rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full max-w-lg bg-gray-800 border border-gray-700 text-white p-3 rounded"
              />
            </div>
            
            <div className="pt-4">
              <button 
                onClick={openModal}
                className="flex items-center text-gray-400 hover:text-gray-200"
              >
                <PencilLine size={18} className="mr-2" />
                <span>Edit Details</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 w-full max-w-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

