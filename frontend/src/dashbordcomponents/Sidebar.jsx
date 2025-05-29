import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  return (
    <nav className="mt-8">
      <Link 
        to="/dashboard" 
        className={`flex items-center w-full px-6 py-3 ${location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
      >
        <Home className="w-5 h-5 mr-3" />
        <span>Home</span>
      </Link>
      <Link 
        to="/requests"
        className={`flex items-center w-full px-6 py-3 ${location.pathname === '/requests' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
      >
        <FileText className="w-5 h-5 mr-3" />
        <span>Requests</span>
      </Link>
      <Link 
        to="/users"
        className={`flex items-center w-full px-6 py-3 ${location.pathname === '/users' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
      >
        <Users className="w-5 h-5 mr-3" />
        <span>Users</span>
      </Link>
      <Link 
        to="/services"
        className={`flex items-center w-full px-6 py-3 ${location.pathname === '/services' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-gray-300'}`}
      >
        <Settings className="w-5 h-5 mr-3" />
        <span>Services</span>
      </Link>
    </nav>
  );
} 