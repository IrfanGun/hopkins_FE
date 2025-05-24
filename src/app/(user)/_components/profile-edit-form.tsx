"use client";

import { useEffect, type ChangeEvent, type FormEvent } from "react";
import { useState } from "react";
import { getStates, States } from "src/lib/states";

interface ProfileEditFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    state_id?: string | number;
    [key: string]: any;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function ProfileEditForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
}: ProfileEditFormProps): JSX.Element {
  const [states, setStates] = useState<States[]>([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const fetchStates = await getStates();
        setStates(fetchStates);

      } catch (error) {
        console.error("Error loading states:", error);
      }
    };
    loadStates();
  }, []);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6">
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
            type="number"
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
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {/* <div>
            <label htmlFor="postcode" className="mb-1 block text-sm font-medium">
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
          </div> */}
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
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <div>
            <label htmlFor="state_id" className="mb-1 block text-sm font-medium">
              State: <span className="text-red-500">*</span>
            </label>
            <select
              name="state_id"
              id="state_id"
              value={formData.state_id ?? ""}
              onChange={onChange}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name} | {state.shortName}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label htmlFor="country" className="mb-1 block text-sm font-medium">
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
          </div> */}
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
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
