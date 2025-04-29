import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { Banner } from "../../../../lib/banners";                   

interface BannerListProps {
  banners: Banner[];
  setSelectedBanner: (banner: Banner) => void;
  setNewBanner: (banner: Omit<Banner, "id">) => void;
  setShowEditBannerModal: (state: boolean) => void;
  handleDeleteBanner: (id: number) => void;
  handleToggleActive: (id: number) => void;
}

export default function BannerList({
  banners,
  setSelectedBanner,
  setNewBanner,
  setShowEditBannerModal,
  handleDeleteBanner,
  handleToggleActive,
}: BannerListProps) {
  return (
    <div className="rounded-lg border bg-white shadow">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="font-medium text-gray-700">All Banners</div>
          <div className="text-sm text-gray-500">{banners.length} banners</div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`overflow-hidden rounded-lg border ${
                banner.active ? "border-green-200" : "border-gray-200"
              } bg-white shadow-sm transition-all hover:shadow`}
            >
              <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                <Image
                  src={
                    banner.image ||
                    "/placeholder.svg?height=200&width=400&text=Banner+Image"
                  }
                  alt={banner.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-gray-800">{banner.title}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      banner.active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {banner.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mb-4 text-sm text-gray-500">
                  <p>Page: {banner.page}</p>
                  <p>Position: {banner.position}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
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
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-500"
                      title="Edit Banner"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-red-500"
                      title="Delete Banner"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleToggleActive(banner.id)}
                    className={`rounded-md px-3 py-1 text-xs font-medium ${
                      banner.active
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {banner.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
