"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import axiosInstance from "src/api/axiosInstance";
import Cookies from 'js-cookie';
import Image from "next/image";
import { set } from "zod";



export default function Header() {

  
  const [isScrolled, setIsScrolled] = useState(false);
  const [initial, setInitial] = useState(true);
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/logout")
      
      localStorage.removeItem('token');

      Cookies.remove('token');
      router.push('/login');

    } catch (error) {
   
    }
  };


  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');
    setInitial(storedCustomer.name.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
  );
   
        
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Main Header */}
      <header
        className="py-3 transition-all duration-300 md:px-6 bg-gradient-to-r from-amber-800 via-orange-500 to-orange-700 px-4 "
        
      >
        <div className="mx-auto  flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <div className="flex">
              <Link href="/user">
              <Image
                src="/img/hopkins_img.png"
                alt="Hopkins+"
                width={140}
                height={40}
                priority
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
              </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link
              href="/membership"
              className="text-white hover:text-orange-200"
            >
              Membership
            </Link>

            <Link
              href="/partners"
              className="text-white hover:text-orange-200"
            >
              Discounts
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center text-white hover:text-orange-200"
              >
                Giveaways
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href="/giveaways"
                    className="w-full text-secondary-color"
                  >
                    Major Draws
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/major-draw-winners"
                    className="w-full text-secondary-color"
                  >
                    Major Draws Winners
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/my-entries"
                    className="w-full text-secondary-color"
                  >
                    My Entries
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 bg-gray-100">
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/purchase-history" className="w-full">
                    Purchase history
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link href="/support" className="w-full">
                    Get Support
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handleLogout}>
                  <span className="w-full text-left">
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}
