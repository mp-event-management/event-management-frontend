// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   // Tell where the pages that relate to the authentication
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   // Tell how each session will be made in next auth
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 1,
//   },
//   secret: process.env.AUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       // Logic to integrate frontend with backend
//       async authorize({ email, password }) {
//         const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.auth.login}`,
//         const response = await fetch(url, {
//           method: "POST",

//         })
//       },
//     }),
//   ],
//   callbacks: {

//   }
// });
