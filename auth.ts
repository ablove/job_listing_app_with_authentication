import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

// Define the session and JWT types
interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthToken extends JWT {
  user?: SessionUser;
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    // Removed 'signUp' as it is not a valid property
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async jwt({ token, user }: { token: AuthToken; user: any }) {
      // Initial sign in
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: AuthToken }) {
      // Send properties to the client
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Authentication failed");
          }

          if (!data.success) {
            throw new Error(data.message || "Authentication failed");
          }

          // Return the user object
          return {
            id: data.data.user._id,
            name: data.data.user.name,
            email: data.data.user.email,
            role: data.data.user.role,
            token: data.data.token,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
