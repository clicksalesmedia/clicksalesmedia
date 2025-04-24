import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { prisma } from "./prisma";

// Add proper types for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Remove adapter to avoid potential issues
  // adapter: PrismaAdapter(prisma),
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Auth attempt with credentials:", { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("User not found:", credentials.email);
            return null;
          }

          if (!user.password) {
            console.log("User has no password stored");
            return null;
          }

          console.log("Found user:", { id: user.id, email: user.email });
          
          // Use bcryptjs for password comparison
          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          console.log("Password validation result:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Password invalid for user:", credentials.email);
            return null;
          }

          // Return the user object without sensitive data
          return {
            id: user.id,
            email: user.email,
            name: user.name || "",
            image: user.image || "",
            role: user.role || "USER",
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback with user:", user.email);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name || "";
        token.role = user.role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("Session callback with token for:", token.email);
        // Ensure user object is initialized with required properties
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string | null,
          role: (token.role as string) || "USER"
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/login",
    error: "/dashboard/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 