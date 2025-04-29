import React from "react";
import { Button } from "../../../components/ui/button";

interface GiveawayFormProps {
  form: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
  editId: number | null;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const GiveawayForm: React.FC<GiveawayFormProps> = ({
  form,
  editId,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-4 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {editId ? "Edit Giveaway" : "Add New Giveaway"}
      </h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
          id="isActive"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">
          Active
        </label>
      </div>

      <Button className="bg-primary-color" type="submit">
        {editId ? "Update" : "Add Giveaway"}
      </Button>
    </form>
  );
};

export default GiveawayForm;
