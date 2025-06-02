"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {  Home, MapPin, Phone, Lock, User, Shield, Settings, Mail, Calendar, Edit3 } from "lucide-react";
import PasswordChangeForm from "../_components/password-change-form";
import ChangeEmailForm from "../_components/email-change-form";
import ProfileEditForm from "../_components/profile-edit-form";
import Modal from "../../components/layout/Modal";
import FooterUser from "../../components/ui/footer-user";
import Header from "../../components/layout/header";
import MobileBottomNavigationBar from "../../components/layout/MobileBottomNavigationBar";
import { useEffect } from "react";
import axiosInstance from "src/api/axiosInstance";
import { number, set } from "zod";
import { stat } from "fs";
import getSubscriptionDetails from "src/lib/getSubscriptionDetails";
import axios, { AxiosError } from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    country: "AU",
    initials: "",
    address: "",
    postcode: "",
    city: "",
    state: "",
    state_id: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email);
  const [activeTab, setActiveTab] = useState("profile")
  const [profileFormData, setProfileFormData] = useState({ ...user });
  const [userData, setUserData] = useState<any | null>(null);
  const [UserId, setUserId] = useState<any | null>(null);
  const [Subscription, setSubscription] =  useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

const [showErrorModal, setShowErrorModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    confirmPassword: "",
  });

 const handleProfileInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setProfileFormData(prev => ({
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
  // setUser({ ...profileFormData });
  setShowEditModal(false);

  const sendData = async () => {
    try {
      const response = await axiosInstance.post(`api/user-update/${UserId}`, {
        name: profileFormData.name,
        phone_number: profileFormData.phone,
        address: profileFormData.address,
        city: profileFormData.city,
        state_id: profileFormData.state_id,
      });

      // Jika berhasil, reload halaman
      window.location.reload();

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          const messages = Object.values(errors).flat().join('\n');
          setErrorMessage(messages);
        } else {
          setErrorMessage('An error occurred while sending the data.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setShowErrorModal(true);
    }
  };

  // Panggil fungsi async
  sendData();
};

const handlePasswordSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Cek apakah password dan konfirmasi password sama
  if (passwordFormData.password !== passwordFormData.confirmPassword) {
    // alert("Password dan konfirmasi password tidak sama.");
    return;
  }

  try {

    const response = await axiosInstance.post(`/api/change-password/${UserId}`, {
      new_password: passwordFormData.password
    });
      // alert("Password berhasil diubah.");
    setShowChangePasswordModal(false);
    setPasswordFormData({
      password: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat mengubah password.");
  }
};


     const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value);
    };



  useEffect(() => {
    // efek samping jika ada
    const getData = async () => {
      // Simulasi pengambilan data dari API
      const storedCustomer = JSON.parse(localStorage.getItem('customer-hopkins') || 'null');
      setUserId(storedCustomer?.id);
      setUserData(storedCustomer);
      const userId = storedCustomer?.id;

      const subscriptionData = await getSubscriptionDetails(storedCustomer.id_stripe);
      setSubscription(subscriptionData);
      
      const response = await axiosInstance.get(`api/edit-user/${userId}`);
    
      const data = response.data;

      const name = response.data.user.name || "";
      const initials = name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();


      setUser(prev => ({
        ...prev,
        initials: initials,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.phone_number,
        city: response.data.user.city,
        state: response.data.user.state.name,
      }));

    }

    getData();

  }, []);


  function handleChangeEmailSubmit(e: FormEvent<Element>): void {
    throw new Error("Function not implemented.");
  }

   return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-400 py-12 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Link href="/user" className="flex items-center transition hover:text-white">
              <Home className="mr-1 h-4 w-4" />
              <span>Home</span>
            </Link>
            <span>›</span>
            <span>Profile</span>
          </div>

            {showErrorModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className=" flex justify-between">
                  <h2 className="text-xl font-bold text-red-600 mb-4">Validation Failed</h2>
                  <button
                    onClick={() => setShowErrorModal(false)}
                    className="hover:bg-gray-100 hover:rounded-md text-gray-600 p-2"
                  >
                    X
                  </button>
                </div>
           
                
                <p className="text-gray-800 whitespace-pre-line">{errorMessage || 'Error Submit Document' }</p>
                <div className="mt-4 flex justify-end">
                  
                </div>
              </div>
            </div>
          )}



          <div className="mt-6 flex items-center gap-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-orange-600 shadow-lg">
                {user.initials}
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="absolute -bottom-2 -right-2 rounded-full bg-orange-500 p-2 text-white shadow-md hover:bg-orange-600"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-white/90">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 font-medium transition ${
                activeTab === "profile"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 font-medium transition ${
                activeTab === "security"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </button>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === "profile" && (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Contact Information */}
            <div className="md:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <User className="h-5 w-5 text-orange-500" />
                  Contact Information
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Full Name</div>
                    <div className="text-lg font-medium">{user.name}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Email</div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${user.email}`} className="text-orange-500 hover:underline">
                        {user.email}
                      </a>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Phone</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-500">Location</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>
                        {user.state}, {user.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="rounded-md bg-orange-500 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-orange-600"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div>
              <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  Account Summary
                </h2>

                <div className="space-y-4">
                  <div className="rounded-md bg-orange-50 p-4">
                    <div className="text-sm font-medium text-gray-500">Member Since</div>
                    <div className="text-lg font-medium">{userData?.created_at}</div>
                  </div>

                  <div className="rounded-md bg-green-50 p-4">
                    <div className="text-sm font-medium text-gray-500">Account Status</div>
                    <div className="flex items-center gap-2 text-lg font-medium text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Active
                    </div>
                  </div>

                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="text-sm font-medium text-gray-500">Membership Type</div>
                    <div className="text-lg font-medium">{Subscription && Subscription.plan_name ? Subscription.plan_name : 'On Progress'}
</div>
                  </div>

                </div>
              </div>
            </div>
          </div> 
        )}

        {activeTab === "security" && (
          <div className="grid gap-6 md:grid-cols-1">
            {/* Password Settings */}
            <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                <Lock className="h-5 w-5 text-orange-500" />
                Password
              </h2>

              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  Your password was last changed 3 months ago. We recommend changing your password regularly for
                  security.
                </div>
              </div>

              <div className="relative mb-6">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-3"
                />
              </div>

              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="w-full rounded-md bg-orange-500 py-2 font-medium text-white shadow-sm transition hover:bg-orange-600"
              >
                Change Password
              </button>
            </div>

            {/* Email Settings */}
           
          </div>
        )}

      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
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
          email={newEmail}
          onChange={handleProfileInputChange}
          onSubmit={handleChangeEmailSubmit}
          onCancel={() => setShowChangeEmailModal(false)}
        />
      </Modal>
        
      <MobileBottomNavigationBar />
      <FooterUser />
    </div>
  )
}
