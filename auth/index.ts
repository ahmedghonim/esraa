import NextAuth, { NextAuthConfig } from "next-auth";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./credentials";

const authOptions: NextAuthConfig = {
  //!IMPORTANT: strategy for Auth.js
  session: {
    strategy: "jwt",
  },
  debug: true,
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.fullname = token.fullname as string;
      session.user.email = token.email as string;

      return session;
    },
  },
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  pages: {
    signIn: "/sign-in",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
