import Image from "next/image";
import Link from "next/link";

interface GiveawayCardProps {
  id: string;
  title: string;
  image: string;
  status: "Early Bird" | "Closed" | "Live" | "Not Yet Open";
  dateText: string;
  addressURL: string;
  tbd?: boolean;
  url: string;
}

export default function GiveawayCard({
  title,
  image,
  status,
  dateText,
  addressURL,
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
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow sm:flex-row">
      {/* Image Section - Left side */}
      <div className="relative h-48 w-full sm:h-auto sm:w-2/5">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          unoptimized
        />
      </div>

      {/* Content Section - Right side */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3 className="mb-1 text-lg font-bold text-gray-800">{title}</h3>
          <p className={`text-sm font-medium ${getStatusColor()}`}>{status}</p>
          <p className="mt-1 text-sm text-gray-600">{dateText}</p>
          {tbd && <p className="text-xs text-gray-500">tbd</p>}
        </div>

        <Link
          href={addressURL}
          className="mt-4 flex items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-600"
        >
          <svg
            className="mr-1.5 h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          GRAB A PACKAGE
        </Link>
      </div>
    </div>
  )
}
