import React from "react";
import { PencilLine, Trash2 } from "lucide-react";

interface Giveaway {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface GiveawayListProps {
  giveaways: Giveaway[];
  handleEdit: (item: Giveaway) => void;
  handleDelete: (id: number) => void;
}

const GiveawayList: React.FC<GiveawayListProps> = ({
  giveaways,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Giveaway List
      </h2>
      {giveaways.length === 0 ? (
        <p className="text-sm text-gray-500">No giveaways created.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {giveaways.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between p-3 hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {item.startDate} - {item.endDate} |{" "}
                  <span
                    className={
                      item.isActive ? "text-green-600" : "text-red-500"
                    }
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="ml-4 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  <PencilLine className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GiveawayList;
