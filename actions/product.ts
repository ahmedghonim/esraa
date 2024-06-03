"use server";
import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Product } from "@/schema";

import slugify from "slugify";

const productUpsert = async (value: Product) => {
  const db = prisma.product;

  const image = await uploadFile(value?.image);

  if (image) {
    value.image = image;
  }

  if (value.id) {
    return db.update({
      where: {
        id: value.id,
      },
      data: {
        image: value.image,
        name: value.name,
        description: value.description,
        slug: slugify(value.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          locale: "ar",
          lower: true,
          strict: true,
          trim: true,
        }),
        colors: {
          connect: value.colors?.map((id) => ({ id })),
        },
        categories: {
          connect: value.categories?.map((id) => ({ id })),
        },
        sizes: {
          connect: value.sizes?.map((id) => ({ id })),
        },
        collection: {
          connect: { id: value.collectionId },
        },
      },
    });
  } else {
    return db.create({
      data: {
        image: value.image,
        name: value.name,
        description: value.description,
        slug: slugify(value.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true,
          strict: true,
          trim: true,
        }),
        colors: {
          connect: value.colors?.map((id) => ({ id })),
        },
        categories: {
          connect: value.categories?.map((id) => ({ id })),
        },
        sizes: {
          connect: value.sizes?.map((id) => ({ id })),
        },
        collection: {
          connect: { id: value.collectionId },
        },
      },
    });
  }
};

const productDelete = async (id: number) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};

const getProductById = (id: number) => {
  return prisma.product.findFirst({
    where: {
      id,
    },
    include: {
      colors: true,
      categories: true,
      sizes: true,
      collection: true,
    },
  });
};

const getProductBySlug = (slug: string) => {
  return prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      colors: true,
      categories: true,
      sizes: true,
      collection: true,
    },
  });
};

const getAllProducts = () => {
  return prisma.product.findMany({
    include: {
      colors: true,
      categories: true,
      sizes: true,
      collection: true,
    },
  });
};

export {
  productUpsert,
  productDelete,
  getProductById,
  getProductBySlug,
  getAllProducts,
};
