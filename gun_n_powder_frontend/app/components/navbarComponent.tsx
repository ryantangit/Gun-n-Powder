import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center">
      <div className="p-2">
        <Link to="/dashboard">Home</Link>
      </div>
      <div className="p-2">
        <Link to="/ping">Ping</Link>
      </div>
      <div className="p-2">
        <Link to="/scan"> Scan </Link>
      </div>
      <div className="p-2">
        <Link to="/logs"> Logs </Link>
      </div>
      <div className="p-2">
        <Link to="/logout"> Logout </Link>
      </div>
    </div>
  );
}
