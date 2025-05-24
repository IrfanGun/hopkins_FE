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
import { getStates, States } from "src/lib/states";
import { AxiosError } from "axios";
import ShowModal from "src/components/ui/custom-modal";

// function getCookie(name: string): string | null {
//   const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
//   return match ? decodeURIComponent(match[2] || "") : null;
// }

interface RegisterFormProps {
  email: string | null;
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
    console.log(loginResponse.data);

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
                const errorData = err.response.data  as Record<string, string[]>;
                const allMessages: string[] = Object.values(errorData).flat();
                console.log(allMessages);
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
       {showNotification  && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <ShowModal
                        setMessage={Notification}
                        setClose={() => setShowNotification(false)}
                        isLoading = {isLoading}
                      />
                  </div>
                  ) }

  

    <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
        <label className="block mb-1 text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1 text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div> */}

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Phone:</label>
        <input
          type="number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter your address"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">City:</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter your city"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">State:</label>
        <select
          name="states"
          value={form.states ?? ""}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        >
          <option value="">States</option>
          {state.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} | {e.shortName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Country:</label>
        <input
          type="text"
          name="country"
          value={form.country}
          disabled
          className="w-full bg-gray-100 cursor-not-allowed rounded-md border border-gray-200 p-3 shadow-sm"
        />
      </div>

     <div className="mb-4">
        <label className="block mb-1 text-gray-700">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
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
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm your password"
          className="w-full rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}


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
          isLoading ? "bg-orange-600 cursor-not-allowed" : "bg-primary-color hover:bg-orange-600"
        }`}
        disabled={isLoading || !!error}
      >
        {isLoading ? (
          <ThemeProvider theme={customTheme}>
            <Spinner color="base-secondary" />
          </ThemeProvider>
        ) : (
          "Register"
        )}
      </button>


    
    </form>
    </div>
  );
}
