"use server";
import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Shipping, ShippingSchema } from "@/schema";

import { ZodError } from "zod";

const upsertShipping = async (data: Shipping) => {
  const id = data.id;
  
  try {
    if (id) {
      const validatedData = ShippingSchema.parse(data);
      const shipping = await prisma.shipping.update({
        where: { id },
        data: validatedData,
      });
      return shipping;
    }
    const validatedData = ShippingSchema.parse(data);

    const shipping = await prisma.shipping.create({
      data: validatedData,
    });
    return shipping;
  } catch (error) {
    if (id) {
      console.error(`Error updating shipping with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update shipping with id ${id}`);
    }
    console.error("Error creating shipping:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create shipping");
  }
};

const deleteShipping = async (id: number) => {
  try {
    await prisma.shipping.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting shipping with id ${id}:`, error);
    throw new Error(`Failed to delete shipping with id ${id}`);
  }
};

const getShippingById = async (id: number) => {
  try {
    const shipping = await prisma.shipping.findUnique({
      where: { id },
    });
    return shipping;
  } catch (error) {
    console.error(`Error fetching shipping with id ${id}:`, error);
    throw new Error(`Failed to fetch shipping with id ${id}`);
  }
};

const getAllShipping = async () => {
  try {
    const categories = await prisma.shipping.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export { upsertShipping, deleteShipping , getShippingById , getAllShipping  };
