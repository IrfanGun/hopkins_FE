import Image from "next/image";
import type { Stores } from "../../../lib/stores";

interface StoreCardProps {
  store: Stores;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative h-16 w-16 overflow-hidden rounded-md border ${store.bgColor} p-1 shadow-sm`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={store.logo || "/placeholder.svg?height=60&width=60"}
            alt={store.name}
            width={60}
            height={60}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
      <span className="mt-2 text-center text-sm">{store.name}</span>
    </div>
  );
}
