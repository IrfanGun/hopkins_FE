"use client";

import { useState, useEffect } from "react";
import { FileMinus, PencilLine, Trash2 } from "lucide-react";
import { Ticket, fetchSupport } from "../../../../lib/support";
import SupportForm from "../_components/SupportForm";
import { Spinner, ThemeProvider } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import ShowModal from "src/components/ui/custom-modal";
import { AxiosError } from "axios";
import axiosInstance from "src/api/axiosInstance";




export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Message, setMessage] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [SupportId, setSupportId] = useState<number | null>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [IsLoadingDelete, setIsLoadingDelete] = useState(false);

  
  

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
    // setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    // if (editId === id) setEditId(null);
   
    setIsDelete(true);
    setSupportId(id);
    setMessage(["Are you sure delete this subject ? "]);
    setIsShowModal(true);

  };

  const confirmDelete = async () => {

    try {

      setIsLoadingDelete(true);
      const response = await axiosInstance.delete(`/api/support-tickets/${SupportId}`);
      

    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setMessage(allMessages);
        setIsShowModal(true);

      }

    } finally {
      setIsLoadingDelete(false);
      setIsShowModal(false);
      setIsDelete(false);
      setSupportId(null);
      setMessage([]);
      loadSupport();
     
    }

  }

  const loadSupport = async () => {
    try {

      setIsLoading(true)
      const response = await fetchSupport();
      setTickets(response);

    } catch {
      console.log();
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {

    loadSupport();

  }, []);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Support Tickets</h1>
      {isShowModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Message}
            setClose={() => setIsShowModal(false)}
            isDelete={isDelete}
            setDelete={confirmDelete}
            deleteId={SupportId}
            isLoading={IsLoadingDelete}
          />
        </div>
      }



      {/* Form */}
      <SupportForm  onSuccess={loadSupport} />

      {/* List */}
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Ticket List
        </h2>
        {isLoading && (
          <div className="text-center">
            <ThemeProvider theme={customTheme}>
              <Spinner color="base" size="xl" />
            </ThemeProvider>
          </div>

        )

        }

        { 
        !isLoading && (
          <ul className="divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="flex items-start justify-between p-3 hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{ticket.subject}</h3>
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
        ) 
        }

      </div>
    </div>
  );
}
