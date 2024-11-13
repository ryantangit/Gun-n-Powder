import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/navbarComponent";

export const loader: LoaderFunction = async ({ params }) => {
  const { name } = params;
  return name;
};

export default function LogDetails() {
  const content = useLoaderData<string>();
  return (
    <div>
      <Navbar />
      <p> {content} </p>
    </div>
  );
}
