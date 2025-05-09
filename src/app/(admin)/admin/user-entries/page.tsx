"use client";

import { useEffect, useState } from "react";
import {
  fetchUserEntries as initialEntries,
  UserEntries,
} from "../../../../lib/userEntries";
import { Target } from "lucide-react";
import axiosInstance from "src/api/axiosInstance";
import ShowModal from "src/components/ui/custom-modal";
import { AxiosError } from "axios";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";




export default function AdminUserEntriesPage() {
  const [entries, setEntries] = useState<UserEntries[]>([]);
  const [editId, setEditId] = useState<number | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [Message, setMessage] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [UserId, setUserId] = useState<number | undefined | null>();
  const [isLoadingData, setIsLoadingData] = useState(false);


  const [form, setForm] = useState<Omit<UserEntries, "id">>({
    title: "",
    date: "",
    image: "",
    loyaltyPoints: 0,
    addressURL: "",
    showWinBadge: false,
  });

  const handleCloseModal = () => {
    setIsShowModal(false);
    setMessage([]);
    setUserId(null);
    setIsLoading(false);
  }

  const confirmDelete = async () => {

    setIsLoadingDelete(true);

    try {

      const response = await axiosInstance.delete(`/api/user-entries/${UserId}`);



    } catch (error) {
      
    } finally {
      setUserId(null);
      setIsLoadingDelete(false);
      setIsShowModal(false);
      setMessage([]);
      loadUser();

    }

  }

 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)
    try {

      const response = await axiosInstance.post('/api/user-entries', {
        title: form.title,
        date: form.date,
        image_url: form.image,
        loyal_points: form.loyaltyPoints,
        show_win_badge: form.showWinBadge,
        address_url : form.addressURL,

      });


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
      
      setForm({
        title: "",
        date: "",
        image: "",
        loyaltyPoints: 0,
        addressURL : "",
        showWinBadge: false,
      });
      loadUser();

    }



  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)
    try {

      const response = await axiosInstance.put(`/api/user-entries/${editId}`, {
        title: form.title,
        date: form.date,
        image_url: form.image,
        loyal_points: form.loyaltyPoints,
        show_win_badge: form.showWinBadge,
        address_url : form.addressURL,

      });


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
      setEditId(null);
      setForm({
        title: "",
        date: "",
        image: "",
        loyaltyPoints: 0,
        addressURL: "",
        showWinBadge: false,
      });
      loadUser();

    }



  };

  const handleEdit = (entry: UserEntries) => {
    setForm({
      title: entry.title || "",
      date: entry.date || "",
      image: entry.image || "",
      addressURL : entry.addressURL,
      loyaltyPoints: entry.loyaltyPoints ?? 0,
      showWinBadge: entry.showWinBadge ?? false,
    });
    setEditId(Number(entry.id));
  
  };

  const handleDelete = (id: string) => {
    // setEntries((prev) => prev.filter((e) => e.id !== id));
    // if (editId === id) setEditId(null);
   
    setUserId(Number(id));
    setIsShowModal(true);
    setIsDelete(true);
    setMessage(["Are you sure delete this entries ?"]);

  };

  const loadUser = async () => {

    try {
      setIsLoadingData(true);
      const response = await initialEntries();
      setEntries(response);

    } catch (error) {

    } finally {
      setIsLoadingData(false);
    }


  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Manage User Entries</h1>
      {isShowModal &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Message}
            setClose={handleCloseModal}
            isDelete={isDelete}
            setDelete={confirmDelete}
            deleteId={UserId}
            isLoading={isLoadingDelete}
          />
        </div>
      }


      {/* Form */}
      <form onSubmit={editId ? handleUpdate : handleSubmit} className="mb-6 space-y-4">
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
         <input
          type="text"
          name="addressURL"
          placeholder="address URL"
          value={form.addressURL}
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
      {isLoading ? 
      (
        <div className="text-center rounded-md bg-orange-500 px-4 py-2  inline-block">
        <ThemeProvider theme={customTheme}>
          <Spinner color="base" size="md" />
        </ThemeProvider>
      </div>

      ) : (
        <button
          type="submit"
          className="rounded bg-orange-500 px-4 py-2 text-white"
        >
          {editId ? "Update Entry" : "Add Entry"}
        </button>
      )

      }
        
      </form>

      {/* List */}
      <div className="bg-white rounded-md py-4">

      {isLoadingData ? (
         <div className="text-center">
         <ThemeProvider theme={customTheme}>
           <Spinner color="base" size="xl" />
         </ThemeProvider>
       </div>
      ) : (
        <ul className="space-y-4 rounded-md px-4 bg-white">
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
      )

      }
      

      </div>

    </div>
  );
}
