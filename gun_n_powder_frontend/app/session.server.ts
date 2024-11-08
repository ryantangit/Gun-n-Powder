import { createCookieSessionStorage } from "@remix-run/node";

export const sessionIdSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sessionid",
    path: "/",
    secrets: ["secret"],
    secure: false,
  },
});

export function sessionCookie(data) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
}
