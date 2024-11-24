"use server";
import prisma from "@/lib/prisma";
import { SaleSlider, SaleSliderSchema } from "@/schema";
import { ZodError } from "zod";

const upsertSaleSlider = async (data: SaleSlider) => {
  const id = data.id;

  try {
    if (id) {
      const validatedData = SaleSliderSchema.parse(data);
      const saleSlider = await prisma.saleSlider.update({
        where: { id },
        data: validatedData,
      });
      return saleSlider;
    }
    const validatedData = SaleSliderSchema.parse(data);
    const saleSlider = await prisma.saleSlider.create({
      data: validatedData,
    });
    return saleSlider;
  } catch (error) {
    if (id) {
      console.error(`Error updating sale slider with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update sale slider with id ${id}`);
    }
    console.error("Error creating sale slider:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create sale slider");
  }
};

const deleteSaleSlider = async (id: number) => {
  try {
    await prisma.saleSlider.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting sale slider with id ${id}:`, error);
    throw new Error(`Failed to delete sale slider with id ${id}`);
  }
};

const hiddenSaleSlider = async (id: number, hidden: boolean) => {
  try {
    const saleSlider = await prisma.saleSlider.update({
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

const getSaleSliderById = async (id: number) => {
  try {
    const saleSlider = await prisma.saleSlider.findUnique({
      where: { id },
    });
    return saleSlider;
  } catch (error) {
    console.error(`Error fetching sale slider with id ${id}:`, error);
    throw new Error(`Failed to fetch sale slider with id ${id}`);
  }
};

const getAllSaleSliders = async ({ notHidden }: { notHidden?: boolean }) => {
  const where = notHidden ? { hidden: false } : {};
  try {
    const saleSliders = await prisma.saleSlider.findMany({
      where,
    });
    return saleSliders;
  } catch (error) {
    console.error("Error fetching sale sliders:", error);
    throw new Error("Failed to fetch sale sliders");
  }
};

export {
  upsertSaleSlider,
  deleteSaleSlider,
  getSaleSliderById,
  getAllSaleSliders,
  hiddenSaleSlider,
};
