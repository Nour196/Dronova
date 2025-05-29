import React from "react";
import { ArrowLeft, Bell, Home, Search, Users } from "lucide-react";

const Request2 = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-[195px] border-r border-gray-800">
        <div className="p-6">
          <div className="text-xl font-bold">
            <span>DRO</span>
            <span className="text-blue-500">NOVA</span>
          </div>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-sm text-gray-400 hover:text-gray-300"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 bg-blue-500/10 px-6 py-3 text-sm text-blue-500"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-500 text-white">
              <span className="text-xs">R</span>
            </div>
            <span>Requests</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-sm text-gray-400 hover:text-gray-300"
          >
            <Users className="h-5 w-5" />
            <span>Users</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 text-sm text-gray-400 hover:text-gray-300"
          >
            <div className="flex h-5 w-5 items-center justify-center">
              <span className="text-xs">S</span>
            </div>
            <span>Services</span>
          </a>

          <div className="mt-8 border-t border-gray-800 pt-4">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3 text-sm text-gray-400 hover:text-gray-300"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700">
                <span className="text-xs">P</span>
              </div>
              <span>Performance</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <div className="w-[400px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full rounded-md border border-gray-700 bg-transparent py-2 pl-10 pr-4 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 hover:bg-gray-800">
              <Bell className="h-5 w-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Admin admin</span>
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-700">
                <img
                  src="https://v0.dev/placeholder.svg?height=32&width=32"
                  alt="Admin"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="mb-6">
            <button className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Client Information */}
            <div className="rounded-lg border border-blue-500 bg-gray-900 p-6">
              <h2 className="mb-6 text-2xl font-bold">
                Client Information Section:
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Name:</span>
                  <span className="ml-2 text-gray-300">Mohamed Y.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Email:</span>
                  <span className="ml-2 text-gray-300">
                    mohamed@example.com
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Phone:</span>
                  <span className="ml-2 text-gray-300">+213 123-456789</span>
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
                  <span className="ml-2 text-gray-300">Agriculture</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Location:</span>
                  <span className="ml-2 text-gray-300">Alg, Algeria</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Requested Date:</span>
                  <span className="ml-2 text-gray-300">April 14, 2025</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Duration:</span>
                  <span className="ml-2 text-gray-300">3 m</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Drone Type:</span>
                  <span className="ml-2 text-gray-300">Quadcopter</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Drone Brand:</span>
                  <span className="ml-2 text-gray-300">DJI Phantom 4 Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Quantity:</span>
                  <span className="ml-2 text-gray-300">2 Drones</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span className="font-bold">Description:</span>
                  <span className="ml-2 text-gray-300">
                    Requesting drones for monitoring and analyzing crop growth
                    over large farming areas.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-md bg-blue-500 px-8 py-3 font-medium text-white hover:bg-blue-600">
              Approve
            </button>
            <button className="rounded-md bg-red-500 px-8 py-3 font-medium text-white hover:bg-red-600">
              Reject
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Request2;
