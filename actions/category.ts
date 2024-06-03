import prisma from "@/lib/prisma";
import { Category, CategorySchema } from "@/schema";

import { ZodError } from "zod";

const createCategory = async (data: Category) => {
  try {
    const validatedData = CategorySchema.parse(data);
    const category = await prisma.category.create({
      data: validatedData,
    });
    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create category");
  }
};

const updateCategory = async (id: number, data: Category) => {
  try {
    const validatedData = CategorySchema.parse(data);
    const category = await prisma.category.update({
      where: { id },
      data: validatedData,
    });
    return category;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error instanceof ZodError
      ? error.errors
      : new Error(`Failed to update category with id ${id}`);
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

const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};
