"use server";
import prisma from "@/lib/prisma";
import { Collection, CollectionSchema } from "@/schema";
import { ZodError } from "zod";

const upsertCollection = async (data: Collection) => {
  const id = data.id;
  try {
    if (id) {
      const validatedData = CollectionSchema.parse(data);
      const collection = await prisma.collection.update({
        where: { id },
        data: validatedData,
      });
      return collection;
    }

    const validatedData = CollectionSchema.parse(data);
    const collection = await prisma.collection.create({
      data: validatedData,
    });
    return collection;
  } catch (error) {
    if (id) {
      console.error(`Error updating collection with id ${id}:`, error);
      throw error instanceof ZodError
        ? error.errors
        : new Error(`Failed to update collection with id ${id}`);
    }
    console.error("Error creating collection:", error);
    throw error instanceof ZodError
      ? error.errors
      : new Error("Failed to create collection");
  }
};

const deleteCollection = async (id: number) => {
  try {
    await prisma.collection.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting collection with id ${id}:`, error);
    throw new Error(`Failed to delete collection with id ${id}`);
  }
};

const getCollectionById = async (id: number) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id },
    });
    return collection;
  } catch (error) {
    console.error(`Error fetching collection with id ${id}:`, error);
    throw new Error(`Failed to fetch collection with id ${id}`);
  }
};

const getAllCollections = async () => {
  try {
    return await prisma.collection.findMany();
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw new Error("Failed to fetch collections");
  }
};

export {
  upsertCollection,
  deleteCollection,
  getCollectionById,
  getAllCollections,
};
