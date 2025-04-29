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
    const res = await fetch("https://api-hf.com/api/category/");
    const result = await res.json();
    return result.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      subcategories: (item.subcategory ?? []).map((subcategory: any) => ({
      id: subcategory.id,
      name: subcategory.name,
      })),
    }));
    console.log("success");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
}