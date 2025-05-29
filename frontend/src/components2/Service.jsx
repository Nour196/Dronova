// DroneServices.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  BarChart 
} from 'lucide-react';

const Service = () => {
  return (
    <div className="min-h-screen bg-[#181f2a] text-white relative overflow-hidden">
      <div className="flex">
        <main className="flex-1">
          <div className="bg-[#181f2a] text-white py-16 px-4 relative overflow-visible">
            <div className="max-w-6xl mx-auto relative">
              <div className="text-center mb-16">
                <p className="text-xl mb-2">with us you get</p>
                <h2 className="text-4xl md:text-5xl font-bold">
                  an <span className="text-[#1895F0]">Unmatched</span> Experience!
                </h2>
              </div>
              {/* Blue radial glow behind cards */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1895F0] opacity-30 blur-3xl rounded-full z-0" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Service card component
const ServiceCard = ({ title, description, icon, isHighlighted }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div 
      className={`bg-[#232b36] rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${isClicked ? 'scale-95 shadow-inner' : ''} cursor-pointer border ${isHighlighted ? 'border-[#1895F0]' : 'border-white/30'}`}
      onClick={() => setIsClicked(!isClicked)}
    >
      <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isHighlighted ? 'text-[#1895F0]' : 'text-white'}`}>{title}</h3>
      <p className="mb-8 text-gray-300 transition-colors duration-300">{description}</p>
      <div className="w-20 h-20 rounded-full bg-transparent border-2 border-white flex items-center justify-center transition-all duration-300">
        {icon}
      </div>
    </div>
  );
};

// Service data
const services = [
  {
    title: "Real-Time Monitoring",
    description: "Track drone operations live and receive instant updates on your mission.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    isHighlighted: false
  },
  {
    title: "Customized Drone Services",
    description: "Choose and tailor your drone service for agriculture, security, or industrial inspections to fit your exact needs.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    isHighlighted: true
  },
  {
    title: "Quick & Easy Booking",
    description: "Book a drone service with one click, get instant confirmation, and enjoy transparent pricing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    isHighlighted: false
  }
];

export default Service;