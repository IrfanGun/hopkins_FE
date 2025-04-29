"use client";

import { useState } from "react";
import { partners, type Partner } from "../../../lib/partners";

export default function FeaturedAffiliatePartner() {
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
          Featured Affiliate Partners
        </h2>
        <a
          href="/partners"
          className="text-sm text-secondary-color hover:underline"
        >
          View All &rarr;
        </a>
      </div>
    </div>
  );
}
