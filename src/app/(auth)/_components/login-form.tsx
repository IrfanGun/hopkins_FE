"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User } from "lucide-react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axiosInstance from "src/api/axiosInstance";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import stripeInstance from "src/api/stripeInstance";
import axios, { AxiosResponse } from 'axios';
import getSubscriptionDetails from "src/lib/getSubscriptionDetails";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2] || "") : null;
}



export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailStripe, setEmailStripe] = useState("");
  const [idStripe, setIdStripe] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Data, setData] = useState("");
  const [UserData, setUserData] = useState("")

  interface Customer {
  id: string;
  email: string;
  name?: string;
}

const getCustomerByIdAndEmail = async (id_customer: string): Promise<Customer | null | undefined> => {
  try {

  const stripeCustomer = await getSubscriptionDetails(id_customer);
    if (stripeCustomer && stripeCustomer.status === "active") {
    localStorage.setItem('customer-hopkins',  JSON.stringify(UserData) );
    router.push("/user");
    } else {
      console.log('Email tidak cocok dengan id_customer');
      
    }
  } catch (error: any) {
    console.error('Error fetching customer:', error.message);
    return null;
  }
};


  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    // Event Listener Router
    window.addEventListener('popstate', handleComplete);

    // Cleanup Listener saat komponen di-unmount
    return () => {
      window.removeEventListener('popstate', handleComplete);
    };
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isCaptchaChecked) {
      setError("Please complete the captcha verification");
      return;
    }

    try {

      setIsLoading(true);
      // Baru kirim data login
      await axiosInstance.get('/sanctum/csrf-cookie');
      await axiosInstance.post(
        "api/login",
        { email, password },
        { withCredentials: true } // <- PENTING: pastikan di sini juga
      ).then((response) => {
        
        Cookies.set('token', response.data.token);
        localStorage.setItem('token', response.data.token);
        const userData = response.data.data;
        setUserData(userData);
       
 
        
        if (userData?.role === "admin") {
         router.push("/admin");
        } else {

          setData(response.data.data);
          getCustomerByIdAndEmail(userData.id_stripe);
          
          // console.log(userData);
        }

      });

    } catch (err: any) {
      setError("Invalid email or password");
      console.error(err);
      setIsLoading(false);
    } 
  };




  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);


  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-5">
        <div className="flex items-center mb-2">
      
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email Address
          </label>
        </div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          required
        />
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
          
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
          </div>
          <Link
            href="/forgot"
            className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 pr-12 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-orange-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>



      <div className="mb-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
          <label className="flex cursor-pointer items-center space-x-3">
            <input
              type="checkbox"
              checked={isCaptchaChecked}
              onChange={() => setIsCaptchaChecked(!isCaptchaChecked)}
              className="h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-200"
              required
            />
            <div className="flex items-center">
              <span className="text-sm text-gray-700">I'm not a robot</span>
              {isCaptchaChecked && <span className="ml-2 text-green-500">✓</span>}
            </div>
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        className={`w-full rounded-lg px-5 py-4 font-semibold text-white shadow-md transition-all duration-300 ${
          isLoading
            ? "bg-orange-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:translate-y-0.5"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span className="ml-2">Signing in...</span>
          </div>
        ) : (
          "Sign in"
        )}
      </button>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            href="https://buy.stripe.com/test_00g3dxgwLdc99VK6oo"
            className="font-medium text-orange-500 transition-colors hover:text-orange-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  )
}
