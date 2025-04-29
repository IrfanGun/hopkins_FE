"use client";
import Link from "next/link";
import { partners, type Partner } from "../../../lib/partners";
import { useState } from "react";
import { Globe, Instagram, X, Facebook, Filter } from "lucide-react";
import Header from "src/app/components/layout/header";
import MobileMenuButton from "src/app/components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "src/app/components/layout/MobileBottomNavigationBar";
import Pagination from "../../components/layout/pagination";
import FilterPartners from "../_components/filter-partners";
import MobileMenu from "../../components/layout/MobileMenuButton";
import FooterUser from "../../components/ui/footer-user";
export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            className="border-b-2 border-white px-3 py-1 font-medium"
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

      {/* Main Content */}
      <div className="flex-grow">
        {/* Mobile Filter Toggle */}
        <div className="container mx-auto mt-4 px-4 lg:hidden">
          <button
            onClick={toggleFilters}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white p-3 shadow-sm"
          >
            <span className="font-medium">Filters</span>
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="container mx-auto mt-4 px-4 lg:mt-8 lg:px-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Filters Section - Mobile Collapsible, Desktop Always Visible */}
            <div
              className={`${showFilters ? "block" : "hidden"} mb-6 w-full lg:mb-0 lg:block lg:w-1/4`}
            >
              <FilterPartners />
            </div>

            {/* Results Section */}
            <div className="w-full lg:w-3/4">
              <div className="mb-4 flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <span className="text-sm sm:text-base">
                  {partners.length} Results
                </span>
                <div className="flex w-full items-center sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded border border-gray-300 p-2 sm:w-auto"
                  />
                </div>
              </div>

              {/* Partner Results */}
              {partners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`} // Use both `id` and `index` for uniqueness
                  className="flex flex-col rounded bg-white p-4 shadow-md sm:flex-row sm:items-center"
                >
                  {/* Partner Logo */}
                  <div className="mb-4 flex justify-center sm:mb-0 sm:mr-4 sm:justify-start">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-16 w-auto object-contain sm:h-20"
                    />
                  </div>

                  {/* Partner Info */}
                  <div className="mb-4 flex-1 text-center sm:mb-0 sm:text-left">
                    <h4 className="font-semibold">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.category}</p>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col items-center sm:items-end">
                    <button
                      className="w-full rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600 sm:w-auto sm:min-w-[120px]"
                      onClick={() => openModal(partner)}
                    >
                      Get Code
                    </button>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                      Details
                    </button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={58}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
              <MobileBottomNavigationBar />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 sm:p-6">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Partner logo */}
            <div className="mb-4 flex justify-center sm:mb-6">
              <img
                src={selectedPartner.logo || "/placeholder.svg"}
                alt={selectedPartner.name}
                className="h-24 w-auto object-contain sm:h-32"
              />
            </div>

            {/* Partner name and category */}
            <h2 className="mb-1 text-center text-xl font-bold text-gray-800 sm:mb-2 sm:text-2xl">
              {selectedPartner.name}
            </h2>
            <p className="mb-4 text-center text-gray-600 sm:mb-6">
              {selectedPartner.category}
            </p>

            {/* Discount information */}
            <p className="mb-4 text-center font-medium text-gray-800">
              {selectedPartner.discountText ||
                `${selectedPartner.discount || "20%"} OFF - must use link and code provided`}
            </p>

            {/* Promo code */}
            <div className="mb-6 flex flex-col items-center justify-center gap-2 sm:mb-8 sm:flex-row">
              <div className="w-full rounded-full bg-gray-100 px-4 py-3 text-center font-mono font-bold text-gray-800 sm:w-auto sm:px-6">
                {selectedPartner.promoCode || "HopkinsCODE"}
              </div>
              <button
                onClick={() =>
                  copyCode(selectedPartner.promoCode || "HopkinsCODE")
                }
                className="w-full rounded-full bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600 sm:w-auto sm:px-6"
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Divider */}
            <hr className="mb-6" />

            {/* Partner description */}
            <div className="mb-6 text-sm text-gray-700 sm:text-base">
              <p>
                {selectedPartner.description ||
                  `${selectedPartner.name} is a unique marketplace 100% Australian owned and operated. With a strong focus on developing and maintaining a humanised, warm and sincere customer experience, ${selectedPartner.name} aims to provide customers with a distinct selection of products at affordable prices.`}
              </p>
            </div>

            {/* Social media links */}
            <div className="mb-6 flex justify-center gap-2">
              <a
                href={selectedPartner.facebook || "#"}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 sm:h-10 sm:w-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href={selectedPartner.instagram || "#"}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-pink-600 text-white hover:bg-pink-700 sm:h-10 sm:w-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href={selectedPartner.website || "#"}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-500 text-white hover:bg-orange-600 sm:h-10 sm:w-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            {/* Categories */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {selectedPartner.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-800 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {tag}
                </span>
              )) || (
                <>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 sm:px-4 sm:py-2 sm:text-sm">
                    {selectedPartner.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 sm:px-4 sm:py-2 sm:text-sm">
                    Products
                  </span>
                </>
              )}
            </div>

            {/* Store information */}
            {selectedPartner.storeAddress && (
              <div className="mb-4 flex items-start gap-2 text-sm text-gray-700 sm:text-base">
                <svg
                  className="h-5 w-5 shrink-0 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{selectedPartner.storeAddress}</span>
              </div>
            )}

            {/* Contact information */}
            {selectedPartner.email && (
              <div className="mb-2 flex items-center gap-2 text-gray-700">
                <span className="text-xs font-normal text-secondary-color sm:text-sm">
                  Email:
                </span>
                <a
                  href={`mailto:${selectedPartner.email}`}
                  className="text-xs font-normal text-orange-600 hover:underline sm:text-sm"
                >
                  {selectedPartner.email}
                </a>
              </div>
            )}
            {selectedPartner.phone && (
              <div className="mb-2 flex items-center gap-2 text-gray-700">
                <span className="text-xs font-normal text-secondary-color sm:text-sm">
                  Call:
                </span>
                <a
                  href={`tel:${selectedPartner.phone}`}
                  className="text-xs font-normal text-orange-600 hover:underline sm:text-sm"
                >
                  {selectedPartner.phone}
                </a>
              </div>
            )}

            {/* Map placeholder */}
            {selectedPartner.hasMap && (
              <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-2 text-center text-xs text-orange-600 hover:underline sm:text-sm">
                <div className="mt-2">
                  <img
                    src={selectedPartner.hasMap || "/placeholder.svg"}
                    alt="Map Location"
                    className="mx-auto mt-4 w-full rounded-lg"
                  />
                </div>
                <a href="/user" onClick={(e) => e.preventDefault()}>
                  View larger map
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <FooterUser />
    </div>
  );
}
