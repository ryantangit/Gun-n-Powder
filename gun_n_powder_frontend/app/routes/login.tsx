import { Form } from "@remix-run/react";
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
    </div>
  );
}
