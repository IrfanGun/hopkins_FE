import { Category, SubCategory } from "./types"; 

export function formatCategories(data: any[]): Category[] {
  return data.map((cat) => ({
    ...cat,
    subcategories: (cat.subcategories ?? []).map((sub: any, index: number) => ({
      id: sub.id ?? index + 1, 
      name: typeof sub === "string" ? sub : sub.name,
    })),
  }));
}
