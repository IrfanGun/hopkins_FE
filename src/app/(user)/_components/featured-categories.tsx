import {
  ChevronRight,
  Shirt,
  MonitorSmartphone,
  Car,
  Home,
  LayoutGrid,
} from "lucide-react";

export default function FeaturedCategories() {
  const categories = [
    { name: "Fashion", icon: Shirt },
    { name: "Elektronik", icon: MonitorSmartphone },
    { name: "Otomotif", icon: Car },
    { name: "Rumah Tangga", icon: Home },
    { name: "Lainnya", icon: LayoutGrid },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Featured Categories
        </h2>
        <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Icon className="mb-2 h-8 w-8 text-gray-700" />
              <span className="text-center text-sm font-medium text-gray-800">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
