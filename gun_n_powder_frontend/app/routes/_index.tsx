import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Gun n Powder" },
    { name: "description", content: "AI Enhanced Penetration Testing" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center flex-col justify-center bg-gray-300">
      <h1 className="text-6xl font-light mb-10 text-black">Gun n Powder</h1>
      <h2 className="text-2xl font-light mb-20 text-black">AI Enhanced Penetration Testing</h2>
      <Link
         className="px-6 py-2 text-lg font-light text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition duration-300"
         to="/login"
       >
        Get Started
      </Link>
    </div>
  );
}
