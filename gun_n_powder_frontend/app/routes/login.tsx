import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch(BACKEND_URL + "/api/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include", // Include cookies in the request
  });
  console.log(response);

  if (response.ok) {
    return redirect("/dashboard"); // Redirect upon successful login
  } else {
    const errorData = await response.json();
    return { error: errorData.message };
  }
}

export default function Login() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <button>Sign In</button>
      </Form>

      <div>
        <p> If you do not have an account, make one </p>
        <Link to="/signup"> here </Link>
      </div>
    </div>
  );
}
