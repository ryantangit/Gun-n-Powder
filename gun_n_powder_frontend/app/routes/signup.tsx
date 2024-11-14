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
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div className="w-full max-w-xs flex flex-col items-center space-y-8">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light text-black">Create Account</h1>
        </div>
        <Form method="post" className="w-full flex flex-col space-y-6">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full px-4 py-3 text-lg font-light text-gray-700 bg-white border border-gray-700 rounded-md focus:outline-none"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 text-lg font-light text-gray-700 bg-white border border-gray-700 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 text-lg font-light text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition duration-300"
          >
            Create Account
          </button>
        </Form>
        {actionData?.error && (
          <div className="text-red-600 mt-4">
            {actionData.error}
          </div>
        )}
      </div>
    </div>
  );
}
