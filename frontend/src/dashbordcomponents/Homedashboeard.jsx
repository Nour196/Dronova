import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Bell,
  Search,
  FileText,
  Settings,
} from "lucide-react";

export default function DronovaDashboard() {
  const [year, setYear] = useState(2025);

  const projectStats = [
    { name: "Completed", value: 32, color: "rgb(56, 189, 195)" },
    { name: "On Hold", value: 25, color: "rgb(149, 117, 205)" },
    { name: "In Progress", value: 25, color: "rgb(149, 117, 205)" },
    { name: "Pending", value: 18, color: "rgb(255, 99, 71)" },
  ];

  const requestsData = [
    {
      date: "24 Apr",
      client: "example",
      field: "Agriculture",
      status: "Pending",
      submitted: "--",
    },
    {
      date: "16 Feb",
      client: "example",
      field: "Agriculture",
      status: "Pending",
      submitted: "--",
    },
    {
      date: "11 Feb",
      client: "example",
      field: "Agriculture",
      status: "Approved",
      submitted: "01 Mar",
    },
    {
      date: "03 Feb",
      client: "example",
      field: "Surveillance",
      status: "Approved",
      submitted: "04 Mar",
    },
    {
      date: "01 Feb",
      client: "example",
      field: "Surveillance",
      status: "Rejected",
      submitted: "01 Mar",
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-48 border-r border-gray-800 p-4">
        <div className="text-cyan-400 font-bold text-xl mb-8 flex items-center">
          <span className="text-2xl mr-1">⚛</span> DRO
          <span className="text-blue-400">NOVA</span>
        </div>
        <nav className="space-y-2">
          {[
            {
              icon: <Home className="h-4 w-4 mr-2" />,
              label: "Home",
              active: true,
            },
            { icon: <FileText className="h-4 w-4 mr-2" />, label: "Requests" },
            { icon: <Users className="h-4 w-4 mr-2" />, label: "Users" },
            { icon: <Settings className="h-4 w-4 mr-2" />, label: "Services" },
          ].map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center px-3 py-2 rounded ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-4">
            <button className="w-full flex items-center px-3 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs mr-2">
                P
              </div>
              Performance
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Projects</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search for anything..."
                className="w-64 pl-8 py-2 rounded bg-gray-900 border border-gray-700 text-white"
              />
            </div>
            <button className="relative p-2 rounded hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span>Admin admin</span>
              <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Stats */}
          <section className="bg-gray-900 border border-gray-800 rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Projects Stats</h2>
              <span className="text-cyan-400 text-sm border border-cyan-400 px-2 py-1 rounded">
                This Week ▼
              </span>
            </div>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {(() => {
                    let cumulativePercent = 0;
                    return projectStats.map((data, i) => {
                      const startAngle = 2 * Math.PI * cumulativePercent;
                      cumulativePercent += data.value / 100;
                      const endAngle = 2 * Math.PI * cumulativePercent;

                      const x1 = 50 + 40 * Math.sin(startAngle);
                      const y1 = 50 - 40 * Math.cos(startAngle);
                      const x2 = 50 + 40 * Math.sin(endAngle);
                      const y2 = 50 - 40 * Math.cos(endAngle);

                      const largeArcFlag =
                        endAngle - startAngle > Math.PI ? 1 : 0;

                      const pathData = [
                        `M 50 50`,
                        `L ${x1} ${y1}`,
                        `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        `Z`,
                      ].join(" ");

                      return <path key={i} d={pathData} fill={data.color} />;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {projectStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3"
                      style={{ backgroundColor: stat.color }}
                    ></div>
                    <span>{stat.name}</span>
                  </div>
                  <span>{stat.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Chart */}
          <section className="bg-gray-900 border border-gray-800 rounded p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Performance</h2>
              <span className="text-cyan-400 text-sm border border-cyan-400 px-2 py-1 rounded">
                This Week ▼
              </span>
            </div>
            <div className="relative h-48">
              <svg
                className="w-full h-full"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
              >
                {[8, 6, 4, 2, 0].map((v, i) => (
                  <text
                    key={i}
                    x="5"
                    y={10 + i * 20}
                    className="text-xs fill-gray-400"
                  >
                    {v}
                  </text>
                ))}
                <path
                  d="M 30 60 C 60 80, 90 30, 120 60 C 150 90, 180 20, 210 40 C 240 60, 270 30, 290 50"
                  fill="none"
                  stroke="#9575cd"
                  strokeWidth="2"
                />
                <path
                  d="M 30 40 C 60 20, 90 60, 120 30 C 150 10, 180 60, 210 20 C 240 40, 270 10, 290 30"
                  fill="none"
                  stroke="#ff7043"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-400 mt-2 px-2">
                <span>Oct 2021</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
              </div>
              <div className="absolute top-2 right-2 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" /> 7
                  Projects
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" /> 5
                  Projects
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Requests Table */}
        <section className="mt-6 bg-gray-900 border border-gray-800 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Requests</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded hover:bg-gray-800">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span>{year}</span>
              <button className="p-2 rounded hover:bg-gray-800">
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="ml-4 text-sm text-cyan-400 hover:underline flex items-center">
                See more <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="py-2">Date</th>
                  <th>Client Name</th>
                  <th>Field of Use</th>
                  <th>Status</th>
                  <th>Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                {requestsData.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-800/50" : ""}>
                    <td className="py-2">{r.date}</td>
                    <td>{r.client}</td>
                    <td>{r.field}</td>
                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded border ${
                          r.status === "Approved"
                            ? "text-green-400 border-green-400 bg-green-900/20"
                            : r.status === "Rejected"
                            ? "text-red-400 border-red-400 bg-red-900/20"
                            : "text-yellow-400 border-yellow-400 bg-yellow-900/20"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>{r.submitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
