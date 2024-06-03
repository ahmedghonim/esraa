import prisma from "@/lib/prisma";
import { Size, SizeSchema } from "@/schema";

import { ZodError } from "zod";

const upsertSize = async (data: Size) => {
  const id = data.id;
  try {
    if (id) {
      const validatedData = SizeSchema.parse(data);
      const size = await prisma.size.update({
        where: { id },
        data: validatedData,
      });
      return size;
    }
    const validatedData = SizeSchema.parse(data);
    const size = await prisma.size.create({
      data: validatedData,
    });
    return size;
  } catch (error) {
    if (id) {
      console.error(`Error updating size with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update size with id ${id}`);
    }
    console.error("Error creating size:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create size");
  }
};

const deleteSize = async (id: number) => {
  try {
    await prisma.size.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting size with id ${id}:`, error);
    throw new Error(`Failed to delete size with id ${id}`);
  }
};

const getSizeById = async (id: number) => {
  try {
    const size = await prisma.size.findUnique({
      where: { id },
    });
    return size;
  } catch (error) {
    console.error(`Error fetching size with id ${id}:`, error);
    throw new Error(`Failed to fetch size with id ${id}`);
  }
};

const getAllSizes = async () => {
  try {
    const sizes = await prisma.size.findMany();
    return sizes;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw new Error("Failed to fetch sizes");
  }
};

export { upsertSize, deleteSize, getSizeById, getAllSizes };
