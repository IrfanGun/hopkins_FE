"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  ImageIcon,
  MessageSquare,
  Gift,
  TicketCheck,
  ChevronDown,
  X,
  LogOut,
  Trophy,
  FileText,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  isMobileMenuOpen,
  toggleSidebar,
  toggleMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      name: "Banners",
      href: "/admin/banners",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      name: "Pop-ups",
      href: "/admin/popups",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Giveaways",
      href: "/admin/giveaways",
      icon: <Gift className="h-5 w-5" />,
    },
    {
      name: "Major Draw Winners",
      href: "/admin/major-draw-winners",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      name: "User Entries",
      href: "/admin/user-entries",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Support Tickets",
      href: "/admin/support",
      icon: <TicketCheck className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-50 flex-shrink-0 transform bg-white transition-all duration-300 ease-in-out lg:static lg:z-auto ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${isMobileMenuOpen ? "left-0" : "-left-64"} lg:left-0`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between bg-orange-500 px-4">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-white">
                {isSidebarOpen ? "Admin Panel" : "AP"}
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="hidden rounded-md p-1 text-white hover:bg-orange-600 lg:block"
            >
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-200 ${
                  isSidebarOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="rounded-md p-1 text-white hover:bg-orange-600 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <Link
              href="/"
              className="mt-2 flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
            >
              <LogOut className="h-5 w-5" />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
