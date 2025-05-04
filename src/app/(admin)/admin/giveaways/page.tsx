"use client";

import { useEffect, useState } from "react";
import {
  Giveaway,
  fetchGiveaway as initialGiveaways
} from "../../../../lib/giveaway";
import axiosInstance from "src/api/axiosInstance";
import ShowModal from "src/components/ui/custom-modal";
import customTheme from "src/components/ui/spinner-custom";
import { ThemeProvider, Spinner } from "flowbite-react";
import { AxiosError } from "axios";



export default function AdminGiveawaysPage() {
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGiveawayLoading, setIsGiveawayLoading] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [Message, setMessage] = useState<string[]>([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [GiveawaysToDelete, setGiveawaysToDelete] = useState < number | null | undefined >();

  const confirmDelete = async () => {
    setIsLoadingDelete(true);
    
    try {

      const response = await axiosInstance.delete(`api/admin-gateway/${GiveawaysToDelete}`);
      
    } catch (error) {

      
    } finally {
      setIsShowModal(false);
      setGiveawaysToDelete(null);
      setIsLoadingDelete(false);
      
    }
    loadGiveaways();
  } 

  const confirmClose = () => {

    setIsShowModal(false);
    setMessage([]);


  }

  const [form, setForm] = useState<Omit<Giveaway, "id">>({
    title: "",
    image: "",
    status: "Live",
    dateText: "",
    tbd: false,
  });
  const [editId, setEditId] = useState<number| null>(null);

  const loadGiveaways = async () => {
    setIsGiveawayLoading(true);
    try {
      const response = await initialGiveaways();
      setGiveaways(response);

    } catch (error) {

    }

    setIsGiveawayLoading(false);
  }

  useEffect(() => {

    loadGiveaways();

  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    // <- Panggil fungsinya di sini
    try {

      setIsLoading(true);

      const response = await axiosInstance.post(`api/admin-gateway`, {
        title: form.title,
        image_url: form.image,
        status: form.status,
        date_text: form.dateText

      });

    } catch (error) {

      const err = error as AxiosError;
      console.log(err.response);
      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setMessage(allMessages);
        setIsShowModal(true);

      }


    } finally {
      setIsLoading(false);
      loadGiveaways();

    }

    // lanjutkan submit logic di sini

  };

  const handleEdit = (g: Giveaway) => {
    setForm({ ...g });
    setEditId(g.id);
    
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // <- Panggil fungsinya di sini
    try {

      setIsLoading(true);

      const response = await axiosInstance.put(`api/admin-gateway/${editId}`, {
        title: form.title,
        image_url: form.image,
        status: form.status,
        date_text: form.dateText
      });




    } catch (error) {

      const err = error as AxiosError;
      console.log(err.response);
      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setMessage(allMessages);
        setIsShowModal(true);

      }


    } finally {

      setIsLoading(false);
      console.log("cek");
      loadGiveaways();
    }

    // lanjutkan submit logic di sini

  };



  const handleDelete = (id: number) => {
    setGiveawaysToDelete(id);

    const deleteTitle = giveaways.filter((item ) => item.id === id).map((item) => item.title);

    setMessage([`Are you sure delete ${deleteTitle} `]);
    setIsDelete(true);
    setIsShowModal(true);



  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Giveaway Management</h1>
      <form onSubmit={editId ? handleUpdate : handleSubmit} className="mb-6 space-y-4">
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

        {isDelete && isShowModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

            <ShowModal
              setMessage={Message}        // <-- ini fungsi, bukan Message
              setClose={confirmClose}
              setDelete={confirmDelete}
              isDelete={isDelete}
              deleteId={GiveawaysToDelete}
              isLoading={isLoadingDelete}

            />
          </div>

        )
        }

        {isShowModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

            <ShowModal
              setMessage={Message}        // <-- ini fungsi, bukan Message
              setClose={confirmClose}
              setDelete={confirmDelete}
              isDelete={isDelete}
              deleteId={GiveawaysToDelete}
              isLoading={isLoadingDelete}

            />
          </div>

        )
        }




        {isLoading ? (

          <div className="flex justify-left">
            <div className="bg-orange-500 rounded px-4 py-2 inline-block">
              <ThemeProvider theme={customTheme}>
                <Spinner color="base" />
              </ThemeProvider>
            </div>
          </div>

        ) : (
          <button
            type="submit"
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            {editId ? "Update" : "Add"} Giveaway
          </button>)

        }
      </form>
      <div className="bg-white px-6 py-6">
        {isGiveawayLoading ? (
          <div className="text-center ">
            <ThemeProvider theme={customTheme}>
              <Spinner color="base" size="xl" />
            </ThemeProvider>
          </div>

        ) : (

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
        )


        }
      </div>
    </div>
  );
}
