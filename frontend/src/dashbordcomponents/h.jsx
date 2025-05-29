import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Sidebar from './Sidebar';
import { Search } from 'lucide-react';
import axios from 'axios';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [pieData, setPieData] = useState({
    labels: ['Agriculture', 'Security', 'Industry', 'Customise'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#3b82f6', '#a855f7', '#22c55e', '#ef4444'],
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        borderColor: '#f97316',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Customers',
        data: [],
        borderColor: '#6366f1',
        fill: false,
        tension: 0.4,
      },
    ],
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchOrdersData();
  }, []);

  const fetchOrdersData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      // Fetch both orders and users data
      const [ordersResponse, usersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        axios.get('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (ordersResponse.data && Array.isArray(ordersResponse.data)) {
        // Transform orders data for the table
        const transformedRequests = ordersResponse.data.map(order => ({
          date: new Date(order.scheduledDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
          client: order.userId?.name || 'N/A',
          field: order.serviceType || 'N/A',
          status: order.status || 'pending',
          submitted: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '--'
        }));

        setRequests(transformedRequests);

        // Process data for line chart
        const last5Months = Array.from({ length: 5 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return date.toLocaleString('default', { month: 'short', year: 'numeric' });
        }).reverse();

        // Get customers (users with role 'customer')
        const customers = usersResponse.data.filter(user => user.role === 'customer');

        // Count orders and customers per month
        const monthlyData = last5Months.map(month => {
          const monthOrders = ordersResponse.data.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.toLocaleString('default', { month: 'short', year: 'numeric' }) === month;
          });

          const monthCustomers = customers.filter(customer => {
            const customerDate = new Date(customer.createdAt);
            return customerDate.toLocaleString('default', { month: 'short', year: 'numeric' }) === month;
          });

          return {
            month,
            orders: monthOrders.length,
            customers: monthCustomers.length
          };
        });

        // Update line chart data
        setLineData({
          labels: last5Months,
          datasets: [
            {
              label: 'Orders',
              data: monthlyData.map(data => data.orders),
              borderColor: '#f97316',
              fill: false,
              tension: 0.4,
            },
            {
              label: 'Customers',
              data: monthlyData.map(data => data.customers),
              borderColor: '#6366f1',
              fill: false,
              tension: 0.4,
            },
          ],
        });

        // Count orders by service type for pie chart
        const counts = {
          agriculture: 0,
          security: 0,
          industry: 0,
          customise: 0
        };

        ordersResponse.data.forEach(order => {
          const serviceType = order.serviceType?.toLowerCase();
          if (serviceType && counts.hasOwnProperty(serviceType)) {
            counts[serviceType]++;
          }
        });

        // Update pie chart data
        setPieData({
          labels: ['Agriculture', 'Security', 'Industry', 'Customise'],
          datasets: [
            {
              data: [
                counts.agriculture,
                counts.security,
                counts.industry,
                counts.customise
              ],
              backgroundColor: ['#3b82f6', '#a855f7', '#22c55e', '#ef4444'],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
        <main className="flex-1 space-y-6 p-8">
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Service Distribution</h3>
                <button className="bg-teal-600 px-2 py-1 rounded text-sm">This Week ▼</button>
              </div>
              <Pie data={pieData} />
            </div>

            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Performance</h3>
                <button className="bg-teal-600 px-2 py-1 rounded text-sm">This Week ▼</button>
              </div>
              <Line data={lineData} />
            </div>
          </section>

          <section className="bg-gray-800 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Requests</h3>
              <div className="flex items-center gap-2">
                <button className="px-2">←</button>
                <span className="text-lg">2025</span>
                <button className="px-2">→</button>
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Date</th>
                  <th>Client Name</th>
                  <th>Field of Use</th>
                  <th>Status</th>
                  <th>Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="py-2">{r.date}</td>
                    <td>{r.client}</td>
                    <td>{r.field}</td>
                    <td className={r.status === 'accepted' ? 'text-green-500' : 
                                  r.status === 'rejected' ? 'text-red-500' : 
                                  'text-yellow-500'}>
                      {r.status}
                    </td>
                    <td>{r.submitted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-2 text-blue-400 cursor-pointer">See more →</div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;