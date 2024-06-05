"use server";
import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Category, CategorySchema } from "@/schema";

import { ZodError } from "zod";

const upsertCategory = async (data: Category) => {
  const id = data.id;

  const image = await uploadFile(data?.image);

  if (image) {
    data.image = image;
  }
  try {
    if (id) {
      const validatedData = CategorySchema.parse(data);
      const category = await prisma.category.update({
        where: { id },
        data: validatedData,
      });
      return category;
    }
    const validatedData = CategorySchema.parse(data);
    const category = await prisma.category.create({
      data: validatedData,
    });
    return category;
  } catch (error) {
    if (id) {
      console.error(`Error updating category with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update category with id ${id}`);
    }
    console.error("Error creating category:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create category");
  }
};

const deleteCategory = async (id: number) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw new Error(`Failed to delete category with id ${id}`);
  }
};

const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw new Error(`Failed to fetch category with id ${id}`);
  }
};

const getAllCategories = async ({ top = false }: { top?: boolean }) => {
  const where = top ? { topCategory: true } : {};
  try {
    const categories = await prisma.category.findMany({
      where,
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export { upsertCategory, deleteCategory, getCategoryById, getAllCategories };
