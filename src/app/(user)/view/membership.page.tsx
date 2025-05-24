"use client";
import Link from "next/link";
import Header from "../../components/layout/header";
import { ChevronRight,
  Home,
  Copy,
  Award,
  Gift,
  Zap,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  LogOut, } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FooterUser from "../../components/ui/footer-user";
import { fetchBanner } from "src/lib/banners";
import getCustomerDetails from "src/lib/getCustomerDetails";
import getSubscriptionDetails from "src/lib/getSubscriptionDetails";


export default function Membership() {
  const [isCopied, setIsCopied] = useState(false);
  const [isBanner, setIsBanner] = useState<null | string >('');
  const [expandedSection, setExpandedSection] = useState("stats");
  const [isLoading, setIsLoading] = useState(true);
  const [customerData, setCustomerData] = useState<any>(null);
  const [initial, setInitial] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Fungsi untuk menyalin kode ke clipboard
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true); // Set copied state menjadi true
      // Reset status copied setelah beberapa detik (misalnya 2 detik)
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection("")
    } else {
      setExpandedSection(section)
    }
  }
  
  const getData = () => {

    
    const storedCustomer = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');
    setDate(storedCustomer.created_at);
    setInitial(storedCustomer.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase());
    if( storedCustomer.id_stripe !== null) {
      const fetchData = async () => {
        const customerDetails = await getCustomerDetails(storedCustomer.id_stripe);
        const subscriptionData = await getSubscriptionDetails(storedCustomer.id_stripe);

         setCustomerData({
          customer: customerDetails,
          subscription: subscriptionData

        });
     
         setIsLoading(false);
       
      }

         fetchData();

    }

  }


  useEffect(() => {
    loadSlider();
    getData();
    
  },[])

  const loadSlider = async () => {
       try {
  
   
        const response = await fetchBanner();

      const getBanner = response
        .filter((banner) => banner.page === "Membership" && banner.active == true )
        .map((banner) => banner.image);

        setIsBanner(getBanner[0] ?? null);
       
       } catch (error) {
          // setIsLoading(false);
       } 
    
      };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Main Content */}
      <main className="relative pb-20">
        {/* Banner Section */}
        <div className="relative">
          <div className="h-64 w-full overflow-hidden border-b border-orange-700 md:h-80">
            {isBanner && isBanner.length > 0 ? (
              <img
                className="h-full w-full object-cover"
                src={isBanner || "/placeholder.svg"}
                alt="Membership Banner"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-orange-600 to-orange-400">
                <p className="text-white opacity-50">Banner loading...</p>
              </div>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          </div>

          {/* Breadcrumb - Floating on top of banner */}
          <div className="absolute left-0 top-0 w-full px-4 pt-6">
            <div className="container mx-auto">
              <div className="flex items-center text-sm text-white">
                <Link href="/" className="opacity-80 hover:opacity-100">
                  <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="mx-2 h-4 w-4 opacity-80" />
                <Link href="/membership" className="opacity-80 hover:opacity-100">
                  Membership
                </Link>
              </div>
            </div>
          </div>

          {/* Banner Title */}
          <div className="absolute left-0 top-1/3 w-full transform px-4 text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl">
              Manage Subscription
            </h1>
          </div>
        </div>

        {/* Hexagonal Profile Card */}
        <div className="container relative mx-auto px-4">
          <div className="relative mx-auto flex max-w-5xl flex-col items-center -translate-y-16">
            <div className="clip-hexagon relative mb-12 flex h-32 w-32 items-center justify-center bg-white shadow-lg">
              <div className="clip-hexagon-inner absolute inset-1 bg-gradient-to-br from-orange-500 to-orange-400 p-4">
                <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">{initial}</div>
              </div>
            </div>

            <div className="absolute -bottom-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              ACTIVE
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Membership Title */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                <span className="text-orange-500">ENTRY</span> MEMBERSHIP
              </h2>
              <p className="mt-2 text-gray-600">Member since {date}</p>
            </div>

            {/* Interactive Tabs */}
            <div className="mb-8 flex justify-center">
              <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white shadow-md">
                Dashboard
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="space-y-6">
              {/* Stats Hexagons */}
              <div
                className="cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
                onClick={() => toggleSection("stats")}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Your Stats</h2>
                  {expandedSection === "stats" ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {expandedSection === "stats" && (
                  <div className="mt-4">
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="stats-hexagon bg-orange-500">
                        <div className="stats-content">
                          <Award className="h-8 w-8 text-orange-200" />
                          <div className="mt-2 text-3xl font-bold">{customerData?.subscription.entries}</div>
                          <div className="text-xs">Current Entries</div>
                        </div>
                      </div>

                      <div className="stats-hexagon bg-black">
                        <div className="stats-content">
                          <Gift className="h-8 w-8 text-gray-300" />
                          <div className="mt-2 text-3xl font-bold">$200k</div>
                          <div className="text-xs">Upcoming Prizes</div>
                        </div>
                      </div>

                      <div className="stats-hexagon bg-orange-500">
                        <div className="stats-content">
                          <Zap className="h-8 w-8 text-orange-200" />
                          <div className="mt-2 text-3xl font-bold">$0</div>
                          <div className="text-xs">Current Prizes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Code */}
              <div
                className="cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
                onClick={() => toggleSection("discount")}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Discount Code</h2>
                  {expandedSection === "discount" ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {expandedSection === "discount" && (
                  <div className="mt-6">
                    <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 p-6">
                      <div className="absolute -right-6 -top-6 h-16 w-16 rotate-45 bg-orange-500"></div>
                      <div className="absolute -left-6 -bottom-6 h-16 w-16 rotate-45 bg-orange-500"></div>

                      <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">Hopkins+ Store Discount</h3>

                      <div className="relative mx-auto mb-4 flex items-center justify-between overflow-hidden rounded-lg bg-white p-1 shadow-inner">
                        <div className="flex-1 px-4 py-3 text-center font-mono text-lg font-bold text-orange-600">
                          15ENTRYHopkins
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyCode("15ENTRYHopkins")
                          }}
                          className="rounded-md bg-orange-500 px-4 py-3 text-white transition-all hover:bg-orange-600"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                      </div>

                      {isCopied && (
                        <div className="text-center text-sm font-medium text-green-600">Code copied to clipboard!</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Membership Options */}
              <div
                className="cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
                onClick={() => toggleSection("options")}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Membership Options</h2>
                  {expandedSection === "options" ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>

               {expandedSection === "options" && (
                <div className="mt-4 space-y-3">
                  {/* Baris pertama: 1 item */}
                  <div className="grid grid-cols-1 ">
                    <Link href="/upgrade">
                      <div className="flex cursor-pointer justify-center  items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div >
                          <h3 className="font-semibold text-gray-800">Changes Plan</h3>
                          <p className="text-sm text-gray-600">Get more entries and benefits</p>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Baris kedua: 2 item */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="/purchase-history">
                      <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Billing Details</h3>
                          <p className="text-sm text-gray-600">Manage payment information</p>
                        </div>
                      </div>
                    </Link>

                    <Link href="/cancel">
                      <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-red-100 p-3 text-red-500">
                          <LogOut className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">Cancel Plan</h3>
                          <p className="text-sm text-red-600">End your subscription</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              </div>

              {/* Return to Profile Button */}
              <div className="mt-8 text-center">
                <Link href="/user">
                  <button className="rounded-full bg-orange-500 px-8 py-3 font-medium text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg">
                    Return To Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom CSS for hexagon shapes */}
      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .clip-hexagon-inner {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .stats-hexagon {
          position: relative;
          width: 140px;
          height: 160px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }
        
        .stats-hexagon:hover {
          transform: translateY(-5px);
        }
        
        .stats-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
        }
      `}</style>

      <FooterUser />
    </div>
  )

  
}
