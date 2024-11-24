"use server";
import prisma from "@/lib/prisma";
import { WhatTheSay, WhatTheSaySchema } from "@/schema";
import { ZodError } from "zod";

const upsertWhatTheSay = async (data: WhatTheSay) => {
  const id = data.id;

  try {
    if (id) {
      const validatedData = WhatTheSaySchema.parse(data);
      const whatTheSay = await prisma.whatTheSay.update({
        where: { id },
        data: validatedData,
      });
      return whatTheSay;
    }
    const validatedData = WhatTheSaySchema.parse(data);
    const whatTheSay = await prisma.whatTheSay.create({
      data: validatedData,
    });
    return whatTheSay;
  } catch (error) {
    if (id) {
      console.error(`Error updating what the say entry with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update what the say entry with id ${id}`);
    }
    console.error("Error creating what the say entry:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create what the say entry");
  }
};

const deleteWhatTheSay = async (id: number) => {
  try {
    await prisma.whatTheSay.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting what the say entry with id ${id}:`, error);
    throw new Error(`Failed to delete what the say entry with id ${id}`);
  }
};

const getWhatTheSayById = async (id: number) => {
  try {
    const whatTheSay = await prisma.whatTheSay.findUnique({
      where: { id },
    });
    return whatTheSay;
  } catch (error) {
    console.error(`Error fetching what the say entry with id ${id}:`, error);
    throw new Error(`Failed to fetch what the say entry with id ${id}`);
  }
};

const getAllWhatTheSays = async ({ notHidden }: { notHidden?: boolean }) => {
  const where = notHidden ? { hidden: false } : {};
  try {
    const whatTheSays = await prisma.whatTheSay.findMany({
      where,
    });
    return whatTheSays;
  } catch (error) {
    console.error("Error fetching what the say entries:", error);
    throw new Error("Failed to fetch what the say entries");
  }
};
const hiddenWhatTheSay = async (id: number, hidden: boolean) => {
  try {
    const saleSlider = await prisma.whatTheSay.update({
      where: { id },
      data: {
        hidden,
      },
    });
    return saleSlider;
  } catch (error) {
    console.error(`Error hiding sale slider with id ${id}:`, error);
    throw new Error(`Failed to hide sale slider with id ${id}`);
  }
};
export {
  upsertWhatTheSay,
  deleteWhatTheSay,
  getWhatTheSayById,
  getAllWhatTheSays,
  hiddenWhatTheSay,
};
