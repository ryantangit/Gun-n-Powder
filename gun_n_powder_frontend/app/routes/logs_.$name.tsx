import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/navbarComponent";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";
import { BACKEND_URL } from "~/constants";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { name } = params;
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const response = await fetch(BACKEND_URL + `/api/logsinfo?scanname=${name}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie(sessionIdSession.data),
    },
  });
  const data = await response.json();
  return json({ content: data.content });
};

export default function LogDetails() {
  const report = useLoaderData<{ content: string }>();
  return (
    <div>
      <Navbar />
      <div className="bg-white border-spacing-1">
        <pre style={{ whiteSpace: 'pre-wrap', padding: '20px' }}>{report.content}</pre>
      </div>
    </div>
  );
}
