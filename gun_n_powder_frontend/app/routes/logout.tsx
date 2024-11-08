import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { BACKEND_URL } from "~/constants";
import { Link, Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const response = await fetch(BACKEND_URL + "/api/logout/", {
      method: "POST",
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Failed to Logout." };
    }
    return redirect("/");
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
