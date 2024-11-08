import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <Link to="/ping">Ping</Link>
      <Link to="/logout"> Logout </Link>
    </div>
  );
}
