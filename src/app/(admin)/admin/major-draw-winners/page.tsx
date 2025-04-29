"use client";

import { useState } from "react";
import {
  majorDrawWinners as initialWinners,
  addMajorDraw,
  updateMajorDraw,
  deleteMajorDraw,
  MajorDrawWinner,
} from "../../../../lib/majorWinners";

export default function MajorDrawWinnersAdminPage() {
  const [data, setData] = useState<MajorDrawWinner[]>(initialWinners);
  const [form, setForm] = useState<Omit<MajorDrawWinner, "id">>({
    title: "",
    date: "",
    winners: [],
    image: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState({ label: "", prize: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrize((prev) => ({ ...prev, [name]: value }));
  };

  const addPrize = () => {
    if (!newPrize.label || !newPrize.prize) return;
    setForm((prev) => ({
      ...prev,
      winners: [...prev.winners, newPrize],
    }));
    setNewPrize({ label: "", prize: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateMajorDraw({ id: editId, ...form });
    } else {
      addMajorDraw({ id: Date.now().toString(), ...form });
    }
    setData([...initialWinners]);
    setForm({ title: "", date: "", winners: [], image: "" });
    setEditId(null);
  };

  const handleEdit = (item: MajorDrawWinner) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      date: item.date,
      winners: item.winners,
      image: item.image,
    });
  };

  const handleDelete = (id: string) => {
    deleteMajorDraw(id);
    setData([...initialWinners]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Manage Major Draw Winners</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />
        <input
          name="date"
          placeholder="Date (e.g. 14/04/25)"
          value={form.date}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />

        {/* Winner Prizes */}
        <div className="space-y-2">
          <h4 className="font-semibold">Add Winner</h4>
          <div className="flex gap-2">
            <input
              name="label"
              placeholder="Label (e.g. 1st)"
              value={newPrize.label}
              onChange={handlePrizeChange}
              className="flex-1 border px-3 py-2"
              required
            />
            <input
              name="prize"
              placeholder="Prize Description"
              value={newPrize.prize}
              onChange={handlePrizeChange}
              className="flex-1 border px-3 py-2"
              required
            />
            <button
              type="button"
              onClick={addPrize}
              className="rounded bg-blue-500 px-4 text-white"
            >
              Add
            </button>
          </div>
          <ul className="ml-4 list-disc text-sm text-gray-600">
            {form.winners.map((w, i) => (
              <li key={i}>
                {w.label}: {w.prize}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="rounded bg-orange-600 px-4 py-2 text-white"
        >
          {editId ? "Update" : "Add"} Winner
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((item) => (
          <div key={item.id} className="rounded border p-4 shadow-sm">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.date}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {item.winners.map((w, idx) => (
                <li key={idx}>
                  {w.label} - {w.prize}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
