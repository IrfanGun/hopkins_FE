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
    const response = await axiosInstance.get("/api/category", {
      
      withCredentials: true
    });

    console.log('berhasil ambil data. tidur dulu......');
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