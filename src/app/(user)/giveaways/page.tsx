"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import Header from "../../components/layout/header";
import MobileMenuButton from "src/app/components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import GiveawayCard from "../_components/giveaway-card";
import MobileBottomNavigationBar from "src/app/components/layout/MobileBottomNavigationBar";
import FooterUser from "../../components/ui/footer-user";
import { giveaways } from "../../../lib/giveaway";

export default function GiveawaysPage() {
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
          <span className="text-gray-500">LIVE & Upcoming Giveaways</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <h1 className="mb-8 text-3xl font-bold">
          <span className="text-orange-500">LIVE</span> & UPCOMING GIVEAWAYS
        </h1>

        {/* Giveaways Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {giveaways.map((giveaway) => (
            <GiveawayCard
              key={giveaway.id}
              id={giveaway.id}
              title={giveaway.title}
              image={giveaway.image}
              status={giveaway.status}
              dateText={giveaway.dateText}
              tbd={giveaway.tbd}
              url={giveaway.url ?? ""} // <- pastikan dikirim
            />
          ))}
        </div>
      </div>

      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  );
}
