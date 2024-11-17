import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";
import Navbar from "~/components/navbarComponent";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  if (!sessionIdSession.has("sessionid")) {
    // If it is not present, then the user has not been logged in.
    throw redirect("/login");
  }
  const response = await fetch(BACKEND_URL + "/api/userinfo/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie(sessionIdSession.data),
    },
  });
  if (!response.ok) {
    throw new Response("Not logged in", { status: 401 });
  }
  const data = await response.json();
  return json({ username: data.username });
};

interface UserInfo {
  username: string;
}

export default function Dashboard() {
  const userInfo = useLoaderData<UserInfo>();
  return (
    <div className=" h-screen bg-gray-300 ">
      <Navbar />
      <div className="flex items-center flex-col justify-center bg-gray-300 px-4 py-20">
        <h3 className="text-2xl md:text-3xl font-light mb-5 text-black">Hello, <b>{userInfo.username}</b></h3>
        <h3 className="text-2xl md:text-3xl font-light mb-5 text-black">Welcome to Gun n Powder</h3>
      </div>

    </div>
  );
}
