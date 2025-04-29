"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Banner, initialBanners } from "../../../../lib/banners";
import BannerList from "../_components/BannerList";
import BannerForm from "../_components/BannerForm";

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [showAddBannerModal, setShowAddBannerModal] = useState(false);
  const [showEditBannerModal, setShowEditBannerModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [newBanner, setNewBanner] = useState<Omit<Banner, "id">>({
    title: "",
    image: "",
    page: "Home",
    active: true,
    position: "Top",
  });

  const handleAddBanner = () => {
    if (newBanner.title.trim() === "") return;

    const banner: Banner = {
      id: Math.max(0, ...banners.map((b) => b.id)) + 1,
      ...newBanner,
    };

    setBanners([...banners, banner]);
    resetForm();
    setShowAddBannerModal(false);
  };

  const handleEditBanner = () => {
    if (!selectedBanner || newBanner.title.trim() === "") return;

    const updatedBanners = banners.map((banner) =>
      banner.id === selectedBanner.id ? { ...banner, ...newBanner } : banner,
    );

    setBanners(updatedBanners);
    resetForm();
    setShowEditBannerModal(false);
  };

  const handleDeleteBanner = (bannerId: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((banner) => banner.id !== bannerId));
    }
  };

  const handleToggleActive = (bannerId: number) => {
    setBanners(
      banners.map((banner) =>
        banner.id === bannerId ? { ...banner, active: !banner.active } : banner,
      ),
    );
  };

  const resetForm = () => {
    setNewBanner({
      title: "",
      image: "",
      page: "Home",
      active: true,
      position: "Top",
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
            position: banner.position,
          });
          setShowEditBannerModal(true);
        }}
        setNewBanner={setNewBanner}
        setShowEditBannerModal={setShowEditBannerModal}
        handleDeleteBanner={handleDeleteBanner}
        handleToggleActive={handleToggleActive}
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
          />
        </div>
      )}

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
          />
        </div>
      )}
    </div>
  );
}
