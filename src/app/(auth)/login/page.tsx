import Image from "next/image";
import Link from "next/link";
import LoginForm from "../_components/login-form";
import LoginBox from "../_components/login-box";
import FooterAuth from "../_components/footer-auth";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex min-h-screen">
      <div className="login__box flex flex-1 flex-col">
        <header className="login__header p-6">
          <Image
            className="login__logo-img"
            src="/img/hopkins_img.png"
            alt="Hopkins+"
            width={120}
            height={40}
          />
        </header>

        <section className="login__content flex flex-1 flex-col px-8 py-4">
          <div className="login__form mx-auto w-full max-w-md">
            <h1 className="login__title mb-2 flex items-center justify-center gap-2 text-center text-2xl font-bold text-gray-800">
              Welcome to Hopkins.
              {/* <Image
                className="login__logo-img"
                src="/img/hopkins_img.png"
                alt="Hopkins+"
                width={95}
                height={35}
              /> */}
            </h1>

            <p className="mb-8 text-center text-lg text-gray-600">
              Please enter your email and password to log in to your account.
            </p>

            <LoginForm />
          </div>
          <FooterAuth />
        </section>

        <footer className="login__footer flex items-center justify-between px-8 py-4 text-sm text-gray-500">
          <div className="login__footer-name">© {currentYear} Hopkins.</div>

          <div className="login__footer-privacy flex items-center">
            <Link
              href="/general-and-legal-page.html"
              className="login__footer-privacy-link hover:text-gray-700"
            >
              Privacy Policy
            </Link>
            <span className="login__footer-privacy-separator mx-2">•</span>
            <Link
              href="/general-and-legal-page.html"
              className="login__footer-privacy-link hover:text-gray-700"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </footer>
      </div>
      <LoginBox />
    </main>
  );
}
