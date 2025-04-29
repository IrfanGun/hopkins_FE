"use client";

import { useState } from "react";
import { partners, type Partner } from "../../../lib/partners";
import Link from "next/link";

export default function AffiliatePartner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-secondary-color">
          Affiliate Partners
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
              <button className="mt-4 w-full justify-between rounded-full bg-orange-500 px-4 py-2 text-center text-white transition hover:bg-orange-600">
                <Link href={partner.url || "#"}>Visit Site</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
