import { ActionFunctionArgs, redirect, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { sessionCookie, sessionIdSessionStorage } from "~/session.server";
import { BACKEND_URL } from "~/constants";
import { useState } from "react";
import Navbar from "~/components/navbarComponent";

export const action = async ({ request }: ActionFunctionArgs) => {
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  if (!sessionIdSession.has("sessionid")) {
    // If it is not present, then the user has not been logged in.
    throw redirect("/login");
  }

  const formData = await request.formData();
  const url = formData.get("url");
  const response = await fetch(BACKEND_URL + "/api/scan/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie(sessionIdSession.data),
    },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    return json({ status: "Scan error" });
  }
  const data = await response.json();
  return json({ status: data.Status, name: data.name });
};

interface ScanStatus {
  status: string;
  name: string;
}

export default function Scan() {
  const scanStatus = useActionData<ScanStatus>();
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
  };

  return (
    <div>
      <Navbar />
      <Form method="post" onSubmit={handleLoading}>
        <label htmlFor="url">URL</label>
        <input type="text" name="url" required />
        <button>Scan</button>
      </Form>
      {loading && !scanStatus ? (
        <p>
          Waiting for request...This may take up to 3 minutes... Do not close
          the window
        </p>
      ) : scanStatus ? (
        <p>{scanStatus.status}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
