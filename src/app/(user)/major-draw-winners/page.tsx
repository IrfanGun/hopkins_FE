"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {  Home, Trophy, Calendar, Award, ChevronRight, Star } from "lucide-react";
import Header from "../../components/layout/header";
import FooterUser from "../../components/ui/footer-user";
import MobileMenuButton from "../../components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";
import WinnerCard from "../_components/winner-card";
import { fetchDraws, MajorDrawWinner } from "src/lib/majorWinners";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import baseTheme from "src/components/ui/spinner-custom-base";
import Image from "next/image"


export default function MajorDrawWinnersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [majorDrawWinners, setMajorDrawWinners] = useState<MajorDrawWinner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedWinner, setSelectedWinner] = useState<string | null>(null)

useEffect(() => {


const loadDraws = async() => {
  try {
  setIsLoading(true);
  const response = await fetchDraws();
  setMajorDrawWinners(response);
  } catch (error) {
    
  } finally {
    setIsLoading(false);
  }

}  

loadDraws();


},[])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

   const selectedWinnerData = majorDrawWinners.find((winner) => winner.id === selectedWinner)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Menu */}
      <MobileMenuButton mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center text-white">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 p-5">
              <Trophy className="h-10 w-10" />
            </div>
            <h1 className="mb-2 text-4xl font-bold">Major Draw Winners</h1>
            <p className="max-w-2xl text-lg opacity-90">
              Congratulations to all our lucky winners! Check out the latest major prize draws and see who won.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 left-1/4 h-12 w-12 rounded-full bg-white opacity-20"></div>
        <div className="absolute -top-6 right-1/4 h-12 w-12 rounded-full bg-white opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/6 h-8 w-8 rounded-full bg-white opacity-10"></div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/user" className="flex items-center hover:text-orange-500">
              <Home className="mr-1 h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-500">Major Draws Winners</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Sidebar - Winner List */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 flex items-center text-xl font-bold text-gray-800">
                  <Award className="mr-2 h-5 w-5 text-orange-500" />
                  Recent Draws
                </h2>

                <div className="space-y-4">
                  {majorDrawWinners.map((winner) => (
                    <button
                      key={winner.id}
                      onClick={() => setSelectedWinner(winner.id)}
                      className={`flex w-full items-center rounded-lg border p-3 transition hover:bg-orange-50 ${
                        selectedWinner === winner.id ? "border-orange-500 bg-orange-50" : "border-gray-200"
                      }`}
                    >
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={winner.image || "/placeholder.svg?height=48&width=48"}
                          alt={winner.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="ml-3 flex-1 text-left">
                        <h3 className="font-medium text-gray-800">{winner.title}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          {winner.date}
                        </div>
                      </div>
                      {selectedWinner === winner.id && (
                        <div className="ml-2 text-orange-500">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Card */}
              <div className="mt-6 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Mates Rates — Access Discounts</h3>
                <p className="mb-4 text-sm opacity-90">Get exclusive discounts from over 1000 stores!</p>
                <button className="w-full rounded-md bg-white px-4 py-2 font-medium text-orange-600 transition hover:bg-gray-100">
                  Get Discounts
                </button>
              </div>
            </div>

            {/* Main Content - Selected Winner Details */}
            <div className="lg:col-span-2">
              {selectedWinnerData ? (
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  {/* Winner Header */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={selectedWinnerData.image || "/placeholder.svg?height=400&width=800"}
                      alt={selectedWinnerData.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h2 className="mb-1 text-2xl font-bold">{selectedWinnerData.title}</h2>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Draw Date: {selectedWinnerData.date}
                      </div>
                    </div>
                  </div>

                  {/* Winner Details */}
                  <div className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-gray-800">Winners Announcement</h3>

                    <div className="space-y-6">
                      {selectedWinnerData.winners.map((winner, index) => (
                        <div key={index} className="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            {winner.label}
                          </div>
                          <div className="ml-4">
                            <p className="text-lg font-medium text-gray-800">{winner.prize}</p>
                            <p className="text-sm text-gray-500">Congratulations to our {winner.label} place winner!</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 rounded-lg bg-orange-50 p-4">
                      <h4 className="mb-2 font-medium text-gray-800">About This Draw</h4>
                      <p className="text-sm text-gray-600">
                        This major draw was conducted on {selectedWinnerData.date}. All winners have been notified via
                        email. The next major draw will be announced soon. Stay tuned!
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 text-gray-500 shadow-md">
                  No winner selected. Please select a draw from the list.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  )
}
