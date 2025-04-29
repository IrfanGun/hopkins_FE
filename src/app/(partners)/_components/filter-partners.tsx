"use client";
import { useState } from "react";
import { partners, type Partner } from "../../../lib/partners";

export default function FilterPartners() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Filters</h3>

      {/* Categories Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">States</h3>
        <select className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option value="">Select State</option>
          {partners.map((partner, index) => (
            <option key={index} value={partner.states}>
              {partner.states}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <select className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>Select Category</option>
          {partners.map((partner, index) => (
            <option key={index} value={partner.states}>
              {partner.category}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
        <select className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>Select Tag</option>
          {partners.map((partner, index) => (
            <option key={index} value={partner.states}>
              {partner.tags}
            </option>
          ))}
        </select>
      </div>
      {/* Store Logos Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Stores</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-12 rounded-full border border-gray-200 object-cover shadow"
            />
          ))}
        </div>
        <button className="mt-4 rounded-md border border-slate-300 px-8 text-sm text-primary-color hover:border-orange-700">
          See All
        </button>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Explore</h3>
        <div className="mt-3 flex flex-col gap-2 text-sm text-gray-700">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Popular Partners
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Featured Partners
          </label>
        </div>
      </div>
      {/* Apply Filters Button */}
      <button className="mt-2 w-full rounded-md bg-orange-500 py-2 text-center font-medium text-white hover:bg-orange-600">
        Apply Filters
      </button>
    </div>
  );
}
