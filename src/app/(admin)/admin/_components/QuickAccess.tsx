import {
  Gift,
  ImageIcon,
  Layers,
  MessageSquare,
  TicketCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function QuickAccess() {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Quick Access</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        <Link
          href="/admin/categories"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <Layers className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Categories</span>
        </Link>
        <Link
          href="/admin/banners"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <ImageIcon className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Banners</span>
        </Link>
        <Link
          href="/admin/popups"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <MessageSquare className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Pop-ups</span>
        </Link>
        <Link
          href="/admin/giveaways"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <Gift className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Giveaways</span>
        </Link>
        <Link
          href="/admin/support"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <TicketCheck className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Support</span>
        </Link>
        <Link
          href="/admin/analytics"
          className="flex flex-col items-center rounded-lg border bg-white p-4 text-center shadow-sm transition-colors hover:bg-orange-50"
        >
          <TrendingUp className="mb-2 h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-700">Analytics</span>
        </Link>
      </div>
    </div>
  );
}
