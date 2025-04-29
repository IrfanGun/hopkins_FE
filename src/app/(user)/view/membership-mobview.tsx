"use client";
import Link from "next/link";
import Header from "../../components/layout/header";
import { ChevronRight, Home, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import FooterUser from "../../components/ui/footer-user";

export default function MembershipMobile() {
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div>
      <Header />
      <main className="px-4 py-6">
        <div className="mb-4 flex items-center text-sm">
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

        <h1 className="mb-4 text-xl font-bold">
          <span className="text-orange-500">MANAGE</span> SUBSCRIPTION
        </h1>

        <div className="relative mb-6 h-40 w-full overflow-hidden rounded-lg">
          <Image
            className="object-cover"
            src="/img/bg-2.jpeg"
            alt="Luxury Cars"
            fill
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <h2 className="text-2xl font-bold text-white">
              Manage Subscription
            </h2>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-orange-50 p-4 text-center">
          <h2 className="text-lg font-bold">Entry Membership</h2>
          <p className="mb-1 text-sm text-gray-700">
            Want to{" "}
            <Link href="/upgrade" className="text-orange-500 underline">
              Upgrade
            </Link>{" "}
            or
            <Link href="/downgrade" className="text-orange-500 underline">
              {" "}
              Downgrade
            </Link>
            ?
          </p>
          <p className="text-sm text-gray-700">
            Billing details{" "}
            <Link href="/billing" className="text-orange-500 underline">
              here
            </Link>
          </p>
          <div className="mt-4 inline-block rounded bg-white px-4 py-1 text-sm text-gray-700 shadow">
            Account Status:{" "}
            <span className="ml-1 rounded bg-red-500 px-2 py-1 text-white">
              Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-lg bg-orange-500 p-4 text-white">
            <h3 className="mb-2 text-lg font-semibold">Current Entries</h3>
            <div className="flex flex-col items-center">
              <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-md bg-orange-600 text-3xl font-bold">
                2
              </div>
              <div className="text-sm">Entries</div>
            </div>
          </div>

          <div className="rounded-lg bg-black p-4 text-white">
            <h3 className="mb-2 text-center text-lg font-semibold">
              Prize Value of
              <br /> Upcoming Prizes
            </h3>
            <div className="text-center text-3xl font-bold">$200,000</div>
          </div>

          <div className="rounded-lg bg-orange-500 p-4 text-white">
            <h3 className="mb-2 text-center text-lg font-semibold">
              Prize Value of
              <br /> Current Prizes
            </h3>
            <div className="text-center text-3xl font-bold">$0</div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-orange-300 bg-white px-4 py-4 text-center shadow">
          <h3 className="mb-2 text-base font-semibold text-gray-700">
            Hopkins+ Store Discount Code
          </h3>
          <div className="mx-auto w-fit rounded bg-orange-50 px-6 py-2 text-orange-500 ring-1 ring-orange-300">
            <span className="font-semibold">15ENTRYHopkins</span>
            <button
              onClick={() => copyCode("15ENTRYHopkins")}
              className="ml-2 inline-flex align-middle text-orange-500 hover:text-orange-700"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {isCopied && (
            <div className="mt-1 text-sm text-green-500">Code copied!</div>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <Link href="/user">
            <button className="mb-2 w-full rounded-md bg-primary-color py-2 text-white hover:bg-orange-700">
              Return To Profile
            </button>
          </Link>
          <Link href="/cancel">
            <button className="text-sm text-red-500 underline hover:text-red-700">
              Cancel Plan
            </button>
          </Link>
        </div>
      </main>
      <FooterUser />
    </div>
  );
}
