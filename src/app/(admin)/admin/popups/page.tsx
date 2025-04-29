"use client";

import { useState } from "react";
import { Trash2, PencilLine } from "lucide-react";
import { partners as defaultPartners, Partner } from "../../../../lib/partners";
import PopupsForm from "../_components/PopupsForm";

export default function PopupsPage() {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [form, setForm] = useState<Omit<Partner, "id">>({
    name: "",
    category: "",
    logo: "",
    isPopular: false,
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
  });
  const [editId, setEditId] = useState<number | null>(null);

  const handleEdit = (partner: Partner) => {
    setEditId(partner.id);
    setForm({ ...partner });
  };

  const handleDelete = (id: number) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Manage Pop-up Products
      </h1>
      <PopupsForm />
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Existing Partner Pop-ups
        </h2>
        <ul className="divide-y divide-gray-200">
          {partners.map((partner) => (
            <li key={partner.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{partner.name}</h3>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                  <div className="text-xs text-gray-400">
                    Tags: {partner.tags?.join(", ")} | Promo:{" "}
                    {partner.promoCode}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="text-blue-500"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
