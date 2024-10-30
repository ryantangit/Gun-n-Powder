import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
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
    console.log(response);
    return null;
  } catch (error) {
    console.error(error);
  }
}

export default function SignUp() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
        <label htmlFor="password"> Password </label>
        <input type="password" name="password" required />
        <button>Create Account</button>
      </Form>
    </div>
  );
}
