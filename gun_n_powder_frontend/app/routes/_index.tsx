import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center flex-col justify-center">
      <h1 className="p-5"> Gun n Powder </h1>
      <h1 className="p-5"> AI Enhanced Penetration Testing </h1>
      <Link className="p-10" to="/login">
        Get Started
      </Link>
    </div>
  );
}
