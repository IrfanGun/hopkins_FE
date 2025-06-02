"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Globe} from "lucide-react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import axiosInstance from "src/api/axiosInstance";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import { getStates, States } from "src/lib/states";
import { AxiosError } from "axios";
import ShowModal from "src/components/ui/custom-modal";

// function getCookie(name: string): string | null {
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   return match ? decodeURIComponent(match[2] || "") : null;
// }

interface RegisterFormProps {
  email: string ;
  token ?: string;
}


export default function RegisterForm( { email, token }: RegisterFormProps ) {

  const [state, setStates] = useState<States[]>([]);// Default ke AU
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const [Notification, setNotification] = useState < string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const defaultForm = {
    name: "",
    email: email,
    phone: "",
    address: "",
    city : "",
    states : "",
    country : "Australia",
    password : ""

  };

  const [form, setForm] = useState(defaultForm);


  useEffect(() => {
   const loadStates = async () => {
      try {
        const fetchStates = await getStates()
        setStates(fetchStates);
    
      } catch (error) {
        console.error("Error loading states:", error);
      }
    }
    loadStates();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);

  if (confirmPassword && e.target.value !== confirmPassword) {
    setError("Passwords do not match");
  } else {
    setError("");
  }
};

const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setConfirmPassword(e.target.value);

  if (password && e.target.value !== password) {
    setError("Passwords do not match");
  } else {
    setError("");
  }
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
   
      await axiosInstance.get('/sanctum/csrf-cookie');
      
       await axiosInstance.post(
      "api/register",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        states: form.states,
        country: form.country,
        password: password,
        token: token,
      },
      { withCredentials: true }
    );

    // 2. Auto Login setelah register sukses
    const loginResponse = await axiosInstance.post(
      "api/login",
      {
        email: form.email,
        password: password,
      },
      { withCredentials: true }
    );


    // 3. Simpan token dan data user
    Cookies.set("token", loginResponse.data.token);
    localStorage.setItem("token", loginResponse.data.token);

    // Optional: Simpan user data
    const userData = loginResponse.data.data;
    localStorage.setItem("customer-hopkins", JSON.stringify(userData));
    
    // 4. Redirect ke halaman user dashboard
    router.push("/user");

      


    } catch (error) {

   const err = error as AxiosError;
    if (err.response) {
      const data = err.response.data as {
        error?: string;
        messages?: Record<string, string[]>;
      };

      const allMessages = data.messages
        ? Object.values(data.messages).flat()
        : [data.error ?? "Unknown error"];

      setNotification(allMessages);
      setShowNotification(true);
    }
} finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
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
    <div>
{showNotification && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white border text-orange-600 p-6 rounded shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-lg font-bold text-center ">Validation Error</strong>
        <button
          onClick={() => setShowNotification(false)}
          className="text-red-500 hover:text-red-700 text-xl font-bold"
        >
          &times;
        </button>
      </div>

      <div className="space-y-2">
        {Notification.map((msg, i) => (
          <p key={i} className="text-sm text-gray-800">
            {msg}
          </p>
        ))}
      </div>
    </div>
  </div>
)}


      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-5">
          <div className="flex items-center mb-2">
            <User size={18} className="text-gray-400 mr-2" />
            <label htmlFor="name" className="block font-medium text-gray-700">
              Full Name
            </label>
          </div>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <Mail size={18} className="text-gray-400 mr-2" />
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email Address
            </label>
          </div>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            disabled
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 opacity-75 cursor-not-allowed"
            required
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <Phone size={18} className="text-gray-400 mr-2" />
            <label htmlFor="phone" className="block font-medium text-gray-700">
              Phone Number
            </label>
          </div>
          <input
            id="phone"
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <MapPin size={18} className="text-gray-400 mr-2" />
            <label htmlFor="address" className="block font-medium text-gray-700">
              Address
            </label>
          </div>
          <input
            id="address"
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <label htmlFor="city" className="block font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="states" className="block font-medium text-gray-700 mb-2">
              State
            </label>
            <select
              id="states"
              name="states"
              value={form.states ?? ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              required
            >
              <option value="">Select State</option>
              {state.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} | {e.shortName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <Globe size={18} className="text-gray-400 mr-2" />
            <label htmlFor="country" className="block font-medium text-gray-700">
              Country
            </label>
          </div>
          <input
            id="country"
            type="text"
            name="country"
            value={form.country}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 opacity-75 cursor-not-allowed"
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <Lock size={18} className="text-gray-400 mr-2" />
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create a password"
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

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition-all duration-200 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            <p>{error}</p>
          </div>
        )}

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

        <button
          type="submit"
          className={`w-full rounded-lg px-5 py-4 font-semibold text-white shadow-md transition-all duration-300 ${
            isLoading || !!error
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg active:translate-y-0.5"
          }`}
          disabled={isLoading || !!error}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="ml-2">Creating Account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-orange-500 transition-colors hover:text-orange-600 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
