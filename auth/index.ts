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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.type = user.type;
        token.email = user.email;
        // token.expiresAt = new Date(Date.now() + 30);
      }

      // const expiresAt = token.expiresAt as Date;
      // if (expiresAt && new Date() > expiresAt) {
      //   return token;
      // }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.fullname = token.fullname as string;
      session.user.type = token.type;
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
