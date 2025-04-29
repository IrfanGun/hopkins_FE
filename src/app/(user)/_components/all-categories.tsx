import Link from "next/link";
import { fetchCategories as categories } from "../../../lib/categories";
import React from "react";

type Category = {
  name: string;
  subcategories: string[];
};

export default function AllCategories() {
  const [groupedCategories, setGroupedCategories] = React.useState<Category[][]>([]);

  React.useEffect(() => {
    async function fetchAndGroupCategories() {
      const fetchedCategories = await categories();
      const grouped = [];
      for (let i = 0; i < fetchedCategories.length; i += 5) {
        grouped.push(fetchedCategories.slice(i, i + 5));
      }
      setGroupedCategories(grouped);
    }
    fetchAndGroupCategories();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between border-b pb-2">
        <h2 className="text-xl font-semibold text-secondary-color">
          All Categories
        </h2>
      </div>

      {groupedCategories.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-5"
        >
          {row.map((category) => (
            <div key={category.name} className="flex flex-col">
              <h3 className="mb-4 text-sm font-bold text-secondary-color">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm font-normal text-gray-500 transition-all hover:text-gray-800"
                    >
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
