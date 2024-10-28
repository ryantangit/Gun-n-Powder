import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link to="/ping">Ping</Link>
    </div>
  );
}
