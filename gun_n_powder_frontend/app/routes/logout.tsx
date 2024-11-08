import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { BACKEND_URL } from "~/constants";
import { Link, Form } from "@remix-run/react";
import { sessionIdSessionStorage } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const response = await fetch(BACKEND_URL + "/api/logout/", {
      method: "POST",
    });
    const sessionIdSession = await sessionIdSessionStorage.getSession(
      request.headers.get("Cookie")
    );

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Failed to Logout." };
    }
    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionIdSessionStorage.destroySession(
          sessionIdSession
        ),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while logging out the user." };
  }
}

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
