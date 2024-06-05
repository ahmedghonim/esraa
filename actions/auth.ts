"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { onMailer } from "./mailer";
import { Signup } from "@/schema";

export const register = async ({ fullname, email, password, otp }: Signup) => {
  try {
    if (!otp && !email) return { status: 400, message: "Invalid OTP" };

    const isValidOtp = await prisma.otpCode.findFirst({
      where: {
        otp,
      },
    });

    if (!isValidOtp) return { status: 400, message: "Invalid OTP" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const registered = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });

    if (registered) {
      return { status: 200, message: "User registered successfully" };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onSendOtp = async (email: string) => {
  try {
    const radomeSexDigit = Math.floor(100000 + Math.random() * 900000);

    await onMailer({
      email,
      subject: "OTP for registration",
      html: `<h1>Your OTP is ${radomeSexDigit}</h1>`,
    });

    const res = await prisma.otpCode.create({
      data: {
        otp: radomeSexDigit.toString(),
      },
    });

    return { status: 400, message: "OTP sent successfully" };
  } catch (error: any) {
    return { status: 400, message: "OTP not sent" };
  }
};
