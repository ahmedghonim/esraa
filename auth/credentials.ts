import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        const pass = await bcrypt.compare(password as string, user?.password!);

        if (!pass) return null;

        return user;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
