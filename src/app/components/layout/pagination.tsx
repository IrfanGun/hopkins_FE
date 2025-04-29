"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  // Set windowWidth hanya di sisi klien
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    // Optional: Update windowWidth saat ukuran jendela berubah
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = windowWidth < 640 ? 3 : 5;

    // Always show first page
    if (currentPage > 2) {
      pages.push(1);
      // Add ellipsis if needed
      if (currentPage > 3) {
        pages.push("...");
      }
    }

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 sm:h-10 sm:w-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm sm:h-10 sm:w-10 ${
            page === currentPage
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 disabled:opacity-50 sm:h-10 sm:w-10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
