import { ActionFunctionArgs } from "@remix-run/node";
import { sessionIdSessionStorage } from "~/session.server";
import { Link, Form } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Serialize the cookie to delete it
  const sessionIdSession = await sessionIdSessionStorage.getSession(
    request.headers.get("Cookie")
  );
  console.log(sessionIdSession);
  return null;
};

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
