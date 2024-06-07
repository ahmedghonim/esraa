"use server";
import { ZodError } from "zod";
import { onMailer } from "./mailer";
import { ConfirmOrder, ConfirmOrderSchema } from "@/schema";

// Confirm Order
const createOrder = async (data: ConfirmOrder) => {
  try {
    const validatedData = ConfirmOrderSchema.parse(data);

    onMailer({
      email: process.env.NODE_MAILER_EMAIL!,
      subject: "New Contact Message Form Your Website",
      html: `
        <h2>New Contact Message</h2>
        <p>Name: ${validatedData.name}</p>
        <p>Phone: ${validatedData.phone}</p>
        <p>Message: ${validatedData.address}</p>`,
    });
  } catch (error) {
    console.error("Error creating/updating contact:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }
    throw error;
  }
};

export { createOrder };
