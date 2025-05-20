"use client";
import Link from "next/link";
import { fetchPartner, Partner } from "src/lib/partners";
import { useState, useEffect } from "react";
import { Globe, Instagram, X, Facebook, Filter } from "lucide-react";
import Header from "src/app/components/layout/header";
import MobileMenuButton from "src/app/components/layout/MobileMenuButton";
import MobileBottomNavigationBar from "src/app/components/layout/MobileBottomNavigationBar";
import Pagination from "src/app/components/layout/pagination";
import FilterPartners from "src/app/(partners)/_components/filter-partners";
import MobileMenu from "src/app/components/layout/MobileMenuButton";
import FooterUser from "src/app/components/ui/footer-user";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";


export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchQuery, setSearchQuery] = useState("");  // State untuk pencarian
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [itemsPerPage] = useState(10);

    const { category, subcategory } = useParams();

  

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };
   
  const closeModal = () => {
    setShowModal(false);
  };

 
   const handleFilterChange = (filtered: Partner[]) => {
    setFilteredPartners(filtered);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

   // Fungsi untuk menggabungkan pencarian dan filter
   const filterPartners = (partners: Partner[]) => {
    return partners.filter((partner) => {
      const matchesSearchQuery =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesSearchQuery;
    });
  };

  const displayedPartners = filterPartners(filteredPartners.length > 0 ? filteredPartners : []
  );

   const handlePageChange = (newPage:number) => {
    setPage(newPage);
  }


  const paginatedPartners = displayedPartners.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

useEffect(() => {
    if (!category || !subcategory) return;

    const loadPartners = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPartner();
        const filteredData = response.filter((partner: Partner) =>
          partner.category.toLowerCase() === (category as string).toLowerCase() &&
          partner.subcategory?.toLowerCase().replace(/\s+/g, "-") === (subcategory as string).toLowerCase()
        );
        setPartners(response); // Simpan semua partner yang diterima
        setFilteredPartners(filteredData);
        console.log(displayedPartners, partners); // Hanya update filtered data
      } catch (error) {
        console.error("Error loading partners", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPartners();
  }, [subcategory, category]);



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

     {/* Desktop Navigation Tabs */}
        <div className=" hidden rounded-lg bg-white p-1 shadow-sm lg:block">
          <div className="flex">
            <Link href="/user" className="flex-1 px-4 py-3 text-center font-medium text-gray-600 hover:text-orange-500">
              DASHBOARD
            </Link>
            <Link
              href="/partners"
              className="flex-1 px-4 py-3 text-center font-medium bg-orange-500 text-white rounded-md"
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

              <FilterPartners onFilterChange={handleFilterChange}  />
            </div>

            {/* Results Section */}
            <div className="w-full lg:w-3/4">
              <div className="mb-4 flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <span className="text-sm sm:text-base">
                  {displayedPartners?.length} Results
                </span>
                <div className="flex w-full items-center sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded border border-gray-300 p-2 sm:w-auto"
                  />
                </div>
              </div>

              {/* Partner Results */}
                 {isLoading ? (
                <div className="flex items-center justify-center py-12">
                 <ThemeProvider theme={customTheme}>
                    <Spinner color="base" />
                  </ThemeProvider>
                </div>
              ) : displayedPartners?.length > 0 ? (
                <div className="space-y-4">
                  {paginatedPartners.map((partner, index) => (
                    <div
                      key={`${partner.id}-${index}`}
                      className="flex flex-col rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg sm:flex-row sm:items-center"
                    >
                      {/* Partner Logo */}
                      <div className="mb-4 flex justify-center sm:mb-0 sm:mr-4 sm:justify-start">
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          className="h-16 w-20 object-contain sm:h-20 sm:w-28"
                        />
                      </div>

                      {/* Partner Info */}
                      <div className="mb-4 flex-1 text-center sm:mb-0 sm:text-left">
                        <h4 className="font-semibold">{partner.name}</h4>
                        <p className="text-sm text-gray-600">{partner.category}</p>
                        {partner.discount && (
                          <p className="mt-1 text-sm font-medium text-orange-600">{partner.discount} OFF</p>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="flex flex-col items-center sm:items-end">
                        <button
                          className="w-full rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600 sm:w-auto sm:min-w-[120px]"
                          onClick={() => openModal(partner)}
                        >
                          Get Code
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                  <p className="text-lg text-gray-500">No partners found matching your criteria.</p>
                 
                </div>
              )}
      
      


              {/* Pagination */}
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(displayedPartners.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
              <MobileBottomNavigationBar />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 no-scrollbar z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh]  no-scrollbar w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
            {/* Orange header with logo and title */}
            <div className="relative bg-orange-500 p-6 text-white">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full bg-white/20 p-1 text-white hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center">
                <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-white ">
                  <img
                    src={selectedPartner.logo || "/placeholder.svg"}
                    alt={selectedPartner.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedPartner.name}</h2>
                  <p className="text-white/80">{selectedPartner.category}</p>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6">
              {/* Discount banner */}
              <div className="mb-6 rounded-md bg-orange-50 p-4 text-center text-lg font-medium text-orange-800">
                {selectedPartner.discountText ||
                  `${selectedPartner.discount || "20%"} OFF - must use link and code provided`}
              </div>

              {/* Promo code section */}
              <div className="mb-6">
                <p className="mb-2 text-gray-600">Your Promo Code:</p>
                <div className="flex">
                  <div className="flex-1 rounded-l-md border border-gray-300 bg-gray-50 px-4 py-3 font-mono font-bold text-gray-800">
                    {selectedPartner.promoCode || "HopkinsCODE"}
                  </div>
                  <button
                    onClick={() => copyCode(selectedPartner.promoCode || "HopkinsCODE")}
                    className="rounded-r-md bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Divider */}
              <hr className="mb-6" />

              {/* About section */}
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-gray-800">About {selectedPartner.name}</h3>
                <p className="text-gray-600">
                  {selectedPartner.description ||
                    `${selectedPartner.name} is a unique marketplace 100% Australian owned and operated. With a strong focus on developing and maintaining a humanised, warm and sincere customer experience, ${selectedPartner.name} aims to provide customers with a distinct selection of products at affordable prices.`}
                </p>
              </div>

              {/* Social and contact sections in two columns */}
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                {/* Social links */}
                <div>
                  <h3 className="mb-3 text-gray-500">Connect with {selectedPartner.name}</h3>
                  <div className="flex gap-2">
                    <a
                      href={selectedPartner.facebook || "#"}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={selectedPartner.instagram || "#"}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={selectedPartner.website || "#"}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Contact information */}
                <div>
                  <h3 className="mb-3 text-gray-500">Contact Information</h3>
                  {selectedPartner.email && <p className="mb-1 text-sm text-gray-600">{selectedPartner.email}</p>}
                  {selectedPartner.phone && <p className="mb-1 text-sm text-gray-600">{selectedPartner.phone}</p>}
                  {selectedPartner.storeAddress && (
                    <p className="text-sm text-gray-600">{selectedPartner.storeAddress}</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-3 text-gray-500">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.tags?.map((tag, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                      {tag}
                    </span>
                  )) || (
                    <>
                      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                        {selectedPartner.category}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FooterUser />
    </div>
  );
}



