import { Home, Users, Gift, Trophy } from "lucide-react";
import Link from "next/link";

const MobileBottomNavigationBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-orange-400 bg-orange-600 lg:hidden">
      <div className="grid grid-cols-5">
        {/* Dashboard Link */}
        <Link
          href="/user"
          className="flex flex-col items-center py-2 text-white"
        >
          <Home className="h-5 w-5" />
          <span className="mt-1 text-xs">Dashboard</span>
        </Link>

        {/* Partners Link */}
        <Link
          href="/partners"
          className="flex flex-col items-center py-2 text-white/80 hover:text-white"
        >
          <Users className="h-5 w-5" />
          <span className="mt-1 text-xs">Partners</span>
        </Link>

        {/* Affiliates Link */}
        <Link
          href="/partners/affiliate"
          className="flex flex-col items-center py-2 text-white/80 hover:text-white"
        >
          <Users className="h-5 w-5" />
          <span className="mt-1 text-xs">Popular</span>
        </Link>

        {/* Store Search Link */}
        <Link
          href="/giveaways"
          className="flex flex-col items-center py-2 text-white/80 hover:text-white"
        >
          <Gift className="h-5 w-5" />
          <span className="mt-1 text-xs">Giveaways</span>
        </Link>

        {/* Categories Link */}
        <Link
          href="/major-draw-winners"
          className="flex flex-col items-center py-2 text-white/80 hover:text-white"
        >
          <Trophy className="h-5 w-5" />
          <span className="mt-1 text-xs">Winners</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNavigationBar;
