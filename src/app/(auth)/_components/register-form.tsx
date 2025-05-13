"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axiosInstance from "src/api/axiosInstance";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2] || "") : null;
}



export default function RegisterForm() {
 const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Australia"); // Default ke AU
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
      const router = useRouter();


  useEffect(() => {
   
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
        "api/register",
        { email, password },
        { withCredentials: true } // <- PENTING: pastikan di sini juga
      ).then((response) => {
        
        Cookies.set('token', response.data.token);
        localStorage.setItem('token', response.data.token);
        const userData = response.data.data;
        if (userData?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/user");
        }

      });

    } catch (err: any) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };




  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);

  useEffect(() => {

    //check token
    if (Cookies.get('token')) {

      //redirect page dashboard
      router.push('/user');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
        <label className="block mb-1 text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter your state"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Country:</label>
        <input
          type="text"
          value={country}
          disabled
          className="w-full bg-gray-100 cursor-not-allowed rounded-md border border-gray-200 p-3 shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Generate new password"
            className="w-full rounded-md border border-gray-200 p-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      <div className="mb-6">
        <label className="mb-1 block text-gray-700">
          Captcha: <span className="text-red-500">*</span>
        </label>
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              checked={isCaptchaChecked}
              onChange={() => setIsCaptchaChecked(!isCaptchaChecked)}
              className="h-5 w-5 accent-orange-500"
              required
            />
            <span className="text-sm text-gray-600">I&apos;m not a robot</span>
          </label>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className={`w-full rounded-md px-4 py-3 font-medium text-white transition-colors duration-300 ${
        isLoading ? "bg-orange-600" : "bg-primary-color hover:bg-orange-600"
         }`} 
      >
        { isLoading ? (<ThemeProvider theme={customTheme}>
          <Spinner color="base-secondary" />
        </ThemeProvider>) : ' Register' } 
       
      </button>

    
    </form>
  );
}
