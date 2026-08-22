export const AUTH_KEY = "rccg_authenticated";

export function isAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function loginUser() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function logoutUser() {
  sessionStorage.removeItem(AUTH_KEY);
}