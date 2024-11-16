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
    <div className="flex h-screen items-center justify-center bg-gray-300">
	  <div className="w-full max-w-xs flex flex-col items-center space-y-8">
      <p className="text-xl text-gray-700">Are you sure you want to log out?</p>
      <Form method="post">
        <button type="submit" className="px-6 py-2 text-lg font-light text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition duration-300">Logout</button>
      </Form>
      <Link to="/dashboard" className="text-base text-gray-700 hover:text-blue-500">Go back to dashboard</Link>
	  </div>
    </div>
  );
}
