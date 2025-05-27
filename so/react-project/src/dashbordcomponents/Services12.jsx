import {
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  Home,
  FileText,
  Users,
  Package,
  BarChart2,
} from "lucide-react";
import { Settings } from 'lucide-react'
import React from "react";
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Sidebar from './Sidebar';
import imgT50 from '../assets/96eb83680e458b4d1949320d79d68d7d66baed1b (1).jpg';
import imgT25 from '../assets/6599894fc678c2c6e0baf3f634d6496ffc55d073.jpg';
import imgFlyCart from '../assets/c8b8d4b2a2243557298f3e740fddfd102002737d.jpg';
import imgAnafi from '../assets/2881a0127948c5c785299400ad4d9410529d2caf.jpg';

const drones = [
  {
    name: "DJI AGRAS T50",
    desc: "It can spray 40 kg or spread 50 kg with precision, leveraging a dual atomizing spraying system, advanced radars, and a binocular vision system. It excels in surveying, spraying, and spreading, ensuring reliable and efficient performance.",
    img: imgT50,
  },
  {
    name: "DJI AGRAS T25",
    desc: "The DJI AGRAS T25 is a lightweight agricultural drone with up to 25 kg payload capacity, advanced sensors, and FPV camera, ideal for surveying, spraying, and spreading.",
    img: imgT25,
  },
  {
    name: "DJI FlyCart 30",
    desc: "DJI FlyCart 30 is a powerful heavy-lift drone with long-range capability, supporting Cargo and Winch modes for safe and efficient air transport.",
    img: imgFlyCart,
  },
  {
    name: "Parrot Anafi USA",
    desc: "The Parrot Anafi USA is a compact, high-performance surveillance drone with 32x zoom, thermal imaging, and encrypted communication, designed for security, rescue, and industrial inspections.",
    img: imgAnafi,
  },
];

const Services = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar like KAPing.jsx */}
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
        {/* Header like Uesers.jsx */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="w-1/2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for anything..." 
                className="w-full px-10 py-2 bg-gray-800 rounded-md text-white"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          <Profile />
        </header>
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drones.map((drone, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border border-gray-800 bg-gray-800 shadow-[0_0_8px_#00ffe0]"
              >
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md shadow-md">
                  1111$
                </div>
                <img
                  src={drone.img}
                  alt={drone.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-center mb-2">
                    {drone.name}
                  </h3>
                  <p className="text-sm text-gray-300 text-center">
                    {drone.desc
                      .split(" ")
                      .map((word, i) =>
                        [
                          "system",
                          "performance",
                          "vision",
                          "radars",
                          "zoom",
                          "encrypted",
                          "security",
                        ].includes(
                          word.toLowerCase().replace(/[^a-z]/gi, "")
                        ) ? (
                          <strong key={i}>{word} </strong>
                        ) : (
                          word + " "
                        )
                      )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-between items-center">
            <span className="text-gray-400">25 Total</span>
            <div className="flex items-center">
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-gray-400 hover:bg-gray-800">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 text-white mx-1">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-gray-400 hover:bg-gray-800 mx-1">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-gray-400 hover:bg-gray-800 mx-1">
                3
              </button>
              <span className="mx-1 text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-gray-400 hover:bg-gray-800 mx-1">
                7
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-800 text-gray-400 hover:bg-gray-800">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Add
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Services;