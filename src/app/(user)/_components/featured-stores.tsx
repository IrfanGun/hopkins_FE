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
import { stores, type Stores } from "../../../lib/stores";

// Category data
const categories = [
  { id: 1, name: "Automotive", icon: <Car className="h-8 w-8" /> },
  { id: 2, name: "Trades & Services", icon: <Building2 className="h-8 w-8" /> },
  { id: 3, name: "Services", icon: <Settings className="h-8 w-8" /> },
  { id: 4, name: "Retail", icon: <ShoppingCart className="h-8 w-8" /> },
  { id: 5, name: "Beauty", icon: <Sparkles className="h-8 w-8" /> },
  { id: 6, name: "Health & Fitness", icon: <Heart className="h-8 w-8" /> },
  { id: 7, name: "Food & Beverages", icon: <Utensils className="h-8 w-8" /> },
  { id: 8, name: "Pets", icon: <PawPrint className="h-8 w-8" /> },
  {
    id: 9,
    name: "Detailing & Car Care",
    icon: <CarIcon className="h-8 w-8" />,
  },
  { id: 10, name: "Furniture & Homeware", icon: <Sofa className="h-8 w-8" /> },
  { id: 11, name: "Property", icon: <Home className="h-8 w-8" /> },
];

export default function FeaturedSections() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Stores Section */}
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Featured Stores
          </h2>
          <Link
            href="#"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            View All
            <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {stores.map((store: Stores) => (
            <Link
              key={store.id}
              href="#"
              className="flex items-center space-x-3 rounded-lg p-2 transition duration-150 hover:bg-gray-50"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md ${store.bgColor}`}
              >
                <Image
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-800">
                {store.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Categories Section */}
      <div>
        <div className="mb-6 flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Featured Categories
          </h2>
          <Link
            href="#"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="#"
              className="flex flex-col items-center justify-center rounded-lg border p-6 text-center transition duration-150 hover:shadow-md"
            >
              <div className="mb-3">{category.icon}</div>
              <span className="text-sm font-medium text-gray-800">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
