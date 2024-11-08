import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";

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
  return <p> Hello there {userInfo.username} </p>;
}
