import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API_URL } from "./constant/url";
import { LoginResponse, TokenClaims } from "./types/auth/tokenPair";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Tell where the pages that relate to the authentication
  pages: {
    signIn: "/login",
    error: "/login",
  },

  // Tell how each session will be made in next auth
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },

      // Logic to integrate frontend with backend
      async authorize({ email, password }) {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.auth.login}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          return null;
        }
        const { data } = (await response.json()) as LoginResponse;
        // Verify the JWT signature
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.error("JWT secret not set");
          return null;
        }

        try {
          jwt.verify(data.accessToken, secret);
        } catch (err) {
          console.error("JWT verification failed:", err);
          return null;
        }

        const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

        // Extract claims from the decoded token
        const { sub, scope, userId, name, profilePictureUrl } = decodedToken;

        const parsedResponse: User = {
          email: sub,
          token: {
            accessToken: {
              claims: decodedToken,
              value: data.accessToken,
            },
            refreshToken: {
              claims: jwtDecode<TokenClaims>(data.refreshToken),
              value: data.refreshToken,
            },
          },
          roles: scope.split(" "),
          userId: parseInt(userId),
          name: name,
          profilePictureUrl: profilePictureUrl,
        };
        return parsedResponse ?? null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken.value;
      session.refreshToken = token.refreshToken.value;
      session.user = {
        ...session.user,
        roles: token.roles,
        id: token.accessToken.claims.userId,
        email: token.accessToken.claims.sub ?? "",
        name: token.accessToken.claims.name,
        profilePictureUrl: token.accessToken.claims.profilePictureUrl,
      };
      return session;
    },
    async jwt({ token, user }) {
      console.log("IN JWT CALLBACK: ", user);
      if (user) {
        token = {
          accessToken: {
            claims: user.token.accessToken.claims,
            value: user.token.accessToken.value,
          },
          refreshToken: {
            claims: user.token.refreshToken.claims,
            value: user.token.refreshToken.value,
          },
          roles: user.roles,
          userId: user.userId,
        };
      }

      // Handle access token expiration
      if (
        token.accessToken.claims.exp &&
        Date.now() >= token.accessToken.claims.exp * 1000
      ) {
        const newToken = await refreshToken(token.refreshToken.value);
        if (!newToken) {
          return null;
        }
        token.accessToken = newToken;
      }
      return token;
    },
    async signIn({ user }) {
      console.log("IN SIGNIN CALLBACK: ", user);
      return true;
    },
  },
});

const refreshToken = async (refreshToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URL.auth.refresh}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({ token: refreshToken }),
  });
  if (!response.ok) {
    console.error("Failed to refresh access token");
    return null;
  }
  const { data } = (await response.json()) as LoginResponse;

  // Verify the JWT signature
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT secret not set");
    return null;
  }

  try {
    jwt.verify(data.accessToken, secret);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }

  const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

  return {
    claims: decodedToken,
    value: data.accessToken,
  };
};
