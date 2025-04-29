import { Item } from "@radix-ui/react-dropdown-menu";
import axiosInstance from "src/api/axiosInstance";


export interface SubCategory {
  id: number;
  name: string;
}


export interface Category {
  id: number;
  name: string;
  subcategories?: SubCategory[] ;
}


export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch("https://api-hf.com/api/category/");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data.map((Item: any) => ({
      id: Item.id,
      name: Item.name,
      subcategories: (Item.subcategory ?? []).map((subcategory: any) => ({
      id: subcategory.id,
      name: subcategory.name,
      })),
    }));
  } 
  catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
}