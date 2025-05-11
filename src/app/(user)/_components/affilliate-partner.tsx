"use client";

import { useEffect, useState } from "react";
import { fetchPartner, Partner } from "../../../lib/partners";
import Link from "next/link";
import Partners from "src/app/(partners)/partners/page";
import { ThemeProvider,Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";



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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-secondary-color">
          Popular Partners
        </h2>
        <a
          href="/partners"
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          View All <span className="ml-1">›</span>
        </a>
      </div>
      {
        isLoading ? (
          <div className="text-center items-center mt-4 mb-4">
            <ThemeProvider theme={customTheme}>
              <Spinner color="base"/>
            </ThemeProvider>
          </div>
        ) : (

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {partners.filter((partner) => partner.isPopular === true).map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
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
        )
      }
      
    </div>
  );
}
