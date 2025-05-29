import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, ChevronRight, ArrowLeft, 
  Bell, Home, Users, FileText, BarChart, Settings 
} from 'lucide-react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import axios from 'axios';

export default function RequestDashboard() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All Time');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      // First try to get orders from the orders endpoint
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        // Transform the data to match our component's expected format
        const transformedData = response.data.map(order => ({
          _id: order._id,
          name: order.userId?.name || order.clientName || 'N/A',  // Try both userId.name and clientName
          email: order.userId?.email || order.email || 'N/A',
          field: order.serviceType || 'N/A',
          date: new Date(order.scheduledDate).toLocaleDateString() || 'N/A',
          status: order.status || 'pending',
          location: order.location || 'N/A',
          duration: order.duration || 'N/A',
          droneType: order.assignedDrone || 'N/A',
          description: order.description || 'N/A'
        }));
        setRequests(transformedData);
      } else {
        setRequests([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests. Please try again later.');
      setLoading(false);
      setRequests([]);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setCurrentView('detail');
  };

  const handleBackClick = () => {
    setCurrentView('list');
  };

  const handleApprove = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Update to use the correct endpoint and status
      await axios.put(`http://localhost:5000/api/orders/${requestId}`, {
        status: 'accepted'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Update the local state with the correct status
      setRequests(requests.map(request => 
        request._id === requestId 
          ? { ...request, status: 'accepted' }
          : request
      ));
      
      setCurrentView('list');
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request. Please try again later.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Delete the request instead of rejecting it
      await axios.delete(`http://localhost:5000/api/orders/${requestId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Remove the request from local state
      setRequests(requests.filter(request => request._id !== requestId));
      
      setCurrentView('list');
    } catch (err) {
      console.error('Error deleting request:', err);
      setError('Failed to delete request. Please try again later.');
    }
  };

  const filteredRequests = requests.filter(request => {
    if (!request) return false;
    
    const matchesSearch = 
      (request.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (request.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (request.field?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesField = selectedField === 'All' || request.field === selectedField;
    const matchesDate = selectedDate === 'All Time' || (request.date && request.date.includes(selectedDate));

    return matchesSearch && matchesField && matchesDate;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="w-1/2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for anything..." 
                className="w-full px-10 py-2 bg-gray-800 rounded-md text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Main content area - Conditionally render based on currentView */}
        {currentView === 'list' ? (
          <RequestsListView 
            requests={filteredRequests} 
            getStatusClass={getStatusClass} 
            onRequestClick={handleRequestClick}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <RequestDetailView 
            request={selectedRequest} 
            onBackClick={handleBackClick}
            onApprove={() => handleApprove(selectedRequest._id)}
            onReject={() => handleReject(selectedRequest._id)}
          />
        )}
      </div>
    </div>
  );
}

// Sub-component for the requests list view
function RequestsListView({ 
  requests, 
  getStatusClass, 
  onRequestClick,
  searchTerm,
  setSearchTerm,
  selectedField,
  setSelectedField,
  selectedDate,
  setSelectedDate
}) {
  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-6">REQUESTS</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-2">Select Field of Use</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-gray-800 border border-gray-700 rounded px-4 py-2 pr-8 text-white focus:outline-none"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Surveillance">Surveillance</option>
              <option value="Agriculture">Agriculture</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 text-white" size={16} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Select by Date</label>
          <div className="relative">
            <select 
              className="w-full appearance-none bg-gray-800 border border-gray-700 rounded px-4 py-2 pr-8 text-white focus:outline-none"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="All Time">All Time</option>
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-2.5 text-white" size={16} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Search</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-gray-800 border border-gray-700 rounded pl-8 py-2 text-white focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
            />
            <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="px-4 py-3 font-medium text-sm">FIELD OF USE</th>
              <th className="px-4 py-3 font-medium text-sm">DATE</th>
              <th className="px-4 py-3 font-medium text-sm">CLIENT NAME</th>
              <th className="px-4 py-3 font-medium text-sm">EMAIL</th>
              <th className="px-4 py-3 font-medium text-sm">STATUS</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-400">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-700">
                  <td className="px-4 py-4">{request.field || 'N/A'}</td>
                  <td className="px-4 py-4">{request.date || 'N/A'}</td>
                  <td className="px-4 py-4">{request.name || 'N/A'}</td>
                  <td className="px-4 py-4">{request.email || 'N/A'}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <span className={getStatusClass(request.status)}>
                        {request.status || 'Pending'}
                      </span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600"
                        onClick={() => onRequestClick(request)}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-400">{requests.length} Total</div>
        <div className="flex space-x-1">
          <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-white rounded hover:bg-gray-700">2</button>
          <button className="w-8 h-8 flex items-center justify-center text-white rounded hover:bg-gray-700">3</button>
          <button className="w-8 h-8 flex items-center justify-center text-white rounded hover:bg-gray-700">...</button>
          <button className="w-8 h-8 flex items-center justify-center text-white rounded hover:bg-gray-700">7</button>
          <button className="w-8 h-8 flex items-center justify-center text-white rounded hover:bg-gray-700">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

// Sub-component for the request detail view
function RequestDetailView({ request, onBackClick, onApprove, onReject }) {
  if (!request) {
    return (
      <div className="flex h-screen bg-gray-900 text-white items-center justify-center">
        <div className="text-xl text-red-500">Request not found</div>
      </div>
    );
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <button
          onClick={onBackClick}
          className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Client Information */}
        <div className="rounded-lg border border-blue-500 bg-gray-900 p-6">
          <h2 className="mb-6 text-2xl font-bold">Client Information Section:</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Name:</span>
              <span className="ml-2 text-gray-300">{request.name || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Email:</span>
              <span className="ml-2 text-gray-300">{request.email || 'N/A'}</span>
            </li>
          </ul>
        </div>

        {/* Request Information */}
        <div className="rounded-lg bg-gray-900 p-6">
          <h2 className="mb-6 text-2xl font-bold">Request Information:</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Field of Use:</span>
              <span className="ml-2 text-gray-300">{request.field || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Location:</span>
              <span className="ml-2 text-gray-300">{request.location || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Requested Date:</span>
              <span className="ml-2 text-gray-300">{request.date || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Duration:</span>
              <span className="ml-2 text-gray-300">{request.duration || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Drone Type:</span>
              <span className="ml-2 text-gray-300">{request.droneType || 'N/A'}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 font-bold">•</span>
              <span className="font-bold">Description:</span>
              <span className="ml-2 text-gray-300">
                {request.description || 'No description provided'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={onApprove}
          className="rounded-md bg-blue-500 px-8 py-3 font-medium text-white hover:bg-blue-600"
        >
          Approve
        </button>
        <button 
          onClick={onReject}
          className="rounded-md bg-red-500 px-8 py-3 font-medium text-white hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </main>
  );
}