import Image from "next/image";
import Link from "next/link";

interface GiveawayCardProps {
  id: string;
  title: string;
  image: string;
  status: "Early Bird" | "Closed" | "Live" | "Not Yet Open";
  dateText: string;
  tbd?: boolean;
  url: string;
}

export default function GiveawayCard({
  title,
  image,
  status,
  dateText,
  tbd = false,
  url,
}: GiveawayCardProps) {
  // Determine status color
  const getStatusColor = () => {
    switch (status) {
      case "Early Bird":
        return "text-orange-600";
      case "Closed":
        return "text-gray-500";
      case "Live":
        return "text-green-600";
      case "Not Yet Open":
        return "text-orange-500";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          unoptimized
        />
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className={`font-medium ${getStatusColor()}`}>{status}</p>
        <p className="mt-1 text-sm text-gray-600">{dateText}</p>
        {tbd && <p className="text-sm text-gray-500">tbd</p>}
        <Link
          href={url}
          className="mt-4 flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          GRAB A PACKAGE
        </Link>
      </div>
    </div>
  );
}
