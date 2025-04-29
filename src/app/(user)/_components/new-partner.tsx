"use client";

import { useState } from "react";
import { partners, type Partner } from "../../../lib/partners";
import { X, Facebook, Instagram, Globe } from "lucide-react";

export default function NewPartner() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-secondary-color">
          New Partners
        </h2>
        <a
          href="/partners"
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          View All <span className="ml-1">›</span>
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="flex h-48 items-center justify-center bg-white p-6">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600">{partner.category}</p>
              <button
                className="mt-4 w-full rounded-full bg-orange-500 px-4 py-2 text-white transition hover:bg-orange-600"
                onClick={() => openModal(partner)}
              >
                Get Code
              </button>
            </div>
          </div>
        ))}
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
              20% OFF - must use link and code provided
            </p>

            {/* Promo code */}
            <div className="mb-8 flex items-center justify-center gap-2">
              <div className="rounded-full bg-gray-100 px-6 py-3 font-mono font-bold text-gray-800">
                {selectedPartner.promoCode}
              </div>
              <button
                onClick={() =>
                  copyCode(selectedPartner.promoCode || "HopkinsCODE")
                }
                className="rounded-full bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Divider */}
            <hr className="mb-6" />

            {/* Partner description */}
            <div className="mb-6 text-gray-700">
              <p>{selectedPartner.description}</p>
            </div>

            {/* Social media links */}
            <div className="mb-6 flex justify-center gap-2">
              <a
                href={selectedPartner.facebook}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={selectedPartner.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-pink-600 text-white hover:bg-pink-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={selectedPartner.website}
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
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
