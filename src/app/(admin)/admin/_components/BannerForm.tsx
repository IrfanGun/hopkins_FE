"use client";

import { Upload } from "lucide-react";
import { Banner } from "../../../../lib/banners";

interface BannerFormProps {
  banner: Omit<Banner, "id">;
  setBanner: (banner: Omit<Banner, "id">) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function BannerForm({
  banner,
  setBanner,
  onSubmit,
  onCancel,
  isEdit = false,
}: BannerFormProps) {
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        {isEdit ? "Edit Banner" : "Add New Banner"}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Title
          </label>
          <input
            type="text"
            value={banner.title}
            onChange={(e) => setBanner({ ...banner, title: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter banner title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={banner.image}
              onChange={(e) => setBanner({ ...banner, image: e.target.value })}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter image URL"
            />
            <button className="rounded-md bg-gray-200 p-2 hover:bg-gray-300">
              <Upload className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Page
          </label>
          <select
            value={banner.page}
            onChange={(e) => setBanner({ ...banner, page: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="Home">Home</option>
            <option value="Giveaways">Giveaways</option>
            <option value="Discounts">Discounts</option>
            <option value="Profile">Profile</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            value={banner.position}
            onChange={(e) =>
              setBanner({
                ...banner,
                position: e.target.value as Banner["position"],
              })
            }
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="Top">Top</option>
            <option value="Middle">Middle</option>
            <option value="Bottom">Bottom</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={banner.active}
            onChange={(e) => setBanner({ ...banner, active: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-orange-500"
          />
          <label className="ml-2 block text-sm text-gray-700">Active</label>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
        >
          {isEdit ? "Save Changes" : "Add Banner"}
        </button>
      </div>
    </div>
  );
}
