"use client";

import { useState } from "react";
import {
  userEntries as initialEntries,
  UserEntries,
} from "../../../../lib/userEntries";

export default function AdminUserEntriesPage() {
  const [entries, setEntries] = useState<UserEntries[]>(initialEntries);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<UserEntries, "id">>({
    title: "",
    date: "",
    image: "",
    loyaltyPoints: 0,
    showWinBadge: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editId ? { ...entry, ...form } : entry,
        ),
      );
      setEditId(null);
    } else {
      const newEntry: UserEntries = {
        id: Date.now().toString(),
        ...form,
      };
      setEntries((prev) => [...prev, newEntry]);
    }

    setForm({
      title: "",
      date: "",
      image: "",
      loyaltyPoints: 0,
      showWinBadge: false,
    });
  };

  const handleEdit = (entry: UserEntries) => {
    setForm({ ...entry });
    setEditId(entry.id);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Manage User Entries</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <input
          type="number"
          name="loyaltyPoints"
          placeholder="Loyalty Points"
          value={form.loyaltyPoints}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showWinBadge"
            checked={form.showWinBadge}
            onChange={handleChange}
          />
          Show Win Badge?
        </label>

        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white"
        >
          {editId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* List */}
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.id} className="rounded border p-4 shadow-sm">
            <div className="text-lg font-bold">{entry.title}</div>
            <div className="text-sm text-gray-600">{entry.date}</div>
            <div className="text-sm text-gray-500">
              Loyalty: {entry.loyaltyPoints} |{" "}
              {entry.showWinBadge ? "🎉 Winner" : "—"}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(entry)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
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
