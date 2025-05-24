"use client";
import { useEffect, useState } from "react";
import axiosInstance from "src/api/axiosInstance";
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
  const [userGrowth, setUserGrowth] = useState([]);
  const [revenueData, setRevenueData] = useState([]);


  const getUserGrowth = async () => {
    try {
      const response = await axiosInstance.get("api/user-growth");
      setUserGrowth(response.data);
    } catch (error) {
      console.error("Error fetching user growth data:", error);
    }
  }

  const getRevenue = async () => {

      axiosInstance.get("/api/analytics/monthly-revenue")
      .then(res => {
        setRevenueData(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch revenue data", err);
      });

  
  }

  useEffect(() => {
    getUserGrowth();
    getRevenue();
  }, []);


  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold text-gray-700">
        Analytics 
      </h1>

  
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
      {/* <div className="mb-10 rounded-lg border bg-white p-4 shadow-sm">
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
      </div> */}
    </div>
  );
}
