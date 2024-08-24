"use server";
import prisma from "@/lib/prisma";
import { Order, OrderProduct, OrderSchema } from "@/schema";
import { ZodError } from "zod";
import { onMailer } from "./mailer";

// Create order-product relationships
const createOrderProduct = async (
  orderId: number,
  products: OrderProduct[]
) => {
  const orderProducts = products.map((product) => ({
    orderId,
    productId: product.productId,
    quantity: product.quantity,
    size: product.size,
    color: product.color,
  }));

  await prisma.orderProduct.createMany({
    data: orderProducts,
  });

  for (const product of products) {
    if (product.size || product.color) {
      // If the product has variants (size/color)
      const variant = await prisma.productVariant.findFirst({
        where: {
          productId: product.productId,
          size: product.size,
          color: product.color,
        },
      });

      if (variant) {
        const updatedVariant = await prisma.productVariant.update({
          where: { id: variant.id },
          data: { stock: { decrement: product.quantity } },
        });

        if (updatedVariant.stock < 2) {
          // Stock is less than 2
          const productData = await prisma.product.findUnique({
            where: { id: product.productId },
          });
          onMailer({
            subject: "Product variant out of stock",
            html: `<h1>Product variant (${productData?.name} - ${product.size} / ${product.color}) out of stock</h1>`,
          });
        }
      }
    } else {
      // If the product does not have variants
      const updatedProduct = await prisma.product.update({
        where: { id: product.productId },
        data: { stock: { decrement: product.quantity } },
      });

      if (updatedProduct.stock < 2) {
        // Stock is less than 2
        onMailer({
          subject: "Product out of stock",
          html: `<h1>Product ${updatedProduct.name} out of stock</h1>`,
        });
      }
    }
  }
};

// Create or update order
const createOrder = async (data: Order) => {
  try {
    const validatedData = OrderSchema.parse(data);

    // Create the order first without products
    const createdOrder = await prisma.order.create({
      data: {
        customerId: validatedData.customerId,
      },
    });

    // Ensure that products array is defined and correctly typed
    if (validatedData.products) {
      const products = validatedData.products;

      // Create order products
      await createOrderProduct(createdOrder.id, products);
    }

    // Fetch the created order with products included
    const orderWithProducts = await prisma.order.findUnique({
      where: { id: createdOrder.id },
      include: {
        products: true,
      },
    });

    return orderWithProducts;
  } catch (error) {
    console.error("Error creating/updating order:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }
    throw error;
  }
};

// Delete order
const deleteOrder = async (id: number) => {
  try {
    await prisma.order.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting order with id ${id}:`, error);
    throw error;
  }
};

const deleteAllOrders = async () => {
  try {
    await prisma.order.deleteMany();
  } catch (error) {
    console.error(`Error deleting all orders:`, error);
    throw error;
  }
};

// Get order by id
const getOrderById = async (id: number) => {
  try {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  } catch (error) {
    console.error(`Error fetching order with id ${id}:`, error);
    throw error;
  }
};

// Get all orders
const getAllOrders = async () => {
  try {
    return await prisma.order.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export {
  deleteOrder,
  getOrderById,
  getAllOrders,
  createOrder,
  deleteAllOrders,
};
