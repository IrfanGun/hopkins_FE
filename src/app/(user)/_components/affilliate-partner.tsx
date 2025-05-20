"use client";

import { useEffect, useState } from "react";
import { fetchPartner, Partner } from "../../../lib/partners";
import Link from "next/link";
import Partners from "src/app/(partners)/partners/page";
import { ThemeProvider,Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import { ExternalLink, Star } from "lucide-react"



export default function AffiliatePartner() {

  const[partners, setPartners] = useState<Partner[]>([]);
  const[isLoading, isSetLoading] = useState<Boolean>(false);

  useEffect(() => {

    const loadPartner = async() => {
      try {
        isSetLoading(true)
      const response = await fetchPartner();
      setPartners(response);
      } catch (error) {
        
      } finally {
        isSetLoading(false);
      }
     
    }
    loadPartner();
  },[]);


  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <ThemeProvider theme={customTheme}>
          <Spinner color="base" />
          </ThemeProvider>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners
            .filter((partner) => partner.isPopular === true)
            .map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
              >
                {partner.isPopular && (
                  <div className="absolute right-2 top-2 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    <Star className="mr-1 inline-block h-3 w-3" /> Popular
                  </div>
                )}
                <div className="flex h-32 items-center justify-center bg-gray-50 p-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{partner.name}</h3>
                  <p className="text-xs text-gray-500">{partner.category}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link href={partner.url || "#"} className="text-xs font-medium text-orange-600 hover:underline">
                      View Details
                    </Link>
                    <a
                      href={partner.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gray-100 p-1 text-gray-600 transition hover:bg-gray-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
