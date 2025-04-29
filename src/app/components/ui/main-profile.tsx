import { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, Lock, LogOut, X } from "lucide-react";

export default function MainContentProfile() {
  const [user, setUser] = useState({
    name: "Jay Hopkins",
    email: "admin@rsg-wa.com.au",
    phone: "0478 454 963",
    location: "Perth WA",
    country: "AU",
    initials: "JH",
    address: "",
    postcode: "",
    city: "Perth",
    state: "WA",
    password: "",
    confirmPassword: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...formData });
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <div className="container mx-auto px-6 pb-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">PROFILE</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            {/* User Header */}
            <div className="flex items-center gap-3 bg-orange-500 p-4 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 text-xl font-semibold text-white">
                {user.initials}
              </div>
              <div className="flex-1 text-lg font-semibold">{user.name}</div>
              <button className="rounded-md p-2 transition hover:bg-white/20">
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col">
              <Link
                href="/profile"
                className="border-l-4 border-orange-500 bg-gray-100 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                My Profile
              </Link>
              <Link
                href="/support"
                className="border-l-4 border-transparent px-4 py-3 text-gray-600 transition hover:bg-gray-50"
              >
                Get Support
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="md:col-span-2">
          <div className="mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-orange-200 text-3xl font-semibold text-orange-800">
                {user.initials}
              </div>

              {/* User Info */}
              <h2 className="mb-1 text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <a
                href={`mailto:${user.email}`}
                className="mb-6 text-orange-500 transition hover:underline"
              >
                {user.email}
              </a>

              {/* Contact Info */}
              <div className="w-full space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-orange-500 transition" />
                  <div>
                    <div className="text-sm font-medium text-orange-500">
                      Phone
                    </div>
                    <div>{user.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-orange-500 transition" />
                  <div>
                    <div className="text-sm font-medium text-orange-500">
                      Location
                    </div>
                    <div>
                      {user.location}
                      <br />
                      {user.country}
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setShowEditModal(true)}
                className="mt-6 rounded-md border border-gray-300 bg-white px-8 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-xl font-semibold text-gray-700">
              Profile Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="password"
                      id="password"
                      value="••••••••"
                      readOnly
                      className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3"
                    />
                  </div>
                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  Change Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-orange-600 px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">Profile Details</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-full p-1 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium"
                    >
                      Name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium"
                    >
                      Phone: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1 block text-sm font-medium"
                    >
                      Address: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>

                  {/* Postcode and City */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="postcode"
                        className="mb-1 block text-sm font-medium"
                      >
                        Postcode: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 block text-sm font-medium"
                      >
                        City: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                  </div>

                  {/* State and Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="state"
                        className="mb-1 block text-sm font-medium"
                      >
                        State: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="mb-1 block text-sm font-medium"
                      >
                        Country: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-800 transition hover:bg-gray-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed bottom-4 right-4 z-50 md:w-1/4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-orange-600 px-6 py-4 text-white">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="rounded-full p-1 hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      New Password: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Confirm Password: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowChangePasswordModal(false)}
                    className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-orange-600 px-6 py-2 font-medium text-white transition hover:bg-orange-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
