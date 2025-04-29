import { Item } from "@radix-ui/react-dropdown-menu";
import axiosInstance from "src/api/axiosInstance";
import { SubCategory } from "./types";



export interface Category {
  id: number;
  name: string;
  subcategories?: SubCategory[] ;
}

// Sample data based on the image
// export const categories: Category[] = [
//   {
//     name: "Automotive",
//     subcategories: [
//       "Wheels & Tyres",
//       "Paint & Panel Repair",
//       "Harrop Distributors",
//       "Servicing",
//       "Workshops",
//       "Detailing & Car Care",
//       "Welding & Trailers",
//       "ECU Mapping",
//       "Car Club",
//       "Towing & Transport",
//       "Turbosmart Distributor",
//       "APR Distributor",
//       "EV Chargers",
//       "Motorcycles & ATV",
//       "Mobile Mechanic",
//       "Car Storage",
//       "4x4",
//       "Wraps Signage & Tinting",
//       "Parts & Accessories",
//     ],
//   },
//   {
//     name: "Trades & Services",
//     subcategories: [
//       "Air Conditioning",
//       "Electrical",
//       "Plumbing",
//       "Building",
//       "Flooring",
//       "Epoxy",
//       "Painting",
//       "Handyman",
//       "Pest Control",
//       "Shutters & Blinds",
//     ],
//   },
//   {
//     name: "Services",
//     subcategories: [
//       "Property",
//       "Insurance",
//       "Shipping",
//       "Real Estate",
//       "Finance & Mortgage",
//       "Photo, Video & Art",
//       "Digital Marketing",
//       "Training & Education",
//     ],
//   },
//   {
//     name: "Retail",
//     subcategories: [
//       "Tools",
//       "Collectables",
//       "Jewellery",
//       "Apparel",
//       "Electronics & Appliances",
//       "Furniture & Homeware",
//     ],
//   },
//   {
//     name: "Beauty",
//     subcategories: ["Hairdresser", "Barber", "Beautician", "Tattoo", "Salon"],
//   },
//   {
//     name: "Health & Fitness",
//     subcategories: ["Pharmacy", "Supplements", "Gym", "Personal Trainer"],
//   },
//   {
//     name: "Entertainment",
//     subcategories: ["Gaming", "Racing", "Events", "Promotions"],
//   },
//   {
//     name: "Food & Beverages",
//     subcategories: ["Restaurant & Cafe", "Beverages", "Food Truck"],
//   },
//   {
//     name: "Pets",
//     subcategories: ["Dogs", "Cats", "Aquarium"],
//   },
//   {
//     name: "Recreation",
//     subcategories: ["Travel & Camping", "Boating"],
//   },
//   {
//     name: "Affiliates",
//     subcategories: [],
//   },
//   {
//     name: "Kitchen & Joinery Supplies",
//     subcategories: [],
//   },
//   {
//     name: "Home Maintenance",
//     subcategories: [],
//   },
//   {
//     name: "Home Improvement / Home",
//     subcategories: [],
//   },
//   {
//     name: "Motorcycles Servicing",
//     subcategories: [],
//   },
//   {
//     name: "hospitality/bar & nightclubs",
//     subcategories: [],
//   },
//   {
//     name: "Credit Repair & Debt Negotiation",
//     subcategories: [],
//   },
//   {
//     name: "Excavation/Telecommunications",
//     subcategories: [],
//   },
//   {
//     name: "Tourism",
//     subcategories: [],
//   },
//   {
//     name: "Window Covering Industry",
//     subcategories: [],
//   },
//   {
//     name: "Homeware & Decor Category",
//     subcategories: [],
//   },
//   {
//     name: "Transportation - Luxury Chauffeur Driven Cars And Limousines",
//     subcategories: [],
//   },
//   {
//     name: "Inflatables",
//     subcategories: [],
//   },
//   {
//     name: "Pneumatics",
//     subcategories: [],
//   },
//   {
//     name: "Events / Entertainment",
//     subcategories: [],
//   },
//   {
//     name: "Agriculture - Facilities - Maintenance - Drones",
//     subcategories: [],
//   },
//   {
//     name: "Pet Accessories",
//     subcategories: [],
//   },
//   {
//     name: "Photo Booth",
//     subcategories: [],
//   },
//   {
//     name: "Drone Photography",
//     subcategories: [],
//   },
//   {
//     name: "Party Hire",
//     subcategories: [],
//   },
//   {
//     name: "Printing Business Services",
//     subcategories: [],
//   },
//   {
//     name: "Skincare products/ home fragrance",
//     subcategories: [],
//   },
//   { name: "Garage Equipment and storage sales", subcategories: [] },
// ];

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await axiosInstance.get("/api/category/", {
      
      withCredentials: true,
    });
    return response.data.map((Item: any) => ({
      
      id : Item.id,
      name: Item.name,
      subcategories: (Item.subcategory ?? []).map((subcategory: any) => ({
        
        id: subcategory.id,
        name: subcategory.name,
      })),
     }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
}