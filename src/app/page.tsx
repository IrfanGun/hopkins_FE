import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <nav>
        <Link href="/">Home</Link> | <Link href="/login">Login</Link> |{" "}
        <Link href="/register">Register</Link>
      </nav>
      <h1>Welcome to My App</h1>
    </main>
  );
}
