import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import setCookie from "set-cookie-parser"; //Library pulled from npm but kinda buggy
import { sessionIdSessionStorage } from "~/session.server";
import { BACKEND_URL } from "~/constants";

interface Cookie {
  name: string;
  value: string;
  expires: Date;
  httpOnly: boolean;
  maxAge: number;
  path: string;
}

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

  if (response.ok) {
    const setCookieHeader = response.headers.get("Set-Cookie");
    const parsedResponseCookies = setCookie.parse(
      setCookie.splitCookiesString(setCookieHeader)
    );
    const sessionIdCookie = parsedResponseCookies.find(
      (cookie: Cookie) => cookie.name === "sessionid"
    );
    if (!sessionIdCookie) {
      return { error: "Session ID Cookie not found" };
    }
    const headers = new Headers();
    const { name, value, ...sessionIdCookieSerializeOptions } = sessionIdCookie;
    const sessionIdSession = await sessionIdSessionStorage.getSession(
      request.headers.get("Cookie")
    );
    sessionIdSession.set(name, value);
    headers.append(
      "Set-Cookie",
      await sessionIdSessionStorage.commitSession(
        sessionIdSession,
        // Use the response's `sessionid` cookie serialization options.
        sessionIdCookieSerializeOptions
      )
    );

    return redirect("/dashboard", { headers }); // Redirect upon successful login
  } else {
    const errorData = await response.json();
    return { error: errorData.message };
  }
}

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 px-4 py-10">
      <div className="w-full max-w-xs flex flex-col items-center space-y-8">
        
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light text-black">Gun n Powder</h1>
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
            Login
          </button>
        </Form>
        <Link
          to="/signup"
          className="px-6 py-2 text-lg font-light text-gray-700 border border-gray-700 rounded-md hover:bg-gray-200 transition duration-300"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
