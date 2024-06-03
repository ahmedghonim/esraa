import prisma from "@/lib/prisma";
import { Color, ColorSchema } from "@/schema";

import { ZodError } from "zod";

const createColor = async (data: Color) => {
  try {
    const validatedData = ColorSchema.parse(data);
    const color = await prisma.color.create({
      data: validatedData,
    });
    return color;
  } catch (error) {
    console.error("Error creating color:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create color");
  }
};

const updateColor = async (id: number, data: Color) => {
  try {
    const validatedData = ColorSchema.parse(data);
    const color = await prisma.color.update({
      where: { id },
      data: validatedData,
    });
    return color;
  } catch (error) {
    console.error(`Error updating color with id ${id}:`, error);
    throw error instanceof ZodError
      ? error.errors
      : new Error(`Failed to update color with id ${id}`);
  }
};

const deleteColor = async (id: number) => {
  try {
    await prisma.color.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting color with id ${id}:`, error);
    throw new Error(`Failed to delete color with id ${id}`);
  }
};

const getColorById = async (id: number) => {
  try {
    const color = await prisma.color.findUnique({
      where: { id },
    });
    return color;
  } catch (error) {
    console.error(`Error fetching color with id ${id}:`, error);
    throw new Error(`Failed to fetch color with id ${id}`);
  }
};

const getAllColors = async () => {
  try {
    const colors = await prisma.color.findMany();
    return colors;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw new Error("Failed to fetch colors");
  }
};

export { createColor, updateColor, deleteColor, getColorById, getAllColors };
