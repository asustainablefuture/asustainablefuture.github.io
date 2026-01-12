import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page not-found">
      <h1>Page Not Found</h1>
      <p>We couldn’t find the page you were looking for.</p>
      <p>
        <Link href="/">Return home</Link>
      </p>
    </div>
  );
}
