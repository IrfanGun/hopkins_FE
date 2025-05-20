import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Building2,
  Settings,
  ShoppingCart,
  Sparkles,
  Heart,
  Utensils,
  PawPrint,
  CarIcon,
  Sofa,
  Home,
} from "lucide-react";
import { fetchStores, Stores} from "../../../lib/stores";
import { useEffect, useState } from "react";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import { ExternalLink } from "lucide-react"


// Category data
// const categories = [
//   { id: 1, name: "Automotive", icon: <Car className="h-8 w-8" /> },
//   { id: 2, name: "Trades & Services", icon: <Building2 className="h-8 w-8" /> },
//   { id: 3, name: "Services", icon: <Settings className="h-8 w-8" /> },
//   { id: 4, name: "Retail", icon: <ShoppingCart className="h-8 w-8" /> },
//   { id: 5, name: "Beauty", icon: <Sparkles className="h-8 w-8" /> },
//   { id: 6, name: "Health & Fitness", icon: <Heart className="h-8 w-8" /> },
//   { id: 7, name: "Food & Beverages", icon: <Utensils className="h-8 w-8" /> },
//   { id: 8, name: "Pets", icon: <PawPrint className="h-8 w-8" /> },
//   {
//     id: 9,
//     name: "Detailing & Car Care",
//     icon: <CarIcon className="h-8 w-8" />,
//   },
//   { id: 10, name: "Furniture & Homeware", icon: <Sofa className="h-8 w-8" /> },
//   { id: 11, name: "Property", icon: <Home className="h-8 w-8" /> },
// ];

export default function FeaturedSections() {
  
const [ stores, setStores ] = useState<Stores[]>([]);
const [ isLoading, isSetLoading] = useState(false);

  useEffect(() => {
     const loadStores = async () => {

      isSetLoading(true)
      const data = await fetchStores();
      console.log(data);
      setStores(data);
      isSetLoading(false)
   
    };

    loadStores();

  },[])

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
            <ThemeProvider theme={customTheme}>
          <Spinner color="base" />
          </ThemeProvider>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {stores.map((store) => (
            <Link
              key={store.id}
              href="#"
              className="group flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 p-3">
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-800">{store.name}</span>
              <div className="mt-2 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <ExternalLink className="h-4 w-4 text-orange-500" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
