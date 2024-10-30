import { Form, Link } from "@remix-run/react";
export default function Login() {
  return (
    <div>
      <Form method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
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
