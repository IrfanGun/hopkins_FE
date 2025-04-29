"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import Header from "../../components/layout/header";
import FooterUser from "../../components/ui/footer-user";
import MobileMenuButton from "../../components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";
import WinnerCard from "../_components/winner-card";

const majorDrawWinners = [
  {
    id: "quintrex-trident",
    title: "Quintrex Trident 690 14/04/25",
    date: "14/04/25",
    image: "/logos/aus-merch.png",
    winners: [
      { place: "1st", name: "Craig M", prize: "Prize Quintrex Trident 690" },
      { place: "2nd", name: "Stefanie M", prize: "Prize $2500 Credit" },
      { place: "3rd", name: "Kim B", prize: "Prize $1000 Credit" },
    ],
    showWinBadge: true,
  },
  {
    id: "100k-cash",
    title: "$100,000 13/04/2025",
    date: "13/04/2025",
    image: "/logos/aus-merch.png",
    winners: [
      { place: "1st", name: "Ralph M", prize: "Prize $100,000" },
      { place: "2nd", name: "Jonathan M", prize: "Prize $2500 Credit" },
      { place: "3rd", name: "Damien S", prize: "Prize $1000 Credit" },
    ],
  },
  {
    id: "5-winners-100k",
    title: "5 Winners $100K Each 11/04/25",
    date: "11/04/25",
    image: "/logos/aus-merch.png",
    winners: [
      { place: "Winner 1", name: "Scott M", prize: "$100,000" },
      { place: "Winner 2", name: "Jono P", prize: "$100,000" },
      { place: "Winner 3", name: "Jack M", prize: "$100,000" },
      { place: "Winner 4", name: "RiRi W", prize: "$100,000" },
      { place: "Winner 5", name: "Tina L", prize: "$100,000" },
    ],
  },
  {
    id: "mates-rates",
    title: "Mates Rates — Access Discounts",
    date: "",
    image: "/logos/aus-merch.png",
    winners: [],
    isPromo: true,
  },
  {
    id: "vf-gts",
    title: "VF GTS 8/04/25",
    date: "8/04/25",
    image: "/logos/aus-merch.png",
    winners: [{ place: "1st", name: "Halim F", prize: "Prize VF GTS" }],
  },
  {
    id: "porsche-gt3rs",
    title: "Porsche GT3RS or $600K 3/04/25",
    date: "3/04/25",
    image: "/logos/aus-merch.png",
    winners: [
      { place: "1st", name: "Keesie", prize: "Prize Porsche GT3RS or $600K" },
    ],
    showWinBadge: true,
  },
  {
    id: "1-million-cash",
    title: "$1 Million Cash 30/03/25",
    date: "30/03/25",
    image: "/logos/aus-merch.png",
    winners: [
      { place: "1st", name: "Zarii O", prize: "Prize $1 Million Cash" },
    ],
    showWinBadge: true,
  },
  {
    id: "ford-f150-raptor",
    title: "Ford F150 Raptor + Lotus Caravan 27/03/2025",
    date: "27/03/2025",
    image: "/logos/aus-merch.png",
    winners: [],
  },
];

export default function MajorDrawWinnersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Mobile Menu */}
      <MobileMenuButton
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/user" className="flex items-center">
            <Home className="mr-1 h-4 w-4" />
          </Link>
          <span>›</span>
          <span className="text-gray-500">Major Draws Winner</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <h1 className="mb-8 text-3xl font-bold">
          <span className="text-orange-500">LATEST</span> MAJOR DRAWS WINNER
        </h1>

        {/* Special Discounts Card */}
        <div className="mb-8 hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {majorDrawWinners.slice(0, 3).map((winner) => (
                <WinnerCard
                  key={winner.id}
                  id={winner.id}
                  title={winner.title}
                  date={winner.date}
                  image={winner.image}
                  winners={winner.winners}
                />
              ))}
            </div>
            <div className="col-span-1">
              <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow">
                <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 p-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-full w-full text-orange-500"
                  >
                    <path
                      d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-center text-lg font-bold">
                  Mates Rates — Access Discounts
                </h3>
                <p className="mb-6 text-center text-sm text-gray-600">
                  from over 1000 stores!
                </p>
                <button className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">
                  Get Discounts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View for First 4 Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {majorDrawWinners.slice(0, 4).map((winner) => {
            if (winner.isPromo) {
              return (
                <div
                  key={winner.id}
                  className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow"
                >
                  <div className="mb-4 h-16 w-16 rounded-full bg-gray-100 p-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-full w-full text-orange-500"
                    >
                      <path
                        d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-center text-lg font-bold">
                    Mates Rates — Access Discounts
                  </h3>
                  <p className="mb-6 text-center text-sm text-gray-600">
                    from over 1000 stores!
                  </p>
                  <button className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600">
                    Get Discounts
                  </button>
                </div>
              );
            }
            return (
              <WinnerCard
                key={winner.id}
                id={winner.id}
                title={winner.title}
                date={winner.date}
                image={winner.image}
                winners={winner.winners}
              />
            );
          })}
        </div>

        {/* Remaining Winners */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {majorDrawWinners.slice(4).map((winner) => (
            <WinnerCard
              key={winner.id}
              id={winner.id}
              title={winner.title}
              date={winner.date}
              image={winner.image}
              winners={winner.winners}
            />
          ))}
        </div>
      </div>

      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  );
}
