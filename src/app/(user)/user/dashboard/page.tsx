"use client";
import Link from "next/link";
import MainContent from "../../_components/main-content"; 
import CategoriesCarousel from "../../_components/categories-carousel";
import Header from "../../../components/layout/header";
import { Home, X } from "lucide-react";
import ExclusivePartner from "../../_components/exclusive-partner";
import FeaturedPartner from "../../_components/featured-partner";//
import FeaturedAffiliatePartner from "../../_components/featured-affilate-partner";//
import NewPartner from "../../_components/new-partner";//
import AffilliatePartner from "../../_components/affilliate-partner";
import FeaturedStores from "../../_components/featured-stores";
import AllCategories from "../../_components/all-categories";
import FooterUser from "../../../components/ui/footer-user";
import { useEffect, useState } from "react";
import MobileMenu from "../../../components/layout/MobileMenuButton";
import MobileMenuButton from "../../../components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "../../../components/layout/MobileBottomNavigationBar";
import getCustomerDetails from "src/lib/getCustomerDetails";
import getSubscriptionDetails from "src/lib/getSubscriptionDetails";
import { Star, TrendingUp, Clock, Award, ChevronRight } from "lucide-react"


interface Customer {
 data: {
    email: string;
    id: number;
    id_stripe: string;
    name: string;
    role: string;
  }
}


export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customerData, setCustomerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    const storedCustomer : Customer | null = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');

    if(storedCustomer && storedCustomer?.data['id_stripe']) {
      const fetchData = async () => {
        const customerData = await getCustomerDetails(storedCustomer?.data.id_stripe);
        const subscriptionData = await getSubscriptionDetails(storedCustomer?.data.id_stripe);

         setCustomerData({
          customer: customerData,
          subscription: subscriptionData

        });
         setIsLoading(false)
       
      }

         fetchData();
       

    }

    
 

  },[])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

   return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Mobile Navigation Button */}
      <MobileMenuButton mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transform bg-white p-6 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mt-8 space-y-4">
          <Link
            href="/user"
            className="block rounded-lg bg-orange-50 p-3 font-medium text-orange-600"
            onClick={toggleMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/partners"
            className="block rounded-lg p-3 font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleMobileMenu}
          >
            Partner Search
          </Link>
          <Link
            href="/partners/affiliate"
            className="block rounded-lg p-3 font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleMobileMenu}
          >
            Popular Partners
          </Link>
          <Link
            href="/stores"
            className="block rounded-lg p-3 font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleMobileMenu}
          >
            Store Search
          </Link>
          <Link
            href="/categories"
            className="block rounded-lg p-3 font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleMobileMenu}
          >
            Categories
          </Link>
          <Link
            href="/profile"
            className="block rounded-lg p-3 font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleMobileMenu}
          >
            My Profile
          </Link>
        </div>
      </div>

      {/* Hero Section with Enhanced Orange Gradient */}
      <section className="relative bg-gradient-to-br from-orange-600 to-orange-400 py-16 border-b border-orange-700">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-orange-300 opacity-20"></div>
        <div className="absolute -bottom-8 left-1/4 h-24 w-24 rounded-full bg-orange-300 opacity-20"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='1' fillRule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "12px 12px",
          }}
        ></div>

        <div className="container relative mx-auto max-w-6xl px-4 z-10">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Welcome message */}
            <div className="mb-10 md:mb-0 md:w-1/2">
              <h1 className="mb-2 text-5xl font-bold text-white">
                Welcome back, {isLoading ? "..." : customerData?.customer?.name || "Guest"}!
              </h1>
              <p className="mb-8 text-xl text-white/90">Discover today's exclusive offers and rewards</p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/partners"
                  className="flex items-center rounded-md bg-white px-6 py-3 font-medium text-orange-600 transition hover:bg-orange-50"
                >
                  Browse Partners <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/giveaways"
                  className="flex items-center rounded-md bg-orange-700 px-6 py-3 font-medium text-white transition hover:bg-orange-800"
                >
                  Enter Giveaways <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right side - Stats cards */}
            <div className="grid grid-cols-2 gap-4 md:ml-auto md:w-5/12">
              {/* Card 1 - Available Rewards */}
              <div className="rounded-lg bg-orange-300/30 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <Star className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">12</h3>
                <p className="text-white/90">Available Rewards</p>
              </div>

              {/* Card 2 - Loyalty Points */}
              <div className="rounded-lg bg-orange-300/30 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">5,240</h3>
                <p className="text-white/90">Loyalty Points</p>
              </div>

              {/* Card 3 - Recent Entries */}
              <div className="rounded-lg bg-orange-300/30 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">3</h3>
                <p className="text-white/90">Recent Entries</p>
              </div>

              {/* Card 4 - Member Status */}
              <div className="rounded-lg bg-orange-300/30 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <Award className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">Gold</h3>
                <p className="text-white/90">Member Status</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content container */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Browse Categories Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Browse Categories</h2>
            <Link href="/categories" className="text-orange-500 hover:text-orange-600">
              View All
            </Link>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <CategoriesCarousel />
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="mb-8 hidden rounded-lg bg-white p-1 shadow-sm lg:block">
          <div className="flex">
            <Link href="/user" className="flex-1 rounded-md bg-orange-500 px-4 py-3 text-center font-medium text-white">
              DASHBOARD
            </Link>
            <Link
              href="/partners"
              className="flex-1 px-4 py-3 text-center font-medium text-gray-600 hover:text-orange-500"
            >
              PARTNER SEARCH
            </Link>
            <Link
              href="/partners/affiliate"
              className="flex-1 px-4 py-3 text-center font-medium text-gray-600 hover:text-orange-500"
            >
              POPULAR PARTNERS
            </Link>
           
            <Link
              href="/categories"
              className="flex-1 px-4 py-3 text-center font-medium text-gray-600 hover:text-orange-500"
            >
              CATEGORIES
            </Link>
          </div>
        </div>

        {/* Partner section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Exclusive Partners</h2>
          <ExclusivePartner />
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Popular Partners</h2>
          <AffilliatePartner />
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Featured Stores</h2>
          <FeaturedStores />
        </div>

        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-800">All Categories</h2>
          <AllCategories />
        </div>
      </div>

      <MobileBottomNavigationBar />

      {/* Add padding at the bottom to prevent content from being hidden behind the mobile navigation */}
      <div className="pb-16 lg:pb-0"></div>

      {/* Footer */}
      <FooterUser />
    </div>
  )
}
