/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * These routes will redirect logged in user to /setting
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * These prefix for API authentication routes
 * use for api authentication prupose
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

// the default redirect path after logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings";
