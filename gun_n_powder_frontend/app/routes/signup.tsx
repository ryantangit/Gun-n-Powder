import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { BACKEND_URL } from "~/constants";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const response = await fetch(BACKEND_URL + "/api/createuser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Failed to create user." };
    }

    return null;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while creating the user." };
  }
}

interface ActionData {
  error: string;
}

export default function SignUp() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <Form method="post">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
        <label htmlFor="password"> Password </label>
        <input type="password" name="password" required />
        <button>Create Account</button>
      </Form>
      {actionData?.error && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "1em" }}
        >
          {actionData.error}
        </div>
      )}
    </div>
  );
}
