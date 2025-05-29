"use client"
import { Search, Home, Users, Settings, BarChart2, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function DroneDashboard() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-[200px] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">
              DRO<span className="text-blue-500">NOVA</span>
            </span>
          </div>
        </div>

        <div className="flex-1 py-4">
          <nav className="space-y-1 px-3">
            <Link href="#" className="flex items-center px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800">
              <Home className="mr-3 h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link href="#" className="flex items-center px-3 py-2 bg-gray-800 text-white rounded-md">
              <div className="mr-3 h-5 w-5 flex items-center justify-center">
                <span className="block w-4 h-4 bg-blue-500 rounded"></span>
              </div>
              <span>Requests</span>
            </Link>
            <Link href="#" className="flex items-center px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800">
              <Users className="mr-3 h-5 w-5" />
              <span>Users</span>
            </Link>
            <Link href="#" className="flex items-center px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800">
              <Settings className="mr-3 h-5 w-5" />
              <span>Services</span>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <Link href="#" className="flex items-center px-3 py-2 text-gray-300 rounded-md hover:bg-gray-800">
            <BarChart2 className="mr-3 h-5 w-5" />
            <span>Performance</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              <input
                placeholder="Search for anything..."
                className="w-full h-10 pl-9 pr-4 rounded-md bg-transparent border border-gray-700 focus:border-blue-500 text-white"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="mr-2 p-2 rounded-md hover:bg-gray-800">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Admin admin</span>
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">A</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">REQUESTS</h1>

          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <div className="w-64">
              <p className="text-sm mb-2">Select Field of Use</p>
              <div className="relative">
                <button className="w-full h-10 px-4 flex items-center justify-between bg-transparent border border-gray-700 rounded-md text-white">
                  All
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>

            <div className="w-64">
              <p className="text-sm mb-2">Select by Date</p>
              <div className="relative">
                <button className="w-full h-10 px-4 flex items-center justify-between bg-transparent border border-gray-700 rounded-md text-white">
                  All Time
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>

            <div className="w-64">
              <p className="text-sm mb-2">search</p>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                <input className="w-full h-10 pl-9 pr-4 rounded-md bg-transparent border border-gray-700 text-white" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-800 rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-900">
              <div className="px-4 py-3 text-sm font-medium">FIELD OF USE</div>
              <div className="px-4 py-3 text-sm font-medium">DATE</div>
              <div className="px-4 py-3 text-sm font-medium">CLIENT NAME</div>
              <div className="px-4 py-3 text-sm font-medium">EMAIL</div>
              <div className="px-4 py-3 text-sm font-medium">PHONE NUMBER</div>
              <div className="px-4 py-3 text-sm font-medium">STATUS</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-800">
              {requestData.map((request, index) => (
                <TableRow key={index} {...request} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center">
            <div className="text-sm text-gray-400 mr-4">32 Total</div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 border border-blue-500 text-white">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent border border-gray-700 text-white">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent border border-gray-700 text-white">
                3
              </button>
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent border border-gray-700 text-white">
                7
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent border border-gray-700 text-white">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Table Row Component
function TableRow({ fieldOfUse, date, clientName, email, phone, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500"
      case "Approved":
        return "text-green-500"
      case "Rejected":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-6 hover:bg-gray-800/50">
      <div className="px-4 py-3 text-sm">{fieldOfUse}</div>
      <div className="px-4 py-3 text-sm">{date}</div>
      <div className="px-4 py-3 text-sm">{clientName}</div>
      <div className="px-4 py-3 text-sm">{email}</div>
      <div className="px-4 py-3 text-sm">{phone}</div>
      <div className="px-4 py-3 text-sm flex justify-between items-center">
        <span className={getStatusColor(status)}>{status}</span>
        <button className="h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-gray-700">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Sample data
const requestData = [
  {
    fieldOfUse: "Surveillance",
    date: "05 mar",
    clientName: "raivan",
    email: "radioxivan@gmail.com",
    phone: "+9876543210",
    status: "Pending",
  },
  {
    fieldOfUse: "Surveillance",
    date: "10 mar",
    clientName: "example",
    email: "ram123@gmail.com",
    phone: "+9876543210",
    status: "Pending",
  },
  {
    fieldOfUse: "Agriculture",
    date: "10 jan",
    clientName: "Lakhan",
    email: "lakhan123@gmail.com",
    phone: "+9876543210",
    status: "Approved",
  },
  {
    fieldOfUse: "Agriculture",
    date: "15 jan",
    clientName: "Aeran",
    email: "aeran123@gmail.com",
    phone: "+9876543210",
    status: "Approved",
  },
  {
    fieldOfUse: "Surveillance",
    date: "22 jan",
    clientName: "jiteksi",
    email: "jiteksi123@gmail.com",
    phone: "+9876543210",
    status: "Rejected",
  },
  {
    fieldOfUse: "Agriculture",
    date: "05 feb",
    clientName: "Irankis",
    email: "irankis123@gmail.com",
    phone: "+9876543210",
    status: "Rejected",
  },
]
