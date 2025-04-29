"use client";

import type { ChangeEvent, FormEvent } from "react";

interface PasswordFormData {
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

interface PasswordChangeFormProps {
  formData: PasswordFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onCancel: () => void;
}

export default function PasswordChangeForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
}: PasswordChangeFormProps) {
  return (
    <div className="p-6">
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              New Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
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
            className="rounded-md bg-orange-600 px-6 py-2 font-medium text-white transition hover:bg-orange-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
