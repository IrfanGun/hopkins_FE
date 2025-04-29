"use client";

import { useState } from "react";
import {
  giveaways as initialGiveaways,
  addGiveaway,
  updateGiveaway,
  deleteGiveaway,
  Giveaway,
} from "../../../../lib/giveaway";

export default function AdminGiveawaysPage() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>(initialGiveaways);
  const [form, setForm] = useState<Omit<Giveaway, "id">>({
    title: "",
    image: "",
    status: "Live",
    dateText: "",
    tbd: false,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? "" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId) {
      const updated: Giveaway = { id: editId, ...form };
      updateGiveaway(updated);
      setGiveaways([...initialGiveaways]); // refresh
      setEditId(null);
    } else {
      const newGiveaway: Giveaway = { id: Date.now().toString(), ...form };
      addGiveaway(newGiveaway);
      setGiveaways([...initialGiveaways]); // refresh
    }

    setForm({ title: "", image: "", status: "Live", dateText: "", tbd: false });
  };

  const handleEdit = (g: Giveaway) => {
    setForm({ ...g });
    setEditId(g.id);
  };

  const handleDelete = (id: string) => {
    deleteGiveaway(id);
    setGiveaways([...initialGiveaways]); // refresh
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Giveaway Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        >
          <option value="Live">Live</option>
          <option value="Early Bird">Early Bird</option>
          <option value="Closed">Closed</option>
          <option value="Not Yet Open">Not Yet Open</option>
        </select>
        <input
          name="dateText"
          placeholder="Date Text"
          value={form.dateText}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="tbd"
            checked={form.tbd}
            onChange={handleChange}
          />
          TBD?
        </label>
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white"
        >
          {editId ? "Update" : "Add"} Giveaway
        </button>
      </form>

      <ul className="space-y-4">
        {giveaways.map((g) => (
          <li key={g.id} className="rounded border p-4 shadow-sm">
            <div className="font-bold">{g.title}</div>
            <div className="text-sm text-gray-600">{g.dateText}</div>
            <div className="text-sm text-gray-500">Status: {g.status}</div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(g)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(g.id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
