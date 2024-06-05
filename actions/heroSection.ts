"use server";
import prisma from "@/lib/prisma";
import { HeroSection, HeroSectionSchema } from "@/schema";
import { ZodError } from "zod";

const upsertHeroSection = async (data: HeroSection) => {
  try {
    const validatedData = HeroSectionSchema.parse(data);

    if (validatedData.id) {
      const heroSection = await prisma.heroSection.update({
        where: { id: 1 },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          mainProduct: validatedData.mainProduct,
          products: {
            connect: data.products?.map((id) => ({ id })),
          },
        },
      });
      return heroSection;
    } else {
      const heroSection = await prisma.heroSection.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          mainProduct: validatedData.mainProduct,
          products: {
            connect: data.products?.map((id) => ({ id })),
          },
        },
      });
      return heroSection;
    }
  } catch (error) {
    console.error("Error creating/updating hero section entry:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }

    throw error;
  }
};

const getHeroSection = async () => {
  try {
    const heroSection = await prisma.heroSection.findUnique({
      where: { id: 1 },
      include: {
        products: true,
      },
    });
    return heroSection;
  } catch (error) {
    throw error;
  }
};

export { getHeroSection, upsertHeroSection };
