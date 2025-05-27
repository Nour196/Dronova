import React, { useState, useEffect } from "react";
import {
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";
import Profile from './Profile';
import Sidebar from './Sidebar';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedTime, setSelectedTime] = useState("All Time");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, selectedRole]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Current role filter:', selectedRole);

      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          page: currentPage,
          limit: usersPerPage,
          role: selectedRole === 'all' ? undefined : selectedRole
        }
      });

      console.log('API Response:', response.data);

      let usersData = [];
      if (response.data && Array.isArray(response.data)) {
        usersData = response.data;
      } else if (response.data && response.data.users) {
        usersData = response.data.users;
      }

      if (selectedRole !== 'all') {
        usersData = usersData.filter(user => {
          const userRole = user.role ? user.role.toLowerCase() : '';
          return userRole === selectedRole.toLowerCase();
        });
      }

      setUsers(usersData);
      setTotalUsers(usersData.length);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Failed to fetch users');
      setLoading(false);
      setUsers([]);
    }
  };

  const handleRoleSelect = (role) => {
    console.log('Role selected:', role);
    setSelectedRole(role.toLowerCase());
    setCurrentPage(1);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentPage(1);
    fetchUsers();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditMode(user._id);
    setEditFormData({ ...user });
  };

  const handleEditChange = (e, field) => {
    setEditFormData({
      ...editFormData,
      [field]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/users/${editMode}`,
        editFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setUsers(users.map((user) => 
        user._id === editMode ? response.data : user
      ));
      setEditMode(null);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex">
        <div className="w-48 bg-gray-900 border-r border-gray-800">
          <div className="p-4 pl-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-blue-500">DRO</span>
                <span className="text-white">NOVA</span>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
            <div className="w-1/2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="w-full px-10 py-2 bg-gray-800 rounded-md text-white"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Bell className="w-6 h-6 text-gray-400" />
              </div>
              <Profile />
            </div>
          </header>

          <div className="flex-1 p-8">
            <h1 className="text-xl font-bold mb-6">USERS</h1>

            <div className="flex mb-6 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Filter by Role</div>
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleSelect(e.target.value)}
                    className="bg-gray-800 rounded-md px-4 py-2 pr-10 appearance-none w-48"
                  >
                    <option value="all">All Users</option>
                    <option value="admin">Admins</option>
                    <option value="customer">Customers</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronRight size={16} className="rotate-90 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 font-medium text-gray-400">ROLE</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">NAME</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">USERNAME</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">EMAIL</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">PHONE NUMBER</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="border-b border-gray-800">
                        {editMode === user._id ? (
                          <>
                            <td className="py-4 px-4">
                              <select
                                value={editFormData.role}
                                onChange={(e) => handleEditChange(e, "role")}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                              >
                                <option value="admin">Admin</option>
                                <option value="client">Client</option>
                              </select>
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => handleEditChange(e, "name")}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="text"
                                value={editFormData.username}
                                onChange={(e) => handleEditChange(e, "username")}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="email"
                                value={editFormData.email}
                                onChange={(e) => handleEditChange(e, "email")}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <input
                                type="text"
                                value={editFormData.phone}
                                onChange={(e) => handleEditChange(e, "phone")}
                                className="bg-gray-800 rounded px-2 py-1 w-full"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleEditSubmit}
                                  className="text-green-500 hover:text-green-400"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditMode(null)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-4 px-4">{user.role}</td>
                            <td className="py-4 px-4">{user.name}</td>
                            <td className="py-4 px-4">{user.username}</td>
                            <td className="py-4 px-4">{user.email}</td>
                            <td className="py-4 px-4">{user.phone}</td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(user._id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {users && users.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-400">{totalUsers} Total Users</div>
                <div className="flex">
                  <button
                    className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-l-md disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 ${
                        currentPage === page
                          ? "bg-blue-500"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  {totalPages > 3 && (
                    <>
                      <span className="bg-gray-800 px-3 py-1 flex items-center">...</span>
                      <button
                        className="bg-gray-800 hover:bg-gray-700 px-3 py-1"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                  <button
                    className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-r-md disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
