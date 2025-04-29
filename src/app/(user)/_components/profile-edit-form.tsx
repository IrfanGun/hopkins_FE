"use client";

import type { ChangeEvent, FormEvent } from "react";

interface ProfileFormData {
  name: string;
  phone: string;
  address: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  [key: string]: string;
}

interface ProfileEditFormProps {
  formData: ProfileFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) {
  return (
    <div className="p-6">
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Phone: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-medium">
              Address: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Postcode and City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="postcode"
                className="mb-1 block text-sm font-medium"
              >
                Postcode: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={onChange}
                required
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium">
                City: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={onChange}
                required
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>

          {/* State and Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="mb-1 block text-sm font-medium">
                State: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={onChange}
                required
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="mb-1 block text-sm font-medium"
              >
                Country: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={onChange}
                required
                className="w-full rounded-md border border-gray-300 p-2"
              />
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-800 transition hover:bg-gray-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
