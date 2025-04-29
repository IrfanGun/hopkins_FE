"use client";

import { useEffect, useState } from "react";
import { partners as defaultPartners, Partner } from "../../../../lib/partners";
import { Button } from "../../../components/ui/button";
import { getStates, States } from "../../../../lib/states";
import { Category, fetchCategories } from "src/lib/categories";
import { SubCategory } from "src/lib/types";
import axiosInstance from "src/api/axiosInstance";


export default function PopupsForm() {
  // interface subCategory {
  //   id : number;
  //   name : string;
  // };
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]) 
  const [states, setStates] = useState<States[]>([]);
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Partner>>({
    name: "",
    category: "",
    subcategory: "",
    logo: "",
    discount: "",
    discountText: "",
    promoCode: "",
    description: "",
    tags: [],
    storeAddress: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    website: "",
    hasMap: "",
    url: "",
    isPopular: false,
  });

  const handleSubCategory = (e: React.ChangeEvent<any>) => {
    try {
      const { name, id, value, type, checked } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      
      
      const subcategory = categories.filter(e => e.id == value).flatMap((e => e.subcategories));
      
      setSubCategories(subcategory.filter((sub): sub is SubCategory => sub !== undefined));
      
     
    } catch (error) {
      console.error("Error handling subcategory change:", error);
    }

    
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setForm((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    console.log(form);
    // if (editId !== null) {
    //   setPartners((prev) =>
    //     prev.map((partner) =>
    //       partner.id === editId
    //         ? ({ ...partner, ...form } as Partner)
    //         : partner,
    //     ),
    //   );
    // } else {
    //   const newPartner: Partner = {
    //     id: Date.now(),
    //     ...form,
    //     tags: form.tags ?? [],
    //     isPopular: form.isPopular ?? false,
    //   } as Partner;

    //   setPartners((prev) => [...prev, newPartner]);
    // }
    const sendForm = async () => {
      try {
        const response = await axiosInstance.post('api/product/', form );
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      
    } 

    sendForm();

    // setEditId(null);
    // setForm({
    //   name: "",
    //   category: "",
    //   subcategory : "",
    //   logo: "",
    //   discount: "",
    //   discountText: "",
    //   promoCode: "",
    //   description: "",
    //   tags: [],
    //   storeAddress: "",
    //   email: "",
    //   phone: "",
    //   facebook: "",
    //   instagram: "",
    //   website: "",
    //   hasMap: "",
    //   url: "",
    //   isPopular: false,
    // });
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchCategory = await fetchCategories();
        setCategories(fetchCategory);
        
      } catch (e)
      {
        console.log(e);
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    const loadStates = async () => {
      try {
        const fetchStates = await getStates()
        setStates(fetchStates);
    
      } catch (error) {
        console.error("Error loading states:", error);
      }
    }
    loadStates();
  }, []);

  // Unique categories
  const uniqueCategories = [...new Set(partners.map((p) => p.category))];
  // const uniqueStates = [...new Set(states.map((p) => p.state))];

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {editId ? "Edit Partner Pop-up" : "Add New Partner Pop-up"}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Name"
          value={form.name ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
          required
        />

        <select
          name="category"
          value={form.category ?? ""}
          onChange={handleSubCategory}
          className="w-full rounded border px-3 py-2 text-sm"
          required
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id} >

              {cat.name} 
            </option>
          ))}
        </select>
        <select
          name="states"
          value={form.states ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
          required
        >
          <option value="">States</option>
          {states.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} | {e.shortName}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={form.subcategory ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
          required
        >
          <option value="">Sub Categori</option>
          {subcategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} 
            </option>
          ))}
        </select>

        <input
          name="logo"
          placeholder="Logo URL"
          value={form.logo ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="discount"
          placeholder="Discount"
          value={form.discount ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="discountText"
          placeholder="Discount Text"
          value={form.discountText ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="promoCode"
          placeholder="Promo Code"
          value={form.promoCode ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="storeAddress"
          placeholder="Store Address"
          value={form.storeAddress ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="facebook"
          placeholder="Facebook URL"
          value={form.facebook ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="instagram"
          placeholder="Instagram URL"
          value={form.instagram ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="website"
          placeholder="Website URL"
          value={form.website ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="hasMap"
          placeholder="Map Image URL or Embed"
          value={form.hasMap ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />

        <input
          name="url"
          placeholder="Official Website Link"
          value={form.url ?? ""}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description ?? ""}
        onChange={handleChange}
        className="w-full rounded border px-3 py-2 text-sm"
      />

      <input
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleTagsChange}
        className="w-full rounded border px-3 py-2 text-sm"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPopular"
          checked={form.isPopular ?? false}
          onChange={handleChange}
        />
        <label htmlFor="isPopular" className="text-sm text-gray-700">
          Popular Partner
        </label>
      </div>

      <Button
        className="bg-orange-500 hover:bg-orange-700 hover:text-white"
        type="submit"
      >
        {editId ? "Update Partner" : "Add Partner"}
      </Button>
    </form>
  );
}
