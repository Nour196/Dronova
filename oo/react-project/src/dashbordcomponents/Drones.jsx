import { useState } from 'react';
import { Search, Home, Users, Settings, ChevronDown, ChevronRight, Bell } from 'lucide-react';

export default function Drones() {
  const [selectedField, setSelectedField] = useState('All');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for drone service requests
  const requestData = [
    { field: 'Surveillance', date: '05 mar', client: 'raivan', email: 'radioxivan@gmail.com', phone: '+9876543210', status: 'Pending' },
    { field: 'Surveillance', date: '10 mar', client: 'example', email: 'ram123@gmail.com', phone: '+9876543210', status: 'Pending' },
    { field: 'Agriculture', date: '10 jan', client: 'Lakhan', email: 'lakhan123@gmail.com', phone: '+9876543210', status: 'Approved' },
    { field: 'Agriculture', date: '15 jan', client: 'Aeran', email: 'aeran123@gmail.com', phone: '+9876543210', status: 'Approved' },
    { field: 'Surveillance', date: '22 jan', client: 'jiteksi', email: 'jiteksi123@gmail.com', phone: '+9876543210', status: 'Rejected' },
    { field: 'Agriculture', date: '05 feb', client: 'Irankis', email: 'irankis123@gmail.com', phone: '+9876543210', status: 'Rejected' },
  ];

  // Calculate total pages
  const totalItems = 32;
  const totalPages = Math.ceil(totalItems / 6);

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-500';
      case 'Rejected': return 'text-red-500';
      default: return 'text-yellow-500'; // Pending
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 border-r border-gray-800 flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <span className="text-blue-400 font-bold text-xl">DRO</span>
            <span className="text-white font-bold text-xl">NOVA</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="px-4 py-2 flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-l-md">
            <Home size={20} />
            <span>Home</span>
          </div>
          <div className="px-4 py-2 flex items-center space-x-3 bg-blue-600 text-white rounded-l-md">
            <Settings size={20} />
            <span>Requests</span>
          </div>
          <div className="px-4 py-2 flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-l-md">
            <Users size={20} />
            <span>Users</span>
          </div>
          <div className="px-4 py-2 flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-l-md">
            <Settings size={20} />
            <span>Services</span>
          </div>
        </div>
        <div className="mt-8 px-4">
          <div className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs">P</div>
            <span>Performance</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="w-80">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search for anything..." 
                className="w-full bg-gray-800 rounded-md pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell size={20} className="text-gray-400" />
            <div className="flex items-center">
              <span className="mr-2">Admin admin</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 p-6">
          <h1 className="text-xl font-bold mb-6">REQUESTS</h1>
          
          {/* Filters */}
          <div className="flex space-x-4 mb-8">
            <div className="w-56">
              <p className="text-sm mb-2">Select Field of Use</p>
              <div className="relative">
                <button className="flex items-center justify-between w-full bg-gray-800 rounded px-4 py-2">
                  <span>{selectedField}</span>
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
            
            <div className="w-56">
              <p className="text-sm mb-2">Select by Date</p>
              <div className="relative">
                <button className="flex items-center justify-between w-full bg-gray-800 rounded px-4 py-2">
                  <span>{selectedTime}</span>
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
            
            <div className="w-64">
              <p className="text-sm mb-2">search</p>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="" 
                  className="w-full bg-gray-800 rounded pl-10 pr-4 py-2 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div>
            {/* Table header */}
            <div className="grid grid-cols-6 border-b border-gray-800 pb-2 text-sm font-semibold">
              <div className="px-4">FIELD OF USE</div>
              <div className="px-4">DATE</div>
              <div className="px-4">CLIENT NAME</div>
              <div className="px-4">EMAIL</div>
              <div className="px-4">PHONE NUMBER</div>
              <div className="px-4">STATUS</div>
            </div>
            
            {/* Table rows */}
            <div className="mt-2">
              {requestData.map((request, index) => (
                <div key={index} className="grid grid-cols-6 items-center py-4 border-b border-gray-800">
                  <div className="px-4">{request.field}</div>
                  <div className="px-4">{request.date}</div>
                  <div className="px-4">{request.client}</div>
                  <div className="px-4">{request.email}</div>
                  <div className="px-4">{request.phone}</div>
                  <div className="px-4 flex justify-between items-center">
                    <span className={getStatusColor(request.status)}>{request.status}</span>
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">32 Total</div>
            <div className="flex">
              <div className="flex rounded-md">
                <button 
                  className={`w-8 h-8 flex items-center justify-center ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'} rounded-l`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300"
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300"
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300">...</div>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300"
                  onClick={() => setCurrentPage(7)}
                >
                  7
                </button>
                <button 
                  className="w-8 h-8 flex items-center justify-center bg-gray-700 text-gray-300 rounded-r"
                  onClick={() => setCurrentPage(currentPage + 1 <= totalPages ? currentPage + 1 : currentPage)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}