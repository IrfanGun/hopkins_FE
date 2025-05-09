import Image from "next/image";

// interface Winner {
//   // place: "1st" | "2nd" | "3rd" | string;
//   name: string;
//   prize: string;
// }

interface WinnerCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  winners: { label: string; prize: string }[];
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
              
              >
                {winner.label}
              </span>
              <span className="text-sm">
                {winner.prize} - {winner.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
