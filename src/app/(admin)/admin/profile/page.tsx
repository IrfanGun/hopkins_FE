"use client";

import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import axiosInstance from "src/api/axiosInstance";
import { Spinner, ThemeProvider } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";

type ErrorResponseType = {
  message: string;
  errors?: Record<string, string[]>;
} | null;

export default function AccountSettings() {
  const [user, setUser] = useState({ email: "admin@example.com" });

  const [emailInput, setEmailInput] = useState(user.email);
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Gabungkan error ke satu state yang lebih fleksibel
  const [errorResponse, setErrorResponse] = useState<ErrorResponseType>(null);

  const handleEmailChange = async () => {
    setIsLoadingEmail(true);
    setErrorResponse(null);
    setEmailMessage(null);

    try {
      await axiosInstance.put("/api/admin/update", { email: emailInput });
      setUser((prev) => ({ ...prev, email: emailInput }));
      setEmailMessage("Email updated successfully.");
    } catch (error: any) {
      const data = error.response?.data;
      if (data && data.errors) {
        setErrorResponse({ message: data.message || "Validation failed", errors: data.errors });
      } else {
        setErrorResponse({ message: data?.message || "Failed to update email." });
      }
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage(null);
    setErrorResponse(null);

    if (passwordInput !== confirmPasswordInput) {
      setPasswordMessage("Passwords do not match.");
      return;
    }

    setIsLoadingPassword(true);
    try {
      await axiosInstance.put("/api/admin/update-password", { password: passwordInput });
      setPasswordInput("");
      setConfirmPasswordInput("");
      setPasswordMessage("Password updated successfully.");
    } catch (error: any) {
      const data = error.response?.data;
      if (data && data.errors) {
        setErrorResponse({ message: data.message || "Validation failed", errors: data.errors });
      } else {
        setErrorResponse({ message: data?.message || "Failed to update password." });
      }
    } finally {
      setIsLoadingPassword(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-1">
      {/* Email Settings */}
      <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
          <Mail className="h-5 w-5 text-orange-500" />
          Email Address
        </h2>
        <p className="mb-4 text-sm text-gray-600">
      Please enter your new email address. This will be used for account login.
        </p>

        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 mb-2"
        />
        <button
          onClick={handleEmailChange}
          disabled={isLoadingEmail}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-orange-500 py-2 font-medium text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isLoadingEmail &&  <ThemeProvider theme={customTheme}>
              <Spinner size="sm" color="base" />
          </ThemeProvider>} Save Email
        </button>
        {emailMessage && <p className="mt-2 text-sm text-green-600">{emailMessage}</p>}
      </div>

      {/* Password Settings */}
      <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
          <Lock className="h-5 w-5 text-orange-500" />
          Password
        </h2>
      <p className="mb-4 text-sm text-gray-600">
        Enter a new password with at least 8 characters and confirm it below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 mb-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPasswordInput}
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 mb-4"
        />
        <button
          onClick={handlePasswordChange}
          disabled={isLoadingPassword}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-orange-500 py-2 font-medium text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isLoadingPassword && 
          <ThemeProvider theme={customTheme}>
              <Spinner size="sm" color="base" />
          </ThemeProvider>
        } Save Password
        </button>
        {passwordMessage && <p className="mt-2 text-sm text-green-600">{passwordMessage}</p>}
      </div>

      {/* Error Modal */}
      {errorResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 w-[90%] max-w-md rounded-lg bg-white px-6 py-4 text-orange-600 shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base font-semibold text-black">{errorResponse.message}</h2>
              <button
                onClick={() => setErrorResponse(null)}
                className="text-orange-500 p-2 hover:rounded-md text-xs hover:bg-gray-100"
              >
                X
              </button>
            </div>

            {errorResponse.errors ? (
              <ul className="list-disc list-inside text-sm space-y-1">
                {Object.entries(errorResponse.errors).map(([field, messages]) =>
                  messages.map((msg, i) => <li key={`${field}-${i}`}>{msg}</li>)
                )}
              </ul>
            ) : (
              <p className="text-sm">{errorResponse.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
