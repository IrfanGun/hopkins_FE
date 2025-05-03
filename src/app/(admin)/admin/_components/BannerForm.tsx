"use client";

import { Upload } from "lucide-react";
import { Banner } from "../../../../lib/banners";
import { Button, createTheme, Spinner, ThemeProvider } from "flowbite-react";

interface BannerFormProps {
  banner: Omit<Banner, "id">;
  setBanner: (banner: Omit<Banner, "id">) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
  isLoading? : boolean;
}

const customTheme = createTheme({
  spinner : {
    "base": "inline animate-spin text-gray-200",
    "color": {
      "default": "fill-primary-600",
      "failure": "fill-red-600",
      "gray": "fill-gray-600",
      "info": "fill-cyan-600",
      "pink": "fill-pink-600",
      "purple": "fill-purple-600",
      "success": "fill-green-500",
      "warning": "fill-yellow-400",
      "base" : "fill-orange-500"
  }
}});

export default function BannerForm({
  banner,
  setBanner,
  onSubmit,
  onCancel,
  isEdit = false,
  isLoading,
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
            <option value="Dashboard">Dashboard</option>
            <option value="Membership">Membership</option>
            
          </select>
        </div>

        <div>
         
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
          disabled = {isLoading}
          className={`rounded-md bg-orange-500 text-white px-4 py-2 text-sm  ${
            isLoading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
        {isLoading ?
        <ThemeProvider theme={customTheme}><Spinner  size="sm" color="base" /></ThemeProvider> 
        
              : 
            isEdit ? "Save Changes" : "Add Banner"
          }

        </button>
      </div>
    </div>
  );
}
