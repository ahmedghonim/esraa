"use server";
import prisma from "@/lib/prisma";
import { CustomerSchema, CustomerType } from "@/schema";

import { ZodError } from "zod";

// Create or update customer
const upsertCustomer = async (data: CustomerType) => {
  try {
    const validatedData = CustomerSchema.parse(data);
    const isCustomerExist = await prisma.customer.findUnique({
      where: { phone: validatedData.phone },
    });
    if (isCustomerExist) {
      return await prisma.customer.update({
        where: { phone: validatedData.phone },
        data: {
          ...validatedData,
        },
      });
    } else {
      return await prisma.customer.create({
        data: {
          ...validatedData,
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
