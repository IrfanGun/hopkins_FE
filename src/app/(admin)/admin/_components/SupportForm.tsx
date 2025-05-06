import { useEffect, useState } from "react";
import { Ticket, fetchSupport } from "../../../../lib/support";
import { Button } from "../../../components/ui/button";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import axiosInstance from "src/api/axiosInstance";
import { ModalNotification } from "src/components/ui/custom-modal";
import ShowModal from "src/components/ui/custom-modal";
import { AxiosError } from "axios";

interface SupportFormProps {
  onSuccess: () => void;
}  

export default function SupportForm({ onSuccess }: SupportFormProps) {
  const [any, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [Message, setMessage] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [SupportId, setSupportId] = useState<number>();


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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/api/support-tickets', {

        subject: form.subject,
        message: form.message,
        user_email: form.userEmail,
        status: form.status

      });

      onSuccess();

    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setMessage(allMessages);
        setIsShowModal(true);


      }

    } finally {
      
      setIsLoading(false);

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

  const confirmDelete = () => {
      console.log("oleh");
  } 
  return (
    <div>
      {isShowModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Message}
            setClose={() => setIsShowModal(false)}
            isDelete={isDelete}
            setDelete={confirmDelete}
            deleteId={SupportId}
            isLoading={isLoading}

          />
        </div>
      }

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

        {isLoading ? (
         
          <div className="bg-orange-500 inline-block rounded-md px-4 justify-start py-2 text-sm ">
             <ThemeProvider theme={customTheme}><Spinner  size="md" color="base" /></ThemeProvider> 
          </div>
          
        ) : (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer" type="submit">{editId ? "Update Ticket" : "Add Ticket"}</Button>

        )

        }
      
      </form>

    </div>

  );
}
