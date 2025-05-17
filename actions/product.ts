"use server";
import prisma from "@/lib/prisma";

import { Product } from "@/schema";

import slugify from "slugify";

const productUpsert = async (value: Product) => {
  const db = prisma.product;

  if (value.id) {
    return db.update({
      where: {
        id: value.id,
      },
      data: {
        name: value.name,
        images: value.images,
        price: +value.price as number,
        newPrice: Number(value.newPrice),
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
          // @ts-ignore
          create: value.productVariant.map((variant) => ({
            stock: variant.stock, // Ensure correct field name here
            color: {
              connect: { id: variant.colorId },
            },
            size: {
              connect: { id: variant.sizeId },
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
        price: +value.price,
        newPrice: Number(value.newPrice),
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
          // @ts-ignore
          create: value?.productVariant.map((variant: any) => ({
            stock: variant.stock, // Ensure correct field name here
            color: {
              connect: { id: variant.colorId },
            },
            size: {
              connect: { id: variant.sizeId },
            },
          })),
        },
      },
    });
  }
};

const productDelete = async (id: number) => {
  // First delete all related ProductVariant records
  await prisma.productVariant.deleteMany({
    where: {
      productId: id,
    },
  });

  // Then delete the product
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

const getAllProducts = async (filters?: {
  categories?: number;
  sale?: boolean;
  newarrival?: boolean;
  minPrice?: number;
  maxPrice?: number;
  colors?: number[];
  sizes?: number[];
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const page = filters?.page || 1;
  const pageSize = filters?.pageSize || 12;
  const skip = (page - 1) * pageSize;

  const whereConditions: any = {};

  // Filter by sale
  if (filters?.sale) {
    whereConditions.newPrice = { not: null };
  }

  // Filter by new arrival
  if (filters?.newarrival) {
    whereConditions.newArrival = true;
  }

  // Filter by price range
  if (filters?.minPrice || filters?.maxPrice) {
    whereConditions.OR = [
      {
        price: {
          gte: filters?.minPrice || 0,
          lte: filters?.maxPrice || Number.MAX_SAFE_INTEGER,
        },
      },
    ];

    // Include products with newPrice if it exists
    if (filters?.minPrice && filters?.maxPrice) {
      whereConditions.OR.push({
        newPrice: {
          gte: filters?.minPrice,
          lte: filters?.maxPrice,
        },
      });
    }
  }

  // Search by name
  if (filters?.search) {
    whereConditions.name = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  // Query conditions for filtering
  const queryConditions = {
    where: {
      ...whereConditions,
      // Filter by categories if provided
      ...(filters?.categories && {
        categories: {
          some: {
            id: filters.categories,
          },
        },
      }),
      // Filter by colors if provided
      ...(filters?.colors &&
        filters.colors.length > 0 && {
          ProductVariant: {
            some: {
              colorId: {
                in: filters.colors,
              },
            },
          },
        }),
      // Filter by sizes if provided
      ...(filters?.sizes &&
        filters.sizes.length > 0 && {
          ProductVariant: {
            some: {
              sizeId: {
                in: filters.sizes,
              },
            },
          },
        }),
    },
    include: {
      ProductVariant: { include: { color: true, size: true } },
      categories: true,
      collection: true,
    },
  };

  // Count total products (for pagination)
  const totalProducts = await prisma.product.count({
    where: queryConditions.where,
  });

  // Get paginated products
  const products = await prisma.product.findMany({
    ...queryConditions,
    skip,
    take: pageSize,
  });

  return {
    products,
    pagination: {
      total: totalProducts,
      pageCount: Math.ceil(totalProducts / pageSize),
      page,
      pageSize,
    },
  };
};

export {
  getAllProducts,
  getProductById,
  getProductBySlug,
  productDelete,
  productUpsert,
};
