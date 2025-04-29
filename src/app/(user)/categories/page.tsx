"use client";
import { useState } from "react";
import Link from "next/link";
import FooterUser from "../../components/ui/footer-user";
import Header from "../../components/layout/header";
import {
  Car,
  Hammer,
  Box,
  Scissors,
  Heart,
  Coffee,
  Film,
  Dumbbell,
  PawPrint,
} from "lucide-react";
import MobileMenuButton from "../../components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import AllCategories from "../_components/all-categories";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";

export default function Categories() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuredCategories = [
    {
      name: "Automotive",
      icon: <Car className="h-6 w-6" />,
      href: "/categories/automotive",
    },
    {
      name: "Trades & Services",
      icon: <Hammer className="h-6 w-6" />,
      href: "/categories/trades-services",
    },
    {
      name: "Services",
      icon: <Box className="h-6 w-6" />,
      href: "/categories/services",
    },
    {
      name: "Retail",
      icon: <Box className="h-6 w-6" />,
      href: "/categories/retail",
    },
    {
      name: "Beauty",
      icon: <Scissors className="h-6 w-6" />,
      href: "/categories/beauty",
    },
    {
      name: "Health & Fitness",
      icon: <Dumbbell className="h-6 w-6" />,
      href: "/categories/health-fitness",
    },
    {
      name: "Food & Beverages",
      icon: <Coffee className="h-6 w-6" />,
      href: "/categories/food-beverages",
    },
    {
      name: "Pets",
      icon: <PawPrint className="h-6 w-6" />,
      href: "/categories/pets",
    },
    {
      name: "Recreation",
      icon: <Film className="h-6 w-6" />,
      href: "/categories/recreation",
    },
    {
      name: "Affiliates",
      icon: <Heart className="h-6 w-6" />,
      href: "/categories/affiliates",
    },
    {
      name: "Cosmetics",
      icon: <Heart className="h-6 w-6" />,
      href: "/categories/cosmetics",
    },
  ];

  const allCategories = [
    {
      name: "Automotive",
      subcategories: [
        "Wheels & Tyres",
        "Paint & Panel Repair",
        "Harrop Distributors",
        "Servicing",
        "Workshops",
        "Detailing & Car Care",
      ],
    },
    {
      name: "Trades & Services",
      subcategories: [
        "Air Conditioning",
        "Electrical",
        "Plumbing",
        "Building",
        "Flooring",
        "Epoxy",
      ],
    },
    {
      name: "Services",
      subcategories: [
        "Property",
        "Insurance",
        "Shipping",
        "Real Estate",
        "Finance & Mortgage",
        "Photo, Video & Art",
      ],
    },
    {
      name: "Retail",
      subcategories: [
        "Tools",
        "Collectables",
        "Jewellery",
        "Apparel",
        "Electronics & Appliances",
        "Furniture & Homeware",
      ],
    },
    {
      name: "Beauty",
      subcategories: ["Hairdresser", "Barber", "Beautician", "Tattoo", "Salon"],
    },
  ];

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Toggles the mobile menu's open state.
   *
   * @return {void}
   */
  /*******  104d1938-d82a-4ac6-8a96-3aa287122449  *******/
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Tombol Navigasi Mobile */}
      <MobileMenuButton
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {/* Menu Navigasi Mobile */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {/* Desktop Navigation */}
      <div className="hidden bg-orange-600 py-4 text-white lg:block">
        <div className="container mx-auto flex justify-center space-x-6 overflow-x-auto">
          <Link
            href="/user"
            className="px-3 py-1 font-medium hover:border-b-2 hover:border-white"
          >
            DASHBOARD
          </Link>
          <Link
            href="/partners"
            className="px-3 py-1 font-medium hover:border-b-2 hover:border-white"
          >
            PARTNER SEARCH
          </Link>
          <Link
            href="/partners/affiliate"
            className="px-3 py-1 font-medium hover:border-b-2 hover:border-white"
          >
            AFFILIATE PARTNERS
          </Link>
          <Link
            href="/stores"
            className="px-3 py-1 font-medium hover:border-b-2 hover:border-white"
          >
            STORE SEARCH
          </Link>
          <Link
            href="/categories"
            className="border-b-2 border-white px-3 py-1 font-medium"
          >
            CATEGORIES
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Featured Categories Section */}
        <section>
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Featured Categories
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="flex flex-col items-center justify-center rounded-md border border-gray-200 p-6 text-center transition hover:border-orange-500"
              >
                <div className="mb-3 text-gray-700">{category.icon}</div>
                <span className="text-sm font-medium text-gray-800">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
        <AllCategories />
        <MobileBottomNavigationBar />
      </div>
      <FooterUser />
    </div>
  );
}
