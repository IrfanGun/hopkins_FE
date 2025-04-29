"use client";
import Link from "next/link";
import Header from "../../components/layout/header";
import { ChevronRight, Home, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FooterUser from "../../components/ui/footer-user";

export default function Membership() {
  const [isCopied, setIsCopied] = useState(false);

  // Fungsi untuk menyalin kode ke clipboard
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true); // Set copied state menjadi true
      // Reset status copied setelah beberapa detik (misalnya 2 detik)
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  return (
    <div>
      <Header />
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <Link
              href="/membership"
              className="text-gray-500 hover:text-gray-700"
            >
              Membership
            </Link>
          </div>

          {/* Page Title */}
          <h1 className="mb-6 text-2xl font-bold">
            <span className="text-orange-500">MANAGE</span> SUBSCRIPTION
          </h1>

          {/* Banner */}
          <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg md:h-64">
            <Image
              className="object-cover"
              src="/img/bg-2.jpeg"
              alt="Luxury Cars"
              fill
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Manage Subscription
              </h2>
            </div>
          </div>

          {/* Membership Details */}
          <div className="mb-8 h-[250px] rounded-lg bg-orange-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Entry Membership</h2>
              <p className="mb-2 text-gray-700">
                Want to{" "}
                <Link
                  href="/upgrade"
                  className="text-orange-500 hover:underline"
                >
                  Upgrade
                </Link>{" "}
                or{" "}
                <Link
                  href="/downgrade"
                  className="text-orange-500 hover:underline"
                >
                  Downgrade
                </Link>{" "}
                your plan?
              </p>
              <p className="mb-6 text-gray-700">
                Access your billing details{" "}
                <Link
                  href="/billing"
                  className="text-orange-500 hover:underline"
                >
                  here
                </Link>
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="rounded-lg bg-white px-6 py-3 shadow-sm">
                <span className="mr-2 text-gray-700">Account Status</span>
                <span className="rounded bg-red-500 px-2 py-1 text-xs text-white">
                  Active
                </span>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="px grid grid-cols-1 gap-6 px-20 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg bg-orange-500 p-6 text-white shadow-md shadow-black/30">
                <h3 className="mb-4 text-xl font-semibold">Current Entries</h3>
                <div className="flex flex-col items-center">
                  <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-md bg-orange-600 text-5xl font-bold">
                    2
                  </div>
                  <div className="text-sm">Entries</div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-black p-6 text-white shadow-md shadow-black/30">
                <h3 className="mb-6 text-xl font-semibold">
                  Prize Value of
                  <br />
                  Upcoming Prizes
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold">$200,000</div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-orange-500 p-6 text-white shadow-md shadow-black/30">
                <h3 className="mb-6 text-xl font-semibold">
                  Prize Value of
                  <br />
                  Current Prizes
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold">$0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-[125px]"></div>
        {/* Discount Code Section */}
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-6 w-[460px] rounded-lg border border-dashed border-orange-300 bg-white py-6 shadow">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Hopkins+ Store Discount Code
            </h3>
            <div className="mx-auto w-fit rounded-md bg-orange-50 px-8 py-3 text-orange-500 shadow-sm ring-1 ring-orange-300">
              <span className="font-semibold tracking-wide">
                15ENTRYHopkins
              </span>
              <button
                onClick={() => copyCode("15ENTRYHopkins")}
                className="ml-2 inline-flex align-middle text-orange-500 hover:text-orange-700"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {isCopied && (
              <div className="mt-2 text-sm text-green-500">Code copied!</div>
            )}
          </div>

          <div className="mt-6">
            <Link href="/user">
              <button className="mx-2 rounded-md bg-primary-color px-6 py-2 text-white hover:bg-orange-700">
                Return To Profile
              </button>
            </Link>
            <br />
            <Link href="/cancel">
              <button className="mx-2 text-sm text-red-500 underline hover:text-red-700">
                Cancel Plan
              </button>
            </Link>
          </div>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}
