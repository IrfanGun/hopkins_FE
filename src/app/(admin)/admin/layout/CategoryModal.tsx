"use client";

interface CategoryModalProps {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  confirmText?: string;
}

export default function CategoryModal({
  title,
  value,
  onChange,
  onCancel,
  onSubmit,
  confirmText = "Add",
}: CategoryModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
          placeholder="Enter category name"
        />
        <div className="mt-4 flex justify-end space-x-2">
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
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
