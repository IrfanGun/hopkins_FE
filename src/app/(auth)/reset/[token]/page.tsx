"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "src/api/axiosInstance";
import { ThemeProvider, Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";

export default function ResetPasswordPage() {
const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof token === "string" && token) {

      axiosInstance
        .post("/api/check-reset-token", { token : token })
        .then((res) => {
          setEmail(res.data.email);
          setConfirmed(true);
         
        
        })
        .catch(() => {
          setError("Invalid or expired token.");
        });
    } else {
      setError("No token provided.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/reset-password", {
        token,
        email,
        password,
      });

      if (res.status === 200) {
        router.push("/login");
      }

      setMessage(res.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex justify-center">
        <Image
          src="/img/hopkins_img.png"
          alt="Hopkins+ Logo"
          width={350}
          height={100}
          className="mx-auto block max-w-[350px]"
        />
      </div>

      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <div className="relative bg-primary-color p-4 pb-16">
          <h1 className="text-xl font-medium text-slate-50">Reset Password</h1>
          <p className="text-sm text-slate-50">
            Reset your password for <strong>Hopkins members</strong>
          </p>
        </div>

        {error && (
          <div className="p-6 text-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        {confirmed && (
          <form onSubmit={handleSubmit} className="p-6 pt-0 mt-5">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-5 rounded-md bg-orange-500 py-2 text-white transition-colors hover:bg-orange-600"
            >
                {loading && ( <ThemeProvider theme={customTheme}>
                    <Spinner color="base"/>
                </ThemeProvider> )

                }
              Reset Password
            </button>

          </form>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">© 2025 Hopkins.</div>
    </div>
  );
}
