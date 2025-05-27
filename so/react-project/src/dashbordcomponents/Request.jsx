import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Surveillance", "Agriculture"],
  datasets: [
    {
      label: "Requests",
      data: [3, 3],
      backgroundColor: ["#3B82F6", "#10B981"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: { color: "#fff" },
    },
    title: {
      display: true,
      text: "Requests by Field of Use",
      color: "#fff",
    },
  },
  scales: {
    x: { ticks: { color: "#fff" }, grid: { color: "#374151" } },
    y: { ticks: { color: "#fff" }, grid: { color: "#374151" } },
  },
};

const requests = [
  {
    field: "Surveillance",
    date: "05 mar",
    name: "raivan",
    email: "radioxivan@gmail.com",
    phone: "+9876543210",
    status: "Pending",
  },
  {
    field: "Surveillance",
    date: "10 mar",
    name: "example",
    email: "ram123@gmail.com",
    phone: "+9876543210",
    status: "Pending",
  },
  {
    field: "Agriculture",
    date: "10 jan",
    name: "Lakhan",
    email: "lakhan123@gmail.com",
    phone: "+9876543210",
    status: "Approved",
  },
  {
    field: "Agriculture",
    date: "15 jan",
    name: "Aeran",
    email: "aeran123@gmail.com",
    phone: "+9876543210",
    status: "Approved",
  },
  {
    field: "Surveillance",
    date: "22 jan",
    name: "jiteksi",
    email: "jiteksi123@gmail.com",
    phone: "+9876543210",
    status: "Rejected",
  },
  {
    field: "Agriculture",
    date: "05 feb",
    name: "Irankis",
    email: "irankis123@gmail.com",
    phone: "+9876543210",
    status: "Rejected",
  },
];

const Dashboard2 = () => {
  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">REQUESTS</h1>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <select className="bg-gray-800 text-white p-2 rounded">
          <option>All</option>
          <option>Agriculture</option>
          <option>Surveillance</option>
        </select>
        <select className="bg-gray-800 text-white p-2 rounded">
          <option>All Time</option>
        </select>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-6 gap-2 bg-gray-900 p-2 rounded font-semibold">
        <div>FIELD OF USE</div>
        <div>DATE</div>
        <div>CLIENT NAME</div>
        <div>EMAIL</div>
        <div>PHONE NUMBER</div>
        <div>STATUS</div>
      </div>

      {requests.map((req, idx) => (
        <div
          key={idx}
          className="grid grid-cols-6 gap-2 items-center bg-gray-800 my-2 p-2 rounded"
        >
          <div>{req.field}</div>
          <div>{req.date}</div>
          <div>{req.name}</div>
          <div>{req.email}</div>
          <div>{req.phone}</div>
          <div
            className={`text-sm px-2 py-1 rounded-full ${
              req.status === "Approved"
                ? "bg-green-600"
                : req.status === "Rejected"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
          >
            {req.status}
          </div>
        </div>
      ))}

      <div className="mt-10">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default Dashboard2;
