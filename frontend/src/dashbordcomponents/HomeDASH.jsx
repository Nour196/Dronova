import { useState } from "react"
import { Bell, Edit, Home, PieChart, Search, Users } from "lucide-react"

export default function ProfileDetails() {
  const [name, setName] = useState("Safelet")
  const [email, setEmail] = useState("safelet@gmail.com")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#111] p-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-blue-400 text-2xl font-bold">DRO</span>
          <span className="text-white text-2xl font-bold">NOVA</span>
        </div>

        <SidebarButton active icon={<Home className="h-5 w-5" />} label="Home" />
        <SidebarButton icon={<Users className="h-5 w-5" />} label="Requests" />
        <SidebarButton icon={<Users className="h-5 w-5" />} label="Users" />
        <SidebarButton icon={<Users className="h-5 w-5" />} label="Services" />

        <div className="mt-6 flex items-center gap-2 px-2 text-gray-400 text-sm">
          <PieChart className="h-5 w-5" />
          <span>Performance</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Search for anything..."
              className="pl-10 pr-3 py-2 bg-transparent border border-gray-700 text-sm rounded-md w-full text-white placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-gray-400" />
            <span className="text-sm">Admin admin</span>
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <div className="flex-1 p-8 bg-[#222]">
          <h1 className="text-2xl font-bold mb-8">PROFILE DETAILS</h1>

          <div className="flex gap-8 mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl">
                S
              </div>
              <div className="absolute bottom-0 right-0 bg-gray-600 p-1 rounded-full">
                <Edit className="h-4 w-4" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-medium">{name}</h2>
              <p className="text-gray-400">{email}</p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-[#333] border border-gray-700 rounded-md text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 bg-[#333] border border-gray-700 rounded-md text-white focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm"
            >
              <Edit className="h-4 w-4" />
              {isEditing ? "Save" : "Edit Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarButton({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full 
        ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}
    >
      {icon}
      {label}
    </button>
  )
}
