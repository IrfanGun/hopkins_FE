// app/stores/StoresClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/layout/header";
import { stores, Stores } from "../../../lib/stores";
import MobileMenuButton from "../../components/layout/MobileMenuButton";
import MobileMenu from "../../components/layout/MobileMenuButton";
import AlphabetFilter from "../_components/alphabet-filter";
import StoreCard from "../_components/store-card";
import FooterUser from "../../components/ui/footer-user";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";

// Define the Partner type
interface Partner {
  id: string;
  name: string;
  code: string;
}

export default function StoresClient() {
  const searchParams = useSearchParams();
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeLetter, setActiveLetter] = useState("A");
  const [filteredStores, setFilteredStores] = useState<Stores[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const letterParam = searchParams.get("letter");
    const letter = letterParam || "A";
    setActiveLetter(letter);

    const filtered = stores.filter((store) => {
      const firstLetter = store.name.charAt(0).toUpperCase();
      if (letter === "0-9") {
        return /^[0-9]/.test(store.name);
      }
      return firstLetter === letter;
    });

    setFilteredStores(filtered);
  }, [searchParams]);

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileMenuButton
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

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
            className="border-b-2 border-white px-3 py-1 font-medium"
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

      <main className="container mx-auto flex-1 px-4 py-8">
        <AlphabetFilter activeLetter={activeLetter} />
        <h2 className="mb-8 text-3xl font-bold">{activeLetter}</h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No stores found starting with {activeLetter}
            </p>
          )}
        </div>
      </main>

      <FooterUser />
      <MobileBottomNavigationBar />
    </div>
  );
}
