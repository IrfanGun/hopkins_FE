"use client";

import { useState, useEffect } from "react";
import { Trash2, PencilLine, Delete } from "lucide-react";
import { fetchPartner as defaultPartners, Partner } from "../../../../lib/partners";
import PopupsForm from "../_components/PopupsForm";
import { Spinner, ThemeProvider  } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import ShowModal from "src/components/ui/custom-modal";
import axiosInstance from "src/api/axiosInstance";
import { tree } from "next/dist/build/templates/app-page";


export default function PopupsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState<string[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);
 const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);


  const [form, setForm] = useState<Omit<Partner, "id">>({
    name: "",
    category: "",
    logo: "",
    isPopular: false,
    discount: "",
    discountText: "",
    promoCode: "",
    description: "",
    tags: [],
    storeAddress: "",
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    website: "",
    hasMap: "",
    url: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const loadPartners = async () => {
    try {

      setLoading(true);
      const data = await defaultPartners();
      setPartners(data);
    
    } catch (error) {

      console.error("Failed to fetch partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const reloadData = () => {
    loadPartners();
  }

  useEffect(() => {
   
    loadPartners();
  }, []);

  const handleEdit = (partner: Partner) => {
    setEditId(partner.id);
    setSelectedPartner(partner);
    
    setForm({ ...partner });

  };

  const handleDelete = (id: number) => {
    const partner = partners.find(p => p.id === id);
    setPartnerToDelete(id);

    if (partnerToDelete !== null) {
      setPartnerToDelete(id);
      setMessage([`Are you sure you want to delete ${partner?.name}?`])
      setIsDelete(true);
      setShowModal(true);
  
    }
    
    
  };

  const confirmClose = () => {
    setShowModal(false);
    setMessage([]);
    setPartnerToDelete(null);
    setIsDelete(false);
  }

  const confirmDelete = async() => {

    setIsLoadingDelete(true)

    try {
      
      const response = await axiosInstance.delete(`/api/product/${partnerToDelete}`);

    } catch (error) {


    } finally {

      const loadPartner = async() => {
        const data = await defaultPartners();
        setPartners(data);
      }
      
      loadPartner();

      setMessage([]);
      setPartnerToDelete(null);
      setIsLoadingDelete(false);
      setShowModal(false);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Manage Pop-up Products
      </h1>
      <PopupsForm 
        reloadData = {reloadData} editPartner={selectedPartner}
      />
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Existing Partner Pop-ups
        </h2>
        {  isDelete && showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
           
                 <ShowModal
                 setMessage={Message}        // <-- ini fungsi, bukan Message
                 setClose={confirmClose}
                 setDelete={confirmDelete}
                 isDelete={isDelete}
                 deleteId={partnerToDelete}
                 isLoading={isLoadingDelete}

               />
       </div>

        )  }
       
            
        { isLoading ? (
          
          <div className="item-center text-center">
            <ThemeProvider theme={customTheme}>

            <Spinner size="xl" color="base" />

            </ThemeProvider>
            
        </div>

        ) : (
          <ul className="divide-y divide-gray-200">
          {partners.map((partner) => (
            <li key={partner.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">{partner.name}</h3>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                  <div className="text-xs text-gray-400">
                    Tags: {partner.tags?.join(", ")} | Promo:{" "}
                    {partner.promoCode}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="text-blue-500"
                  >
                    <PencilLine className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
          
        ) }


              

      </div>
    </div>
  );
}
