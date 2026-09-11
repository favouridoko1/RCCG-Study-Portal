// import type { NextAuthConfig } from "next-auth";

// export const authConfig = {
//   pages: {
//     signIn: "/auth/login",
//   },

//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;

//       // Your protected landing page
//       const isOnLandingPage = nextUrl.pathname === "/";

//       if (isOnLandingPage) {
//         return isLoggedIn;
//       }

//       // If already logged in, don't allow them to go back
//       // to login/signup
//       const isAuthPage =
//         nextUrl.pathname.startsWith("/auth/login") ||
//         nextUrl.pathname.startsWith("/auth/signup");

//       if (isAuthPage && isLoggedIn) {
//         return Response.redirect(new URL("/", nextUrl));
//       }

//       return true;
//     },
//   },

//   providers: [],
// } satisfies NextAuthConfig;