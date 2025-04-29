"use client";

import { Card, CardContent } from "../../../components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const userGrowth = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 210 },
    { month: "Mar", users: 290 },
    { month: "Apr", users: 340 },
    { month: "May", users: 420 },
  ];

  const ticketStats = [
    { name: "Open", value: 12 },
    { name: "Pending", value: 5 },
    { name: "Closed", value: 17 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 300 },
    { month: "Feb", revenue: 600 },
    { month: "Mar", revenue: 900 },
    { month: "Apr", revenue: 1200 },
    { month: "May", revenue: 1400 },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="py-6">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-semibold text-gray-800">5,830</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <h3 className="text-sm text-gray-500">Active Giveaways</h3>
            <p className="text-2xl font-semibold text-gray-800">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <h3 className="text-sm text-gray-500">Open Tickets</h3>
            <p className="text-2xl font-semibold text-gray-800">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-semibold text-gray-800">$14,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart: User Growth */}
      <div className="mb-10 rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          User Growth
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Revenue */}
      <div className="mb-10 rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Monthly Revenue
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Ticket Status */}
      <div className="mb-10 rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Support Ticket Status
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart layout="vertical" data={ticketStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
