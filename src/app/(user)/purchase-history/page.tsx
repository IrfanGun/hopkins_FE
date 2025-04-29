"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import Header from "../../components/layout/header";
import FooterUser from "../../components/ui/footer-user";

// Sample purchase history data
const invoices = [
  {
    id: 1,
    amount: "$19.99",
    title: "Invoice D20241D5-0002",
    status: "Succeeded",
    created: "March 18, 2025, 3:25 AM",
  },
  {
    id: 2,
    amount: "$19.99",
    title: "Subscription creation",
    status: "Succeeded",
    created: "February 18, 2025, 2:25 AM",
  },
  {
    id: 3,
    amount: "$19.99",
    title: "Subscription creation",
    status: "Succeeded",
    created: "February 19, 2025, 2:25 AM",
  },
];

const standardPackages = [
  {
    id: 3,
    amount: "$15",
    title:
      "Hopkins Plus | admin@rsg-wa.com.au | Product: Early Bird Standard Discounted Package | 10 X 5 Free Entries | $2 Million [50]",
    status: "Succeeded",
    created: "February 25, 2025, 4:08 PM",
  },
  {
    id: 4,
    amount: "$30",
    title:
      "Hopkins Plus | admin@rsg-wa.com.au | Product: Early Bird Standard Package | 10 X 5 Free Entries | $2 Million [50]",
    status: "Succeeded",
    created: "February 25, 2025, 4:08 PM",
  },
];

const bronzePackages = [
  {
    id: 5,
    amount: "$15",
    title:
      "Hopkins Plus | admin@rsg-wa.com.au | Product: Early Bird Bronze Discounted Package | 10 X 5 Free Entries | 10 Winners 100K Each [50]",
    status: "Succeeded",
    created: "February 13, 2025, 12:26 PM",
  },
  {
    id: 6,
    amount: "$30",
    title:
      "Hopkins Plus | admin@rsg-wa.com.au | Product: Early Bird Bronze Package | 10 X 5 Free Entries | 10 Winners 100K Each [50]",
    status: "Succeeded",
    created: "February 13, 2025, 12:26 PM",
  },
];

export default function PurchaseHistory() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="flex items-center">
            <Home className="mr-1 h-4 w-4" />
          </Link>
          <span>›</span>
          <span className="text-gray-500">Purchase History</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          PURCHASE HISTORY
        </h1>

        {/* Invoices Table */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {invoice.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {invoice.created}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standard Packages Table */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standardPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {pkg.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {pkg.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                        {pkg.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {pkg.created}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bronze Packages Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bronzePackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {pkg.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {pkg.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                        {pkg.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {pkg.created}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FooterUser />
    </div>
  );
}
