"use server";
import prisma from "@/lib/prisma";
import { OurInfo, OurInfoSchema } from "@/schema";
import { ZodError } from "zod";

// Create or update our info
const upsertOurInfo = async (data: OurInfo) => {
  try {
    const validatedData = OurInfoSchema.parse(data);

    if (validatedData.id) {
      return await prisma.ourInfo.update({
        where: { id: 1 },
        data: {
          ...validatedData,
          shipping: +validatedData.shipping,
        },
      });
    } else {
      return await prisma.ourInfo.create({
        data: {
          ...validatedData,
          shipping: +validatedData.shipping,
        },
      });
    }
  } catch (error) {
    console.error("Error creating/updating our info:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }
    throw error;
  }
};

// Get our info by id
const getOurInfo = async () => {
  try {
    return await prisma.ourInfo.findFirst({
      where: { id: 1 },
    });
  } catch (error) {
    console.error(`Error fetching our info with id ${1}:`, error);
    throw error;
  }
};

export { upsertOurInfo, getOurInfo };
