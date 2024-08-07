"use server";
import prisma from "@/lib/prisma";
import uploadFile from "@/lib/upload-file";
import { Product } from "@/schema";

import slugify from "slugify";

const productUpsert = async (value: Product) => {
  const db = prisma.product;

  const imageUrl = value?.images
    ? await Promise.all(
        value.images
          .filter((image) => image)
          .map((image) =>
            image?.startsWith("https") ? image : uploadFile(image)
          )
      )
    : [];

  if (imageUrl.length > 0) {
    value.images = imageUrl as string[];
  }

  const thumbnail = await uploadFile(value?.thumbnail);

  if (thumbnail) {
    value.thumbnail = thumbnail;
  }

  if (value.id) {
    return db.update({
      where: {
        id: value.id,
      },
      data: {
        name: value.name,
        images: value.images,
        price: +value.price as number,
        thumbnail: value.thumbnail,
        description: value.description,
        newArrival: value.newArrival,
        slug: slugify(value.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          locale: "ar",
          lower: true,
          strict: true,
          trim: true,
        }),
        categories: {
          connect: value.categories?.map((id) => ({ id })),
        },
        collection: value.collectionId
          ? {
              connect: { id: value.collectionId },
            }
          : undefined,
        relatedProducts:
          value?.relatedProducts && value?.relatedProducts.length > 0
            ? {
                connect: value?.relatedProducts?.map((id) => ({ id })),
              }
            : undefined,
        ProductVariant: {
          deleteMany: {}, // Delete existing variants to handle the update
          create: value.variants.map((variant) => ({
            stoke: variant.stoke,
            color: {
              connectOrCreate: {
                where: { id: variant.color.id },
                create: {
                  name: variant.color.name,
                  hexCode: variant.color.hexCode,
                },
              },
            },
            size: {
              connectOrCreate: {
                where: { id: variant.size.id },
                create: { name: variant.size.name },
              },
            },
          })),
        },
      },
    });
  } else {
    return db.create({
      data: {
        name: value.name,
        images: value.images,
        price: +value.price as number,
        thumbnail: value.thumbnail,
        description: value.description,
        newArrival: value.newArrival,
        slug: slugify(value.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          locale: "ar",
          lower: true,
          strict: true,
          trim: true,
        }),
        categories: {
          connect: value.categories?.map((id) => ({ id })),
        },
        collection: value.collectionId
          ? {
              connect: { id: value.collectionId },
            }
          : undefined,
        relatedProducts: {
          connect: value.relatedProducts?.map((id) => ({ id })),
        },
        ProductVariant: {
          create: value.variants.map((variant) => ({
            stoke: variant.stoke,
            color: {
              connectOrCreate: {
                where: { id: variant.color.id },
                create: {
                  name: variant.color.name,
                  hexCode: variant.color.hexCode,
                },
              },
            },
            size: {
              connectOrCreate: {
                where: { id: variant.size.id },
                create: { name: variant.size.name },
              },
            },
          })),
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
      ProductVariant: { include: { color: true, size: true } },
      categories: true,
      collection: true,
      relatedProducts: true,
    },
  });
};

const getProductBySlug = (slug: string) => {
  return prisma.product.findFirst({
    where: {
      slug,
    },
    include: {
      ProductVariant: { include: { color: true, size: true } },
      categories: true,
      collection: true,
    },
  });
};

const getAllProducts = () => {
  return prisma.product.findMany({
    include: {
      ProductVariant: { include: { color: true, size: true } },
      categories: true,
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
