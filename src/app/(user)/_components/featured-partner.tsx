"use client";

import { useState } from "react";
import { partners, type Partner } from "../../../lib/partners";
import { X, Facebook, Instagram, Globe } from "lucide-react";

export default function FeaturedPartner() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Mengambil partner berdasarkan id: 1
  const singlePartner = partners.find((partner) => partner.id === 1);

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

  if (!singlePartner) {
    return <p>Partner not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-secondary-color">
          Featured Partners
        </h2>
        <a
          href="/partners"
          className="text-sm text-secondary-color hover:underline"
        >
          View All &rarr;
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex overflow-hidden rounded-xl bg-white shadow-lg shadow-black/10">
          <div className="flex w-1/2 items-center justify-center bg-white p-6">
            <img
              src={singlePartner.logo || "/placeholder.svg"}
              alt={singlePartner.name}
              className="h-30 w-30 object-contain"
            />
          </div>
          <div className="flex w-2/3 flex-col justify-between p-6">
            <div>
              {singlePartner.isPopular && (
                <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  ⭐ Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-800">
                {singlePartner.name}
              </h3>
              <p className="text-sm text-gray-600">{singlePartner.category}</p>
            </div>
            <button
              className="mt-4 w-full rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
              onClick={() => openModal(singlePartner)}
            >
              Get Code
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Partner logo */}
            <div className="mb-6 flex justify-center">
              <img
                src={selectedPartner.logo || "/placeholder.svg"}
                alt={selectedPartner.name}
                className="h-32 w-32 object-contain"
              />
            </div>

            {/* Partner name and category */}
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
              {selectedPartner.name}
            </h2>
            <p className="mb-6 text-center text-gray-600">
              {selectedPartner.category}
            </p>

            {/* Discount information */}
            <p className="mb-4 text-center font-medium text-gray-800">
              {selectedPartner.discountText ||
                `${selectedPartner.discount || "20%"} OFF - must use link and code provided`}
            </p>

            {/* Promo code */}
            <div className="mb-8 flex items-center justify-center gap-2">
              <div className="rounded-full bg-gray-100 px-6 py-3 font-mono font-bold text-gray-800">
                {selectedPartner.promoCode || "HopkinsCODE"}
              </div>
              <button
                onClick={() =>
                  copyCode(selectedPartner.promoCode || "HopkinsCODE")
                }
                className="rounded-full bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
              >
                {isCopied ? "Copied" : "Copy"}{" "}
                {/* Menampilkan 'Copied' setelah disalin */}
              </button>
            </div>

            {/* Divider */}
            <hr className="mb-6" />

            {/* Partner description */}
            <div className="mb-6 text-gray-700">
              <p>
                {selectedPartner.description ||
                  `${selectedPartner.name} is a unique marketplace 100% Australian owned and operated. With a strong focus on developing and maintaining a humanised, warm and sincere customer experience, ${selectedPartner.name} aims to provide customers with a distinct selection of products at affordable prices.`}
              </p>
            </div>

            {/* Social media links */}
            <div className="mb-6 flex justify-center gap-2">
              <a
                href={selectedPartner.facebook || "#"}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={selectedPartner.instagram || "#"}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-pink-600 text-white hover:bg-pink-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={selectedPartner.website || "#"}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-500 text-white hover:bg-orange-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>

            {/* Categories */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {selectedPartner.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800"
                >
                  {tag}
                </span>
              )) || (
                <>
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800">
                    {selectedPartner.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800">
                    Products
                  </span>
                </>
              )}
            </div>

            {/* Store information */}
            {selectedPartner.storeAddress && (
              <div className="mb-4 flex items-start gap-2 text-gray-700">
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
            {selectedPartner.phone && (
              <div className="mb-2 flex items-center gap-2 text-gray-700">
                <span className="text-sm font-normal text-secondary-color">
                  Email:
                </span>
                <a
                  href={`mailto:${selectedPartner.email}`}
                  className="hoverhover:underline text-sm font-normal text-orange-600"
                >
                  {selectedPartner.email}
                </a>
              </div>
            )}
            {selectedPartner.phone && (
              <div className="mb-2 flex items-center gap-2 text-gray-700">
                <span className="text-sm font-normal text-secondary-color">
                  Call:
                </span>
                <a
                  href={`tel:${selectedPartner.phone}`}
                  className="text-sm font-normal text-orange-600 hover:underline"
                >
                  {selectedPartner.phone}
                </a>
              </div>
            )}

            {/* Map placeholder */}
            {selectedPartner.hasMap && (
              <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-2 text-center text-sm text-orange-600 hover:underline">
                <div className="mt-2">
                  <img
                    src={selectedPartner.hasMap}
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
    </div>
  );
}
