"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Banner, fetchBanner as initialBanners } from "../../../../lib/banners";
import BannerList from "../_components/BannerList";
import BannerForm from "../_components/BannerForm";
import axiosInstance from "src/api/axiosInstance";
import { title } from "node:process";
import { AxiosError } from "axios";
import { ModalNotification } from "src/components/ui/custom-modal";
import ShowModal from "src/components/ui/custom-modal";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [showEditBannerModal, setShowEditBannerModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [isLoadBanner, setLoadBanner] = useState(false);
  const [Notification, setNotification] = useState < string[]>([]);
  const [showNotification, setShowNotification] = useState(false); 
  const [isDelete, setIsDelete] = useState(false);
  const [BannerId, setBannerId] = useState<number | null>(null);
  const [loadingBannerId, setLoadingBannerId] = useState<number | null>(null);


  const [newBanner, setNewBanner] = useState<Omit<Banner, "id">>({
    title: "",
    image: "",
    page: "Dashboard",
    active: true,

  });

  useEffect(()  => {
   
    const loadBanner = async () => {
      
      try {
        console.log("active")
        setLoadBanner(true);
        const response = await initialBanners();
        setBanners(response);
        

      } catch (e) {
  
      } finally {

        setLoadBanner(false);
      }
    }

    loadBanner();


  },[]) 

  const handleAddBanner = async () => {
    if (newBanner.title.trim() === "") return;
    
    setIsLoading(true);
    
    try {


      const response = await axiosInstance.post("/api/banner", {
        title : newBanner.title,
        image_url : newBanner.image,
        page : newBanner.page,
        is_active : newBanner.active,

      });
      
 
      
    } catch (error) {
      
      const err = error as AxiosError;
    
      if (err.response) {

        const errorData = err.response.data  as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        setNotification(allMessages);
      
        setShowNotification(true);
      
      } 
      
    } finally {

      setIsLoading(false);

      setShowAddBannerModal(false);
      const reloadBanner = async () => {
        const getBanner = await initialBanners();
        setBanners(getBanner);
      }
  
      reloadBanner();
    
      
    }
  };

  const handleEditBanner = async () => {



    setIsLoading(true);
    try {
      const id = selectedBanner?.id;
      const putBanner = await axiosInstance.put(`/api/banner/${id}`, {
        title : newBanner.title,
        image_url : newBanner.image,
        page : newBanner.page,
        is_active : newBanner.active,
      }
      );

    } catch (error) {

      const err = error as AxiosError;
    
      if (err.response) {

        const errorData = err.response.data  as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        console.log(allMessages);
        setNotification(allMessages);
        
        setShowNotification(true);
      
      } 

    } finally {

      setIsLoading(false);
      const reloadBanner = async () => {
        const getBanner = await initialBanners();
        setBanners(getBanner);
      };
      
      setShowEditBannerModal(false);
      reloadBanner();
  

    }


  };

  const handleDeleteBanner = (bannerId: number) => {

    setIsDelete(true);
    setShowNotification(true);
    console.log(bannerId);
    setBannerId(bannerId);
    setNotification(["Are you sure you want to delete this banner?"]);

  };

  const HandleDelete = async (bannerId : number) => {


    setIsLoading(true);

    try {
      
      const id = bannerId;
      const response = await axiosInstance.delete(`/api/banner/${id}`);

      
    } catch (error) {

      const err = error as AxiosError;
    
      if (err.response) {

        const errorData = err.response.data  as Record<string, string[]>;
        const allMessages: string[] = Object.values(errorData).flat();
        console.log(allMessages);
        setNotification(allMessages);
      
        setShowNotification(true);
      
      
      } 

      
      
    } finally {

      setIsLoading(false);
      const reloadBanner = async () => {
        const getBanner = await initialBanners();
        setBanners(getBanner);
       

      };
   
    
  
      setShowNotification(false);
      reloadBanner();
      setIsLoading(false);
      setIsDelete(false);

    }

  }
  

  const handleToggleActive = async (bannerId: number) => {

    setLoadingBannerId(bannerId);

    try {
      const targetBanner = banners.find((b) => b.id === bannerId);
      const response = await axiosInstance.put(`/api/banner/activation/${bannerId}`, {
        is_active: !targetBanner?.active,
      });
  
      // Update hanya banner yang diubah
      setBanners((prevBanners) =>
        prevBanners.map((banner) =>
          banner.id === bannerId
            ? { ...banner, active: !banner.active }
            : banner
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBannerId(null);
    }
    

  };

  const resetForm = () => {
    setNewBanner({
      title: "",
      image: "",
      page: "",
      active: true,
  
    });
    setSelectedBanner(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Banners Management</h1>
        <button
          onClick={() => setShowAddBannerModal(true)}
          className="flex items-center rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Banner
        </button>
      </div>
      
      <BannerList
        banners={banners}
        setSelectedBanner={(banner) => {
          setSelectedBanner(banner);
          setNewBanner({
            title: banner.title,
            image: banner.image,
            page: banner.page,
            active: banner.active,
          

          });
          setShowEditBannerModal(true);
        }}
        setNewBanner={setNewBanner}
        setShowEditBannerModal={setShowEditBannerModal}
        handleDeleteBanner={handleDeleteBanner}
        handleToggleActive={handleToggleActive}
        isLoadBanner = {isLoadBanner}
        loadingBannerId = {loadingBannerId}
      />

      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <BannerForm
            banner={newBanner}
            setBanner={setNewBanner}
            onSubmit={handleAddBanner}
            onCancel={() => {
              resetForm();
              setShowAddBannerModal(false);
            }}
            isLoading = {isLoading}
          />
        </div>
      )}

      {showNotification  && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ShowModal
            setMessage={Notification}
            setClose={() => setShowNotification(false)}
            isDelete = {isDelete}
            setDelete={HandleDelete}
            deleteId={BannerId}
            isLoading = {isLoading}
          />
      </div>
      ) }

     

      {showEditBannerModal && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <BannerForm
            banner={newBanner}
            setBanner={setNewBanner}
            onSubmit={handleEditBanner}
            onCancel={() => {
              resetForm();
              setShowEditBannerModal(false);
            }}
            isEdit 
            isLoading = {isLoading}
          />
        </div>
      )}
    </div>
  );
}
