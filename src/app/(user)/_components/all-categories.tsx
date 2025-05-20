import Link from "next/link";
import { fetchCategories as categories } from "../../../lib/categories";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react"

type Category = {
  name: string;
  subcategories: string[];
};

export default function AllCategories() {
  const [groupedCategories, setGroupedCategories] = React.useState<Category[][]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAndGroupCategories() {
      const fetchedCategories = await categories();
      const normalizedCategories = fetchedCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories?.map((sub: { name: string }) => sub.name) ?? [],
      }));
      const grouped: Category[][] = [];
      for (let i = 0; i < normalizedCategories.length; i += 5) {
        grouped.push(normalizedCategories.slice(i, i + 5));
      }
      setGroupedCategories(grouped);
    }
    fetchAndGroupCategories();
  }, []);
  
  return (
    <div>
      {groupedCategories.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-5">
          {row.map((category) => (
            <div key={category.name} className="flex flex-col">
              <h3 className="mb-3 text-sm font-bold text-gray-800">{category.name}</h3>
              <ul className="space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory} className="group">
                    <Link
                      href={`/partners/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center text-sm text-gray-600 transition-colors hover:text-orange-500"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/partners/${category.name.toLowerCase()}`}
                className="mt-2 text-xs font-medium text-orange-500 hover:underline"
              >
                View All
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
