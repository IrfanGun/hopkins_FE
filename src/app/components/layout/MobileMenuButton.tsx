// components/ui/MobileMenu.tsx
import Link from "next/link";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
}) => {
  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-orange-600/95 pt-16 lg:hidden">
      <nav className="container mx-auto px-6">
        <ul className="flex flex-col space-y-4">
          <li>
            <Link
              href="/user"
              className="block border-l-4 border-white px-4 py-3 text-lg font-medium text-white"
              onClick={toggleMobileMenu}
            >
              DASHBOARD
            </Link>
          </li>
          <li>
            <Link
              href="/partners"
              className="block border-l-4 border-transparent px-4 py-3 text-lg font-medium text-white/80 transition hover:border-white hover:text-white"
              onClick={toggleMobileMenu}
            >
              PARTNER SEARCH
            </Link>
          </li>
          <li>
            <Link
              href="/partners/affiliate"
              className="block border-l-4 border-transparent px-4 py-3 text-lg font-medium text-white/80 transition hover:border-white hover:text-white"
              onClick={toggleMobileMenu}
            >
              AFFILIATE PARTNERS
            </Link>
          </li>
          <li>
            <Link
              href="/store-search"
              className="block border-l-4 border-transparent px-4 py-3 text-lg font-medium text-white/80 transition hover:border-white hover:text-white"
              onClick={toggleMobileMenu}
            >
              STORE SEARCH
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="block border-l-4 border-transparent px-4 py-3 text-lg font-medium text-white/80 transition hover:border-white hover:text-white"
              onClick={toggleMobileMenu}
            >
              CATEGORIES
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
