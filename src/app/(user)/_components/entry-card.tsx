import Image from "next/image";
import Link from "next/link";

interface EntryCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  loyaltyPoints: number;
}

export default function EntryCard({
  id,
  title,
  date,
  image,
  loyaltyPoints,
}: EntryCardProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 w-full md:h-auto md:w-1/3 lg:w-1/4">
          <Image
            src={image || "/placeholder.svg?height=300&width=400"}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-md mt-1 text-gray-600">{date}</p>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase text-gray-500">
                LOYALTY:
              </p>
              <p className="text-4xl font-bold text-gray-800">
                {loyaltyPoints}
              </p>
              <p className="text-sm text-gray-600">Entries</p>
            </div>

            <Link
              href={`/giveaways/${id}`}
              className="mt-4 flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 md:mt-0"
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
      </div>
    </div>
  );
}
