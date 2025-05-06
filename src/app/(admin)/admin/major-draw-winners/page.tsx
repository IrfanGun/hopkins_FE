"use client";

import { useEffect, useState } from "react";
import {
  fetchDraws, MajorDrawWinner
} from "../../../../lib/majorWinners";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import axiosInstance from "src/api/axiosInstance";
import { boolean } from "zod";
import { AxiosError } from "axios";
import ShowModal from "src/components/ui/custom-modal";



export default function MajorDrawWinnersAdminPage() {
  const defaultForm: Omit<MajorDrawWinner, "id"> = {
    title: "",
    date: "",
    winners: [],
    image: "",
  };

  const [data, setData] = useState<MajorDrawWinner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<Omit<MajorDrawWinner, "id">>(defaultForm);
  const [isLoadingData, setIsLoadingData] = useState<Boolean>(false);
  const [Notification, setNotification] = useState<String[]>([]);
  const [showNotification, setShowNotification] = useState<Boolean>();
  const [isDelete, setIsDelete] = useState(false);
  const [BannerId, setBannerId] = useState<number | null>();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);


  const [editId, setEditId] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState({ label: "", prize: "" });

  const HandleDelete = async () => {

    setIsLoadingDelete(true);

    try {

      const response = await axiosInstance.delete(`api/major-draws/${BannerId}`);

    } catch (error) {


      const err = error as AxiosError;

      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setIsLoadingDelete(false);
        setNotification(allMessages);
        setShowNotification(true);


      }

    } finally {
      setIsLoading(false);
      setIsLoadingDelete(false);
      loadDraw();
    }
  }

  const HandleClose = async () => {
    setShowNotification(false);
    setNotification([]);
    setIsDelete(false);
    setBannerId(null);
    setIsLoadingDelete(false);
  }

  const loadDraw = async () => {
    try {

      setIsLoading(true);
      const response = await fetchDraws();
      setData(response);
      console.log(response);


    } catch (error) {



    } finally {
      setIsLoading(false);
    }


  }

  useEffect(() => {
    loadDraw();
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPrize((prev) => ({ ...prev, [name]: value }));
  };

  const addPrize = async() => {

    console.log(newPrize);
    if (editId == null) {

      setNotification(["Add the prize first berfore fill the winners !"]);
      setShowNotification(true);

    } else {

      try {

        const response = await axiosInstance.post('/api/major-winners', {
          draw_id : editId,
          label : newPrize.label,
          prize : newPrize.label,
        });
  
      } catch (error) {
        const err = error as AxiosError;

        if (err.response) {
  
          const errorData = err.response.data as Record<string, string[]>;
          const allMessages: string[] = Object.values(errorData).flat();
          setNotification(allMessages);
          setShowNotification(true);
  
        }
  
        
      } finally {
        
        loadDraw();
      }

    }
   

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      setIsLoadingData(true);
      const response = await axiosInstance.post('/api/major-draws', {
        title: form.title,
        date: form.date,
        image_url: form.image

      });

    } catch (error) {

      const err = error as AxiosError;

      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setNotification(allMessages);
        setShowNotification(true);

      }

    } finally {

      setIsLoadingData(false);
      setEditId(null);
      loadDraw();


    }

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

  // Update Submit
  const submitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    try {

      setIsLoadingData(true);
      const response = await axiosInstance.put(`/api/major-draws/${editId}`, {
        title: form.title,
        date: form.date,
        image_url: form.image
      });


    } catch (error) {

      const err = error as AxiosError;

      if (err.response) {

        const errorData = err.response.data as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setNotification(allMessages);
        setShowNotification(true);

      }

    } finally {

      setIsLoadingData(false);
      loadDraw();

    }


  }

  const handleDelete = (id: string) => {
    console.log(id);
    setShowNotification(true);
    setIsDelete(true);
    setNotification(["Are sure delete this draw ?"]);
    setBannerId(Number(id));
  };

  return (
    <div className="p-6">


      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Notification}
            setClose={HandleClose}
            isDelete={isDelete}
            setDelete={HandleDelete}
            deleteId={BannerId}
            isLoading={isLoadingDelete}
          />
        </div>
      )}


      <h1 className="mb-4 text-2xl font-bold">Manage Major Draw Winners</h1>

      <form onSubmit={editId ? submitUpdate : handleSubmit} className="mb-6 space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title ?? ""}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />
        <input
          name="date"
          placeholder="Date (e.g. 14/04/25)"
          value={form.date ?? ""}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image ?? ""}
          onChange={handleFormChange}
          className="w-full border px-3 py-2"
          required
        />


        {isLoadingData ? (
          <div className="px-2 py-2 inline-block rounded-md bg-orange-500">
            <ThemeProvider theme={customTheme}>
              <Spinner color="base" />
            </ThemeProvider>
          </div>
        ) : (

          <button
            type="submit"
            className="rounded bg-orange-500 px-4 py-2 text-white"
          >
            {editId ? "Update" : "Add"} Winner
          </button>

        )


        }

      </form>

      {/* Winner Prizes */}
      <div className="space-y-2">
        <h4 className="font-semibold">Add Winner</h4>

        {/* FORM TERPISAH UNTUK ADD PRIZE */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPrize();
          }}
          className="flex gap-2"
        >
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
            type="submit"
            className="rounded bg-blue-500 px-4 text-white"
          >
            Add
          </button>
        </form>

        <ul className="ml-4 list-disc text-sm text-gray-600">
          {form.winners.map((w, i) => (
            <li key={i}>
              {w.label}: {w.prize}
            </li>
          ))}
        </ul>
      </div>
      

      <div className="grid rounded-md mt-5 bg-white">
        <h1 className="mb-4 text-xl font-bold mt-2 ml-3">Major Draw List</h1>

        <div className=" grid-cols-1 gap-4 md:grid-cols-2 px-2 py-2">
          {isLoading ? (

            <div className="text-center">
              <ThemeProvider theme={customTheme}>
                <Spinner color="base" />
              </ThemeProvider>

            </div>

          ) : (
            data.map((item) => (
              <div key={item.id} className="rounded border p-4 mt-3 shadow-sm">
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
            ))
          )

          }

        </div>

      </div>
    </div>
  );
}
