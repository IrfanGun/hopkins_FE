import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MembershipContent() {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <Home className="h-4 w-4" />
        </Link>
        <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
        <Link href="/membership" className="text-gray-500 hover:text-gray-700">
          Membership
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold">
        <span className="text-blue-500">MANAGE</span> SUBSCRIPTION
      </h1>

      {/* Banner */}
      <div className="relative mb-8 h-48 w-full overflow-hidden rounded-lg md:h-64">
        <Image
          className="object-cover"
          src="/img/Hopkinsm.png"
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
      <div className="mb-8 h-[250px] rounded-lg bg-blue-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Entry Membership</h2>
          <p className="mb-2 text-gray-700">
            Want to{" "}
            <Link href="/upgrade" className="text-blue-500 hover:underline">
              Upgrade
            </Link>{" "}
            or{" "}
            <Link href="/downgrade" className="text-blue-500 hover:underline">
              Downgrade
            </Link>{" "}
            your plan?
          </p>
          <p className="mb-6 text-gray-700">
            Access your billing details{" "}
            <Link href="/billing" className="text-blue-500 hover:underline">
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
          {/* Current Entries */}
          <div className="relative overflow-hidden rounded-lg bg-blue-500 p-6 text-white shadow-lg shadow-black/20">
            <div className="absolute bottom-0 right-0 opacity-20">
              <svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L200 200H0V0Z" fill="white" />
                <path d="M200 0L0 200H200V0Z" fill="white" />
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-semibold">Current Entries</h3>
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-md bg-blue-600 text-5xl font-bold">
                2
              </div>
              <div className="text-sm">Entries</div>
            </div>
          </div>

          {/* Upcoming Prizes */}
          <div className="relative overflow-hidden rounded-lg bg-black p-6 text-white">
            <div className="absolute bottom-0 right-0 opacity-20">
              <svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L200 200H0V0Z" fill="white" />
                <path d="M200 0L0 200H200V0Z" fill="white" />
              </svg>
            </div>
            <h3 className="mb-6 text-xl font-semibold">
              Prize Value of
              <br />
              Upcoming Prizes
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold">$200,000</div>
            </div>
          </div>

          {/* Current Prizes */}
          <div className="relative overflow-hidden rounded-lg bg-blue-500 p-6 text-white">
            <div className="absolute bottom-0 right-0 opacity-20">
              <svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L200 200H0V0Z" fill="white" />
                <path d="M200 0L0 200H200V0Z" fill="white" />
              </svg>
            </div>
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
  );
}
