"use client";
import { use } from "react"; // ⬅️ tambahkan ini
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../../_components/register-form";
import LoginBox from "../../_components/login-box";
import FooterAuth from "../../_components/footer-auth";
import axiosInstance from "src/api/axiosInstance";
import { Spinner, ThemeProvider } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";

type PageProps = {
  params: Promise<{ token: string }>; // ⬅️ params sekarang Promise
};

export default function Page({ params }: PageProps) {
  const { token } = use(params); // ⬅️ use() untuk unwrap

  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axiosInstance.get(`/api/validate-token/${token}`);
        setEmail(response.data.email);
      } catch (error: any) {
        setError(error?.response?.data?.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  if (loading) {
    return (
      <p className="p-8 text-center">
        <ThemeProvider theme={customTheme}>
          <Spinner color="base" />
        </ThemeProvider>
      </p>
    );
  }

  if (error) {
    return (
      <main className="p-8 text-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-semibold text-orange-600">
              Registration
            </h2>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen">
      <div className="login__box flex flex-1 flex-col">
        <header className="login__header p-6">
          <Image src="/img/hopkins_img.png" alt="Hopkins+" width={120} height={40} />
        </header>

        <section className="login__content flex flex-1 flex-col px-8 py-4">
          <div className="login__form mx-auto w-full max-w-md">
            <h1 className="login__title mb-2 text-center text-2xl font-bold text-gray-800">
              Welcome to Hopkins.
            </h1>
            <p className="mb-8 text-center text-lg text-gray-600">
              Fill the form to create a new account.
            </p>
            <RegisterForm email={email} token={token} />
          </div>
          <FooterAuth />
        </section>

        <footer className="login__footer flex items-center justify-between px-8 py-4 text-sm text-gray-500">
          <div className="login__footer-name">© {currentYear} Hopkins.</div>
          <div className="login__footer-privacy flex items-center">
            <Link href="/general-and-legal-page.html" className="hover:text-gray-700">Privacy Policy</Link>
            <span className="mx-2">•</span>
            <Link href="/general-and-legal-page.html" className="hover:text-gray-700">Terms &amp; Conditions</Link>
          </div>
        </footer>
      </div>
      <LoginBox />
    </main>
  );
}
