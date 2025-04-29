import { useState } from "react";
import { Ticket, dummyTickets } from "../../../../lib/support";
import { Button } from "../../../components/ui/button";

export default function SupportForm() {
  const [any, setTickets] = useState<Ticket[]>(dummyTickets);

  const [form, setForm] = useState<Omit<Ticket, "id" | "createdAt">>({
    subject: "",
    message: "",
    userEmail: "",
    status: "open",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editId !== null) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === editId ? { ...ticket, ...form } : ticket,
        ),
      );
      setEditId(null);
    } else {
      const newTicket: Ticket = {
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
        ...form,
      };
      setTickets((prev) => [...prev, newTicket]);
    }

    setForm({ subject: "", message: "", userEmail: "", status: "open" });
  };

  const handleEdit = (ticket: Ticket) => {
    setEditId(ticket.id);
    setForm({
      subject: ticket.subject,
      message: ticket.message,
      userEmail: ticket.userEmail,
      status: ticket.status,
    });
  };

  const handleDelete = (id: number) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    if (editId === id) setEditId(null);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {editId ? "Edit Ticket" : "Add Ticket (Manual)"}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          User Email
        </label>
        <input
          type="email"
          name="userEmail"
          value={form.userEmail}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
        >
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <Button type="submit">{editId ? "Update Ticket" : "Add Ticket"}</Button>
    </form>
  );
}
