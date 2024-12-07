"use server";
import { ZodError } from "zod";
import { Contact, ContactSchema } from "@/schema";
import prisma from "@/lib/prisma";
import { onMailer } from "./mailer";

// Create or update a contact
const createContact = async (data: Contact) => {
  try {
    const validatedData = ContactSchema.parse(data);

    await prisma.contact.create({
      data: validatedData,
    });

    onMailer({
      email: process.env.NODE_MAILER_EMAIL!,
      subject: "New Contact Message Form Your Website",
      html: `
        <h2>New Contact Message</h2>
        <p>Name: ${validatedData.name}</p>
        <p>Phone: ${validatedData.phone}</p>
        <p>Message: ${validatedData.message}</p>`,
    });
  } catch (error) {
    console.error("Error creating/updating contact:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }
    throw error;
  }
};

// Delete a contact
const deleteContact = async (id: number) => {
  try {
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting contact with id ${id}:`, error);
    throw error;
  }
};

// Get contact by id
const getContactById = async (id: number) => {
  try {
    return await prisma.contact.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    throw error;
  }
};

const updateContactToRead = async (id: number) => {
  try {
    return await prisma.contact.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    console.error(`Error updating contact with id ${id}:`, error);
    throw error;
  }
};

// Get all contacts
const getAllContacts = async () => {
  try {
    return await prisma.contact.findMany();
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export {
  createContact,
  updateContactToRead,
  deleteContact,
  getContactById,
  getAllContacts,
};
