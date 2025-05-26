"use client";
import Link from "next/link";
import Header from "../../components/layout/header";
import {
  ChevronRight,
  Home,
  Copy,
  Award,
  Gift,
  Zap,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import FooterUser from "../../components/ui/footer-user";
import { fetchBanner } from "src/lib/banners";
import MobileBottomNavigationBar from "src/app/components/layout/MobileBottomNavigationBar";
import axiosInstance from "src/api/axiosInstance";
import getCustomerDetails from "src/lib/getCustomerDetails";
import getSubscriptionDetails from "src/lib/getSubscriptionDetails";

export default function MembershipMobile() {
  const [isCopied, setIsCopied] = useState(false);
  const [isBanner, setIsBanner] = useState<null | string>("");
  const [expandedSection, setExpandedSection] = useState("stats");
  const [customerData, setCustomerData] = useState<any>(null);
  const [initial, setInitial] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection("");
    } else {
      setExpandedSection(section);
    }
  };

  //Get Data from cookie
  const getData = () => {
    const storedCustomer = JSON.parse(
      localStorage.getItem("customer-hopkins") || "null",
    );
    const storedToken = localStorage.getItem("token"); // ✅ ini benar

    setToken(storedToken || "");
    setDate(storedCustomer.created_at);
    setInitial(
      storedCustomer.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
    );
    if (storedCustomer.id_stripe !== null) {
      const fetchData = async () => {
        const customerDetails = await getCustomerDetails(
          storedCustomer.id_stripe,
        );
        const subscriptionData = await getSubscriptionDetails(
          storedCustomer.id_stripe,
        );

        setCustomerData({
          customer: customerDetails,
          subscription: subscriptionData,
        });

        setIsLoading(false);
      };

      fetchData();
    }
  };

  const loadSlider = async () => {
    try {
      const response = await fetchBanner();

      const getBanner = response
        .filter(
          (banner) => banner.page === "Membership" && banner.active == true,
        )
        .map((banner) => banner.image);

      setIsBanner(getBanner[0] ?? null);
    } catch (error) {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSlider();
    getData();
  }, []);

  const handleBillingClick = (action: "cancel" | "update") => {
    const currentDomain = window.location.origin; // misal https://example.com
    const returnUrl = `${currentDomain}/dashboard`;
    const ManagerBilling = async () => {
      try {
        const res = await axiosInstance.post(
          "api/stripe/portal",
          {
            return_url: returnUrl,
            action: action, // kirim action ke backend
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const billingUrl = res.data.url;
        if (billingUrl) {
          window.location.href = billingUrl;
        } else {
          alert("Failed to retrieve billing URL.");
        }
      } catch (error) {
        alert("An error occurred while accessing the billing portal.");
      }
    };

    ManagerBilling();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Main Content */}
      <main className="relative pb-20">
        {/* Banner Section */}
        <div className="relative">
          <div className="h-48 w-full overflow-hidden">
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

          {/* Curved bottom edge */}
          <div className="absolute bottom-0 h-12 w-full">
            <svg
              viewBox="0 0 1440 100"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                fill="rgb(249, 250, 251)"
                fillOpacity="1"
                d="M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,16C840,11,960,21,1080,42.7C1200,64,1320,96,1380,112L1440,128L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
              ></path>
            </svg>
          </div>

          {/* Breadcrumb - Floating on top of banner */}
          <div className="absolute left-0 top-0 w-full px-4 pt-4">
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

          {/* Banner Title */}
          <div className="absolute left-0 top-1/3 w-full transform px-4 text-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              Manage Subscription
            </h1>
          </div>
        </div>

        {/* Hexagonal Profile Card */}
        <div className="container relative mx-auto px-4">
          <div className="relative mx-auto flex -translate-y-10 flex-col items-center">
            <div className="clip-hexagon relative mb-10 flex h-24 w-24 items-center justify-center bg-white shadow-lg">
              <div className="clip-hexagon-inner absolute inset-1 bg-gradient-to-br from-orange-500 to-orange-400 p-4">
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                  J
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              ACTIVE
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container relative mx-auto px-4 pt-4">
          {/* Membership Title */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-orange-500">ENTRY</span> MEMBERSHIP
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Member since November 2023
            </p>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            {/* Stats Section */}
            <div
              className="cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
              onClick={() => toggleSection("stats")}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Your Stats</h2>
                {expandedSection === "stats" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              {expandedSection === "stats" && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center rounded-lg bg-orange-500 p-3 text-white">
                    <div className="mr-3 rounded-full bg-orange-600 p-2">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">Current Entries</div>
                      <div className="text-2xl font-bold">2</div>
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg bg-black p-3 text-white">
                    <div className="mr-3 rounded-full bg-gray-800 p-2">
                      <Gift className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">Upcoming Prizes</div>
                      <div className="text-2xl font-bold">$200,000</div>
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg bg-orange-500 p-3 text-white">
                    <div className="mr-3 rounded-full bg-orange-600 p-2">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">Current Prizes</div>
                      <div className="text-2xl font-bold">$0</div>
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
                <h2 className="text-lg font-bold text-gray-800">
                  Discount Code
                </h2>
                {expandedSection === "discount" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              {expandedSection === "discount" && (
                <div className="mt-4">
                  <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-orange-300 bg-orange-50 p-4">
                    <div className="absolute -right-4 -top-4 h-10 w-10 rotate-45 bg-orange-500"></div>
                    <div className="absolute -bottom-4 -left-4 h-10 w-10 rotate-45 bg-orange-500"></div>

                    <h3 className="mb-3 text-center text-base font-semibold text-gray-800">
                      Hopkins+ Store Discount
                    </h3>

                    <div className="relative mx-auto mb-2 flex items-center justify-between overflow-hidden rounded-lg bg-white p-1 shadow-inner">
                      <div className="flex-1 px-3 py-2 text-center font-mono text-base font-bold text-orange-600">
                        15ENTRYHopkins
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyCode("15ENTRYHopkins");
                        }}
                        className="rounded-md bg-orange-500 px-3 py-2 text-white transition-all hover:bg-orange-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>

                    {isCopied && (
                      <div className="text-center text-xs font-medium text-green-600">
                        Code copied to clipboard!
                      </div>
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
                <h2 className="text-lg font-bold text-gray-800">
                  Membership Options
                </h2>
                {expandedSection === "options" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>

              {expandedSection === "options" && (
                <div className="mt-4 space-y-3">
                  {/* Baris pertama: 1 item */}
                  <div className="grid grid-cols-1">
                    <div onClick={() => handleBillingClick("update")}>
                      <div className="flex cursor-pointer items-center  rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Changes Plan
                          </h3>
                          <p className="text-sm text-gray-600">
                            Get more entries and benefits
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Baris kedua: 2 item */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="/purchase-history">
                      <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-orange-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Billing Details
                          </h3>
                          <p className="text-sm text-gray-600">
                            Manage payment information
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div onClick={() => handleBillingClick("cancel")}>
                      <div className="flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md">
                        <div className="mr-4 rounded-full bg-red-100 p-3 text-red-500">
                          <LogOut className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Cancel Plan
                          </h3>
                          <p className="text-sm text-red-600">
                            End your subscription
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Return to Profile Button */}
          <div className="mt-8 text-center">
            <Link href="/user">
              <button className="w-full rounded-full bg-orange-500 py-3 font-medium text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg">
                Return To Profile
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Custom CSS for hexagon shapes */}
      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }

        .clip-hexagon-inner {
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
        }
      `}</style>
      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  );
}
