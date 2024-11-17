import { LoaderFunction, json } from "@remix-run/node";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";
import { BACKEND_URL } from "~/constants";
import Navbar from "~/components/navbarComponent";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { name } = params;
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const response = await fetch(BACKEND_URL + `/api/aiinfo?scanname=${name}`, {
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

export default function AIDetails() {
  const report = useLoaderData<{ content: string }>();
  return (
    <div>
      <Navbar />
      <div className=" border-spacing-1">
        <pre style={{ whiteSpace: "pre-wrap", padding: "20px" }}>{report.content}</pre>
      </div>
    </div>
  );
}
