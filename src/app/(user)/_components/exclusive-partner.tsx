"use client";

import { useState, useEffect } from "react";
import { fetchPartner, Partner } from "../../../lib/partners";
import { X, Facebook, Instagram, Globe, Star, ExternalLink } from "lucide-react";
import baseTheme from "src/components/ui/spinner-custom-base";
import customTheme from "src/components/ui/spinner-custom";
import { ThemeProvider, Spinner} from "flowbite-react";

export default function ExclusivePartner() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>();

  useEffect(() => {
    const loadPartner = async () => {
      try {
        setIsLoading(true);
         const response = await fetchPartner();
      setPartners(response);
      } catch (error) {
        
      } finally {
        setIsLoading(false);
      }
     
    }
    loadPartner();
  }, []);



  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true); // Set copied state menjadi true
      // Reset status copied setelah beberapa detik (misalnya 2 detik)
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

 return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
              <ThemeProvider theme={customTheme}>
          <Spinner color="base" />
          </ThemeProvider>        
          </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative h-40 bg-gray-50 p-4">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {partner.isPopular && (
                  <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    <Star className="mr-1 inline-block h-3 w-3" /> Popular
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{partner.name}</h3>
                    <p className="text-sm text-gray-500">{partner.category}</p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                    {partner.discount || "10%"} OFF
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    className="flex-1 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
                    onClick={() => openModal(partner)}
                  >
                    Get Code
                  </button>
                  <a
                    href={partner.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup - Redesigned and map removed */}
      {showModal && selectedPartner && (
        <div className="  fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full no-scrollbar max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
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
                    className="   object-contain"
   
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
    </div>
  )
}
