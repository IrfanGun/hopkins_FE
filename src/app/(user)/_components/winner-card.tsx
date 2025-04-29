import Image from "next/image";

interface Winner {
  place: "1st" | "2nd" | "3rd" | string;
  name: string;
  prize: string;
}

interface WinnerCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  winners: Winner[];
}

export default function WinnerCard({
  id,
  title,
  date,
  image,
  winners,
}: WinnerCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          unoptimized
        />
      </div>
      <div className="flex flex-col p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm font-medium text-gray-600">{date}</p>

        <div className="mt-3 space-y-2">
          {winners.map((winner, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`mr-2 inline-block rounded-md px-2 py-0.5 text-xs font-bold text-white ${
                  winner.place === "1st"
                    ? "bg-orange-500"
                    : winner.place === "2nd"
                      ? "bg-orange-400"
                      : winner.place === "3rd"
                        ? "bg-orange-300"
                        : "bg-gray-500"
                }`}
              >
                {winner.place}
              </span>
              <span className="text-sm">
                {winner.prize} - {winner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
