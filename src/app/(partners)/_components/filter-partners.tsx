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
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Filters</h3>

      {/* States Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">States</h3>
        <select
          className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {Array.from(new Set(OriginFiltered.map((partner) => partner.states)))
            .filter(Boolean)
            .map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
        </select>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
        <select
          className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {Array.from(new Set(OriginFiltered.map((partner) => partner.category)))
            .filter(Boolean)
            .map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
        <select
          className="mt-2 w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Select Tag</option>
          {Array.from(new Set(OriginFiltered.map((partner) => partner.tags)))
            .filter(Boolean)
            .map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
        </select>
      </div>

      
      {/* Store Logos Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Stores</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {displayedPartners.length > 0 ? (
            displayedPartners.map((partner, index) => (
              <img
                key={index}
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 w-12 rounded-full border border-gray-200 object-cover shadow"
              />
            ))
          ) : (
            <p className="text-gray-500">No partners found.</p>
          )}
        </div>

        {/* Button See All */}
        {!showAll && filteredPartners.length > 8 && (
          <button
            className="mt-4 w-full rounded-md border border-slate-300 px-8 text-sm text-primary-color hover:border-orange-700"
            onClick={handleShowAll}
          >
            See All
          </button>
        )}
      </div>

      {/* Popular Checkbox */}
      {/* <div className="mb-2">
        <label className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
          />
          Popular Partners
        </label>
      </div> */}

      {/* Apply Filters Button */}
      <button
        className="mt-2 w-full rounded-md bg-orange-500 py-2 text-center font-medium text-white hover:bg-orange-600"
        onClick={handleFilterChange}
      >
        Apply Filters
      </button>

    </div>
  );
}
