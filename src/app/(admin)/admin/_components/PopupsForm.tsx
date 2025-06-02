"use client";

import { useEffect, useState } from "react";
import {
  fetchPartner as defaultPartners,
  Partner,
} from "../../../../lib/partners";
import { Button } from "../../../components/ui/button";
import { getStates, States } from "../../../../lib/states";
import { Category, fetchCategories } from "src/lib/categories";
import { SubCategory } from "src/lib/types";
import axiosInstance from "src/api/axiosInstance";
import { AxiosError } from "axios";
import ShowModal from "src/components/ui/custom-modal";
import { Spinner, ThemeProvider } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";

type PopupsFormProps = {
  reloadData: () => void; 
  editPartner?: Partner | null;
};

export default function PopupsForm({
  reloadData,
  editPartner,
}: PopupsFormProps) {


  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
  const [states, setStates] = useState<States[]>([]);
  const [partners, setPartners] = useState<Partner[]>();
  const [editId, setEditId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Notification, setNotification] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const defaultForm = {
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
  };

  const [form, setForm] = useState<Partial<Partner>>(defaultForm);

  useEffect(() => {
    if (editPartner) {
      setEditId(editPartner.id);
      setForm({ ...editPartner });
    } else {
      setForm(defaultForm);
    }
  }, [editPartner]);

  const handleSubCategory = (e: React.ChangeEvent<any>) => {
    try {
      const { name, id, value, type, checked } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      const subcategory = categories
        .filter((e) => e.id == value)
        .flatMap((e) => e.subcategories);
      setSubCategories(
        subcategory.filter((sub): sub is SubCategory => sub !== undefined),
      );
    } catch (error) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category) return;

    setIsLoading(true);

    try {
      if (editPartner) {
        try {
          await axiosInstance.put(`/api/product/${editPartner.id}`, {
            name: form.name,
            category: form.category,
            subcategory: form.subcategory,
            logo: form.logo,
            discount: form.discount,
            discountText: form.discountText,
            promoCode: form.promoCode,
            description: form.description,
            tags: form.tags,
            storeAddress: form.storeAddress,
            email: form.email,
            phone: form.phone,
            facebook: form.facebook,
            instagram: form.instagram,
            website: form.website,
            hasMap: form.hasMap,
            url: form.url,
            isPopular: form.isPopular,
            states: form.states,
          });
        } catch (error) {}
      } else {
        const response = await axiosInstance.post("/api/product", {
          name: form.name,
          category: form.category,
          subcategory: form.subcategory,
          logo: form.logo,
          discount: form.discount,
          discountText: form.discountText,
          promoCode: form.promoCode,
          description: form.description,
          tags: form.tags,
          storeAddress: form.storeAddress,
          email: form.email,
          phone: form.phone,
          facebook: form.facebook,
          instagram: form.instagram,
          website: form.website,
          hasMap: form.hasMap,
          url: form.url,
          isPopular: form.isPopular,
          states: form.states,
        });
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setNotification(allMessages);
        setShowNotification(true);
      }
    } finally {
      const loadPartners = async () => {
        const data = await defaultPartners();
        setPartners(data);
      };
      loadPartners();
      setIsLoading(false);
      reloadData();
      setForm(defaultForm);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchCategory = await fetchCategories();
        setCategories(fetchCategory);
      } catch (e) {
     
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const fetchStates = await getStates();
        setStates(fetchStates);
      } catch (error) {
     
      }
    };
    loadStates();
  }, []);

  return (
    <div>
      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Notification}
            setClose={() => setShowNotification(false)}
            isLoading={isLoading}
          />
        </div>
      )}
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
              <option key={cat.id} value={cat.id}>
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
        {isLoading ? (
          <Button disabled className="flex items-center gap-2 bg-orange-500">
            <ThemeProvider theme={customTheme}>
              <Spinner size="sm" color="base" />
            </ThemeProvider>
          </Button>
        ) : (
          <Button
            className="bg-orange-500 hover:bg-orange-700 hover:text-white"
            type="submit"
          >
            {editId ? "Update Partner" : "Add Partner"}
          </Button>
        )}
      </form>
    </div>
  );
}
