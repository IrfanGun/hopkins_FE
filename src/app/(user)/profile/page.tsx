"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Home, MapPin, Phone, Lock, LogOut } from "lucide-react";
import PasswordChangeForm from "../_components/password-change-form";
import ChangeEmailForm from "../_components/email-change-form";
import ProfileEditForm from "../_components/profile-edit-form";
import Modal from "../../components/layout/Modal";
import FooterUser from "../../components/ui/footer-user";
import Header from "../../components/layout/header";

export default function ProfilePage() {
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
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);

  const [profileFormData, setProfileFormData] = useState({ ...user });
  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleProfileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser({ ...profileFormData });
    setShowEditModal(false);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    setShowChangePasswordModal(false);
    setPasswordFormData({
      password: "",
      confirmPassword: "",
    });
    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value);
    };

    const handleChangeEmailSubmit = (e: FormEvent) => {
      e.preventDefault();
      console.log("Email baru: ", newEmail);

      setShowChangeEmailModal(false);
    };
  };

  function handleChangeEmailSubmit(e: FormEvent<Element>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link
            href="/user"
            className="flex items-center transition hover:text-orange-500"
          >
            <Home className="mr-1 h-4 w-4" />
          </Link>
          <span>›</span>
          <span className="text-gray-500">Profile</span>
        </div>
      </div>

      {/* Main Content */}
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
                  </div>{" "}
                  <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
                  <button
                    onClick={() => setShowChangeEmailModal(true)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                  >
                    Change Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Profile Details"
        position="bottom-right"
      >
        <ProfileEditForm
          formData={profileFormData}
          onChange={handleProfileInputChange}
          onSubmit={handleProfileSubmit}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        title="Change Password"
        position="bottom-right"
        width="max-w-md"
      >
        <PasswordChangeForm
          formData={passwordFormData}
          onChange={handlePasswordInputChange}
          onSubmit={handlePasswordSubmit}
          onCancel={() => setShowChangePasswordModal(false)}
        />
      </Modal>

      {/* Change Email Modal */}
      <Modal
        isOpen={showChangeEmailModal}
        onClose={() => setShowChangeEmailModal(false)}
        title="Change Email"
        position="bottom-right"
        width="max-w-md"
      >
        <ChangeEmailForm
          email={newEmail} // Kirimkan email baru ke form
          onChange={handleProfileInputChange}
          onSubmit={handleChangeEmailSubmit}
          onCancel={() => setShowChangeEmailModal(false)}
        />
      </Modal>

      <FooterUser />
    </div>
  );
}
