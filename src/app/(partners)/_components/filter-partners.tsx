"use client";
import { useState, useEffect } from "react";
import { fetchPartner, Partner } from "../../../lib/partners";


interface FilterPartnersProps {
  onFilterChange: (filteredPartners: Partner[]) => void;
  isPopularFilter ? :boolean;

}


export default function FilterPartners({ onFilterChange, isPopularFilter= false }: FilterPartnersProps){
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isActiveFilter, setIsActiveFilter] = useState(false);
  const [OriginFiltered,setOriginFiltered] = useState<Partner[]>([]);
  

  // Fetch data dari API
useEffect(() => {
  const loadPartner = async () => {
    const response = await fetchPartner();
    if (filteredPartners.length === 0) {
      // Jika belum ada hasil filter, set hasil fetch pertama kali
    
      setPartners(response);

      const initialFilter = isPopularFilter
        ? response.filter((item) => item.isPopular)
        : response;

      setIsActiveFilter(false);
      setFilteredPartners(initialFilter);
      setOriginFiltered(initialFilter);
      if (isActiveFilter === true) {
        onFilterChange(initialFilter);
      }
     
    }
  };
  loadPartner();
}, [isPopularFilter, onFilterChange, filteredPartners]);


  // Handler Apply Filter
const handleFilterChange = () => {
  const filtered = partners.filter((partner) => {
    // ✅ Jika states array, gunakan includes
    const stateMatch = Array.isArray(partner.states)
      ? partner.states.includes(selectedState)
      : partner.states === selectedState;

    // ✅ Jika category ada, cocokkan
    const categoryMatch = selectedCategory
      ? partner.category === selectedCategory
      : true;

    // ✅ Jika tags array, gunakan includes
    const tagMatch = selectedTag
      ? Array.isArray(partner.tags)
        ? partner.tags.includes(selectedTag)
        : partner.tags === selectedTag
      : true;

    // ✅ Cocokkan popular
    const popularMatch = isPopular ? partner.isPopular === isPopular : true;

    setIsActiveFilter(true);
    return stateMatch && categoryMatch && tagMatch && popularMatch;
  });

  setIsActiveFilter(true);
  setFilteredPartners(filtered);
  onFilterChange(filtered);
  setShowAll(false); // Reset pagination saat filter berubah
};


  // Handler Show All
  const handleShowAll = () => {
    setShowAll(true);
  };

  // Tentukan batasan default (8 logo pertama)
  const displayedPartners = showAll
    ? filteredPartners
    : filteredPartners.slice(0, 8);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md max-h-[90vh] overflow-y-auto no-scrollbar">
  <h3 className="mb-4 text-xl font-semibold text-gray-900">Filters</h3>

  {/* States Filter */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">States</label>
    <select
      className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
      value={selectedState}
      onChange={(e) => setSelectedState(e.target.value)}
    >
      <option value="">Select State</option>
      {Array.from(new Set(OriginFiltered.map((partner) => partner.states)))
        .filter(Boolean)
        .map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
    </select>
  </div>

  {/* Categories Filter */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
    <select
      className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">Select Category</option>
      {Array.from(new Set(OriginFiltered.map((partner) => partner.category)))
        .filter(Boolean)
        .map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
    </select>
  </div>

  {/* Tags Filter */}
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
    <select
      className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
      value={selectedTag}
      onChange={(e) => setSelectedTag(e.target.value)}
    >
      <option value="">Select Tag</option>
      {Array.from(new Set(OriginFiltered.map((partner) => partner.tags)))
        .filter(Boolean)
        .map((tag, index) => (
          <option key={index} value={tag}>{tag}</option>
        ))}
    </select>
  </div>

  {/* Store Logos Section */}
  <div className="mb-6">
    <h3 className="mb-2 text-sm font-semibold text-gray-700">Stores</h3>
    <div className="flex flex-wrap gap-3">
      {displayedPartners.length > 0 ? (
        displayedPartners.map((partner, index) => (
          <img
            key={index}
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            className="h-12 w-12 rounded-full border border-gray-200 object-cover shadow-sm hover:scale-105 transition"
          />
        ))
      ) : (
        <p className="text-sm text-gray-500">No partners found.</p>
      )}
    </div>

    {!showAll && filteredPartners.length > 8 && (
      <button
        className="mt-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-orange-500 hover:border-orange-600 hover:text-orange-600 transition"
        onClick={handleShowAll}
      >
        See All
      </button>
    )}
  </div>

  {/* Apply Filters Button */}
  <button
    className="mt-4 w-full rounded-md bg-orange-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition"
    onClick={handleFilterChange}
  >
    Apply Filters
  </button>
</div>

    
  );
}
