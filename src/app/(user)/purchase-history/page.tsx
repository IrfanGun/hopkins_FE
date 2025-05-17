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
}



export default function PurchaseHistory() {
  const [invoices, setPaymentData] = useState<any | null>(null);

 useEffect(() => {

    const storedCustomer : Customer | null = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');

    if(storedCustomer && storedCustomer?.data['id_stripe']) {
      const fetchData = async () => {
        const data = await getPaymentHistory(storedCustomer?.data.id_stripe);
    
         if (data) {
        setPaymentData(data);
      // Set ke state
        console.log("Data pembayaran disimpan ke state:", data);
      }
      }

         fetchData();
       

    }

  },[])

  return (
    <div className="h-full bg-gray-50">
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
                {invoices?.length > 0 ? (
                  invoices.map((invoice : Invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(invoice.amount_paid)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {invoice.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {new Date(invoice.date * 1000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No Data Available
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>

      
      </div>

      <FooterUser />
    </div>
  );
}
