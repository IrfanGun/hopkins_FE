"use client";

import { useState } from "react";
import { PencilLine, Trash2 } from "lucide-react";
import { Ticket, dummyTickets } from "../../../../lib/support";
import SupportForm from "../_components/SupportForm";

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(dummyTickets);

  const [form, setForm] = useState<Omit<Ticket, "id" | "createdAt">>({
    subject: "",
    message: "",
    userEmail: "",
    status: "open",
  });

  const [editId, setEditId] = useState<number | null>(null);

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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Support Tickets</h1>

      {/* Form */}
      <SupportForm />

      {/* List */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Ticket List
        </h2>
        {tickets.length === 0 ? (
          <p className="text-sm text-gray-500">No tickets available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="flex items-start justify-between p-3 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {ticket.subject}
                  </h3>
                  <p className="text-sm text-gray-600">{ticket.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {ticket.userEmail} • {ticket.createdAt} •{" "}
                    <span
                      className={
                        ticket.status === "open"
                          ? "text-green-600"
                          : ticket.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }
                    >
                      {ticket.status.toUpperCase()}
                    </span>
                  </p>
                </div>
                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
