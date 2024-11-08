import { createCookieSessionStorage } from "@remix-run/node";

export const sessionIdSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sessionid",
    path: "/",
    secrets: ["secret"],
    secure: false,
  },
});

//Data will be any type
export function sessionCookie(data) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
}

export function sessionCookieEmpty(data) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=""`)
    .join("; ");
}
