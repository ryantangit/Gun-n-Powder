import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export const loader: LoaderFunction = async () => {
  const response = await fetch(BACKEND_URL + "/api/userinfo/", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
