import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";
import Navbar from "~/components/navbarComponent";
import LogTab from "~/components/logTab";

export const loader: LoaderFunction = async ({ request }) => {
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  if (!sessionIdSession.has("sessionid")) {
    // If it is not present, then the user has not been logged in.
    throw redirect("/login");
  }
  const response = await fetch(BACKEND_URL + "/api/logs/", {
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
  return data.scan_logs;
};

export default function Logs() {
  const logs = useLoaderData<
    Array<{
      scan_name: string;
      url: string;
      timestamp: string;
    }>
  >();
  console.log(logs);
  return (
    <div>
      <Navbar />
      <ul>
        {logs.map(
          (
            log: { scan_name: string; url: string; timestamp: string },
            index: number
          ) => (
            <li key={index}>
              <LogTab
                scanName={log.scan_name}
                url={log.url}
                timestamp={log.timestamp}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
