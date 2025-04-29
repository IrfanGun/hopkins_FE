"use client";
import Link from "next/link";
import MainContent from "../../_components/main-content";
import CategoriesCarousel from "../../_components/categories-carousel";
import Header from "../../../components/layout/header";
import { Home, X } from "lucide-react";
import ExclusivePartner from "../../_components/exclusive-partner";
import FeaturedPartner from "../../_components/featured-partner";
import FeaturedAffiliatePartner from "../../_components/featured-affilate-partner";
import NewPartner from "../../_components/new-partner";
import AffilliatePartner from "../../_components/affilliate-partner";
import FeaturedStores from "../../_components/featured-stores";
import AllCategories from "../../_components/all-categories";
import FooterUser from "../../../components/ui/footer-user";
import { useState } from "react";
import MobileMenu from "../../../components/layout/MobileMenuButton";
import MobileMenuButton from "../../../components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "../../../components/layout/MobileBottomNavigationBar";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-0 -z-10 h-56 rounded-b-3xl bg-gradient-to-r from-amber-800 via-orange-500 to-orange-500" />
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

      {/* Breadcrumb */}
      <div className="flex items-center px-6 py-2 text-white/80">
        <Link href="/" className="hover:text-white">
          <Home className="h-5 w-5" />
        </Link>
        <span className="mx-2"></span>
        <span className="text-white">Dashboard</span>
      </div>

      {/* User welcome section */}
      <section className="flex items-center px-6 py-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-600">
          JH
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-white">
            Welcome Jay Hopkins!
          </h1>
          <p className="text-orange-100">admin@rsg-wa.com.au</p>
        </div>
      </section>

      {/* Main content */}
      <MainContent />

      {/* Bottom navigation - visible only on desktop */}
      <div className="mt-auto hidden bg-orange-600 py-4 text-white lg:block">
        <div className="container mx-auto flex justify-center space-x-6 overflow-x-auto">
          <Link
            href="/user"
            className="border-b-2 border-white px-3 py-1 font-medium"
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
            className="px-3 py-1 font-medium hover:border-b-2 hover:border-white"
          >
            CATEGORIES
          </Link>
        </div>
      </div>

      <MobileBottomNavigationBar />

      {/* Add padding at the bottom to prevent content from being hidden behind the mobile navigation */}
      <div className="pb-16 lg:pb-0"></div>

      {/* Categories section */}
      <CategoriesCarousel />

      {/* Partner section */}
      <ExclusivePartner />
      <FeaturedPartner />
      <FeaturedAffiliatePartner />
      <NewPartner />
      <AffilliatePartner />
      <FeaturedStores />
      <AllCategories />
      {/* Footer */}
      <FooterUser />
    </div>
  );
}
