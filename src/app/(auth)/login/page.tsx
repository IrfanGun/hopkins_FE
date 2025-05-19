import Image from "next/image";
import Link from "next/link";
import LoginForm from "../_components/login-form";
import LoginBox from "../_components/login-box";
import FooterAuth from "../_components/footer-auth";


export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="flex min-h-screen bg-orange-500">
      <div className="flex w-full items-center justify-center p-4">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl">
          {/* Left side - Orange welcome panel */}
          <div className="relative hidden w-2/5 bg-gradient-to-br from-orange-500 to-orange-600 p-12 text-white lg:block">
            <div className="relative z-10">
              <Image
                className="mb-8"
                src="/img/hopkins_img.png"
                alt="Hopkins+"
                width={140}
                height={50}
                priority
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <h1 className="mb-2 text-4xl font-bold">WELCOME</h1>
              <h2 className="mb-6 text-2xl font-semibold">HOPKINS+ MEMBERS</h2>
              <p className="mb-6 max-w-sm opacity-90">
                Access exclusive deals, track your entries, and manage your membership all in one place. Join thousands
                of members saving with Hopkins+ every day.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="block text-xl font-bold">100+</span>
                  <span className="text-sm">Partner Stores</span>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="block text-xl font-bold">50+</span>
                  <span className="text-sm">Categories</span>
                </div>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute bottom-12 left-12 h-32 w-32 rounded-full bg-orange-400/30"></div>
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-orange-400/20"></div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full bg-white p-8 md:p-12 lg:w-3/5">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Sign in</h2>
                <p className="text-gray-500">Please enter your credentials to access your account</p>
              </div>

              <LoginForm />

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Protected by industry standard encryption</p>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                © {currentYear} Hopkins. All rights reserved.
                <div className="mt-2 flex justify-center space-x-4">
                  <Link href="/general-and-legal-page.html" className="hover:text-orange-600">
                    Privacy Policy
                  </Link>
                  <Link href="/general-and-legal-page.html" className="hover:text-orange-600">
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
