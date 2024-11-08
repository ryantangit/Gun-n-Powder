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
    console.log(parsedResponseCookies);
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
