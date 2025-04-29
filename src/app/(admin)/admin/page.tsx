import { Gift, Users, DollarSign, AlertCircle } from "lucide-react";
import QuickAccess from "./_components/QuickAccess";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Active Giveaways",
      value: "8",
      change: "+2",
      icon: <Gift className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Revenue",
      value: "$24,567",
      change: "+18%",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Open Tickets",
      value: "23",
      change: "-5",
      icon: <AlertCircle className="h-6 w-6 text-red-500" />,
    },
  ];

  // Sample recent activities
  const recentActivities = [
    {
      id: 1,
      action: "New category added",
      category: "Automotive",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Banner updated",
      category: "Homepage",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "New giveaway created",
      category: "Ford F150 Raptor",
      time: "1 day ago",
    },
    {
      id: 4,
      action: "Support ticket resolved",
      category: "Ticket #4582",
      time: "1 day ago",
    },
    {
      id: 5,
      action: "Pop-up message updated",
      category: "Discount Code",
      time: "2 days ago",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-800">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-green-500">
                  {stat.change}
                </p>
              </div>
              <div className="rounded-full bg-gray-100 p-3">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <QuickAccess />

      {/* Recent activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Recent Activity
        </h2>
        <div className="overflow-hidden rounded-lg border bg-white shadow">
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.category}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
