'use client'
import { Gift, Users, DollarSign, Package } from "lucide-react";
import QuickAccess from "./_components/QuickAccess";
import AnalyticsPage from "./analytics/page";
import stripeInstance from "src/api/stripeInstance";
import { useState, useEffect } from "react";
import { getStripeStats } from "src/lib/stats";
import { ThemeProvider,Spinner } from "flowbite-react";
import baseTheme from "src/components/ui/spinner-custom-base";
import axiosInstance from "src/api/axiosInstance";


type StatsItem = {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element;
};

export default function AdminDashboard() {

  const [currentRevenue, setCurrentRevenue] = useState<number>(0);
  const [lastWeekRevenue, setLastWeekRevenue] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);
  const [activeSubscribers, setActiveSubscribers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countData, setCountData] = useState<any>(null);
  
    const fetchStats = async () => {
      try {
        const stats = await getStripeStats();
        setCurrentRevenue(stats.currentRevenue);
        setLastWeekRevenue(stats.lastWeekRevenue);
        setCurrency(stats.currency.toUpperCase());
        setTotalSubscribers(stats.totalSubscribers ?? 0);
        setActiveSubscribers(stats.activeSubscribers ?? 0);

      } catch (err) {
        setError('Failed to load revenue');
        
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("api/count-products");
        const products = response.data;
        setCountData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

   useEffect(() => {

    fetchProducts();
    fetchStats();

  }, []);

  if (loading) return <div className="text-center">  <ThemeProvider theme={baseTheme}>
          <Spinner color="base" />
          </ThemeProvider>.</div>;
  if (error) return <div>Error: {error}</div>;

  const delta = lastWeekRevenue
    ? ((currentRevenue - lastWeekRevenue) / lastWeekRevenue) * 100
    : 0;

  const stats = [
    {
      title: "Revenue",
      value: `${currency} ${currentRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      change:"",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Total Subscribers",
      value: totalSubscribers.toLocaleString(),
      change: "",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Active Subscribers",
      value: activeSubscribers.toLocaleString(),
      change: "", 
      icon: <Gift className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Total Products",
      value: countData?.totalProducts.toLocaleString() || "0",
      change: countData?.newProducts.toLocaleString() || "0",
      icon:  <Package className="h-6 w-6 text-blue-500" />,
    },
  ];

  // const stats = [
  //   {
  //     title: "Total Users",
  //     value: "12,345",
  //     change: "+12%",
  //     icon: <Users className="h-6 w-6 text-blue-500" />,
  //   },
  //   {
  //     title: "Active Giveaways",
  //     value: "8",
  //     change: "+2",
  //     icon: <Gift className="h-6 w-6 text-purple-500" />,
  //   },
  //   {
  //     title: "Revenue",
  //     value: "$24,567",
  //     change: "+18%",
  //     icon: <DollarSign className="h-6 w-6 text-green-500" />,
  //   },
  //   {
  //     title: "Open Tickets",
  //     value: "23",
  //     change: "-5",
  //     icon: <AlertCircle className="h-6 w-6 text-red-500" />,
  //   },
  // ];

  // Sample recent activities
  // const recentActivities = [
  //   {
  //     id: 1,
  //     action: "New category added",
  //     category: "Automotive",
  //     time: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     action: "Banner updated",
  //     category: "Homepage",
  //     time: "5 hours ago",
  //   },
  //   {
  //     id: 3,
  //     action: "New giveaway created",
  //     category: "Ford F150 Raptor",
  //     time: "1 day ago",
  //   },
  //   {
  //     id: 4,
  //     action: "Support ticket resolved",
  //     category: "Ticket #4582",
  //     time: "1 day ago",
  //   },
  //   {
  //     id: 5,
  //     action: "Pop-up message updated",
  //     category: "Discount Code",
  //     time: "2 days ago",
  //   },
  // ];

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

      {/* Analytics */}
      
      {/* Analytic Graphs */}
       
      <AnalyticsPage /> {/* Panggil Komponen Analytics */}

    

    </div>
  );
}
