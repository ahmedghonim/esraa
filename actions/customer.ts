import prisma from "@/lib/prisma";
import { Customer, CustomerSchema } from "@/schema";

import { ZodError } from "zod";

// Create or update customer
const upsertCustomer = async (data: Customer) => {
  try {
    const validatedData = CustomerSchema.parse(data);

    if (validatedData.id) {
      return await prisma.customer.update({
        where: { id: validatedData.id },
        data: {
          ...validatedData,
          orders: {
            connect: validatedData.orders.map((id) => ({
              id,
            })),
          },
        },
      });
    } else {
      return await prisma.customer.create({
        data: {
          ...validatedData,
          orders: {
            connect: validatedData.orders.map((id) => ({
              id,
            })),
          },
        },
      });
    }
  } catch (error) {
    console.error("Error creating/updating customer:", error);
    if (error instanceof ZodError) {
      throw { status: 400, message: error.errors };
    }

    throw error;
  }
};

// Delete customer
const deleteCustomer = async (id: number) => {
  try {
    await prisma.customer.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting customer with id ${id}:`, error);

    throw error;
  }
};

// Get customer by id
const getCustomerById = async (id: number) => {
  try {
    return await prisma.customer.findUnique({
      where: { id },
      include: { orders: true },
    });
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);

    throw error;
  }
};

// Get all customers
const getAllCustomers = async () => {
  try {
    return await prisma.customer.findMany({
      include: { orders: true },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);

    throw error;
  }
};

export { upsertCustomer, deleteCustomer, getCustomerById, getAllCustomers };
