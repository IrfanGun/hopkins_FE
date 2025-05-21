"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Award, Calendar, Package, ArrowRight, Search } from "lucide-react";
import Header from "../../components/layout/header";
import FooterUser from "../../components/ui/footer-user";
import EntryCard from "../_components/entry-card";
import MobileMenuButton from "src/app/components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";
import { fetchUserEntries, UserEntries  } from "src/lib/userEntries";
import { Spinner, ThemeProvider } from "flowbite-react";
import baseTheme from "src/components/ui/spinner-custom-base";
import Image from "next/image"


export default function MyEntriesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEntries, setuserEntries] = useState<UserEntries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {

    loadEntries();

  }, []);

  const loadEntries = async() => {

    try {

      setIsLoading(true);
      const response = await fetchUserEntries();
      setuserEntries(response);
      
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
   
  }


  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const totalPoints = userEntries.reduce((sum, entry) => sum + entry.loyaltyPoints, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />

      {/* Mobile Menu Button */}
      <div className="fixed right-4 top-4 z-20 lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white shadow-md"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h1 className="text-4xl font-bold">My Entries</h1>
              <p className="mt-2 text-orange-100">Track and manage all your giveaway entries</p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-sm font-medium uppercase text-orange-200">Total Entries</p>
                <p className="text-3xl font-bold">{userEntries.length}</p>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium uppercase text-orange-200">Loyalty Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 border-b bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search entries..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeFilter === "all" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Entries
              </button>
              <button
                onClick={() => setActiveFilter("active")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeFilter === "active" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveFilter("past")}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeFilter === "past" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Past
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/user" className="flex items-center">
            <Home className="mr-1 h-4 w-4" />
          </Link>
          <span>›</span>
          <span className="text-gray-500">My Entries</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {isLoading && (
          <div className="flex items-center justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            <span className="sr-only">Loading entries...</span>
          </div>
        )}

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {/* Entries List */}
        {!isLoading && !error && userEntries.length === 0 && (
          <div className="rounded-xl bg-orange-50 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Package className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">No Entries Yet</h2>
            <p className="mt-2 text-gray-600">
              You haven't entered any giveaways yet. Check out our available giveaways and start entering today!
            </p>
            <Link
              href="/giveaways"
              className="mt-6 inline-flex items-center rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
            >
              Browse Giveaways
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}

        {!isLoading && !error && userEntries.length > 0 && (
          <div className="space-y-6">
            {userEntries.map((entry) => (
              <div
                key={entry.id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left: Image with status badge */}
                  <div className="relative h-64 w-full md:h-auto md:w-1/3 lg:w-1/4">
                    <Image
                      src={entry.image || "/placeholder.svg?height=300&width=400"}
                      alt={entry.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                      Active
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{entry.title}</h3>
                        <div className="mt-1 flex items-center text-gray-600">
                          <Calendar className="mr-1 h-4 w-4" />
                          <span>{entry.date}</span>
                        </div>
                      </div>

                      <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-orange-100 text-center">
                        <Award className="h-5 w-5 text-xs text-orange-500" />
                        <span className="text-lg font-bold text-gray-800">{entry.loyaltyPoints}</span>
                        <span className="text-xs text-gray-500">points</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <h4 className="font-medium text-gray-700">Entry Details</h4>
                      <div className="mt-2 rounded-lg bg-gray-50 p-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Entry ID</p>
                            <p className="font-medium text-gray-700">{entry.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <p className="font-medium text-green-600">Active</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Draw Date:</span> Coming soon
                      </div>

                      <Link
                        href={entry.addressURL}
                        className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  )
}
