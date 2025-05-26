"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import Header from "../../components/layout/header";
import FooterUser from "../../components/ui/footer-user";
import getPaymentHistory from "src/lib/paymentHistory";
import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

// Sample purchase history data

interface Customer {
 data: {
    email: string;
    id: number;
    id_stripe: string;
    name: string;
    role: string;
  }
}

interface Invoice {
   id: string,
    amount_paid: number,
    currency: string,
    status : string,
    date : number,
    description : string,
    url : string
}



export default function PurchaseHistory() {
  const [invoices, setPaymentData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

 useEffect(() => {

    const storedCustomer = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');
  
  try {
      setIsLoading(true)
    if(storedCustomer.id_stripe !== null) {
      const fetchData = async () => {
        const data = await getPaymentHistory(storedCustomer?.id_stripe);
    
         if (data) {
        setPaymentData(data);

      }
      }

         fetchData();
       setIsLoading(true)

    }
  } catch (error) {
     setError("Failed to load payment history. Please try again later.")
  } finally {
    setIsLoading(false);
  }
    

  },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="flex items-center hover:text-orange-500 transition-colors">
            <Home className="mr-1 h-4 w-4" />
            <span>Home</span>
          </Link>
          <span>›</span>
          <span className="text-gray-500">Purchase History</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="mb-8 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Purchase History</h1>
          <p className="mt-2 opacity-90">View and manage your subscription payments history</p>
        </div>

        {/* Invoices Table */}
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-md">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-500 mb-2">⚠️ {error}</div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-orange-800">
                      Amount
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-orange-800">
                      Description
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-orange-800">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-orange-800">Date</th>
                       <th className="whitespace-nowrap px-6 py-4 text-left text-sm font-medium text-orange-800">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoices && invoices.length > 0 ? (
                    invoices.map((invoice: Invoice) => (
                      <tr key={invoice.id} className="hover:bg-orange-50 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: invoice.currency,
                          }).format(invoice.amount_paid)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{invoice.description}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {invoice.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                          {new Date(invoice.date * 1000).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700"> <a href={invoice.url}   target="_blank"    rel="noopener noreferrer" className="hover:bg-orange-500 p-2 hover:text-white text-orange-500 border-2 border-orange-500 cursor-pointer transition-colors duration-200 ease-in-out rounded-md ">
                          View 
                        </a></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-4 rounded-full bg-orange-100 p-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-orange-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">No purchase history found</h3>
                          <p className="mt-1 text-gray-500">You haven't made any purchases yet.</p>
                          <Link
                            href="/membership"
                            className="mt-4 inline-flex items-center rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                          >
                            View Membership Options
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <FooterUser />
    </div>
  )
}
