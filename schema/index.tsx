import { z } from "zod";

// Define the nested schemas for colors, categories, sizes, and collection
const ColorSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

const CategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

const SizeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

const CollectionSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

// Define the main Product schema
const ProductSchema = z.object({
  id: z.number(),
  inStock: z.boolean().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  colors: z.array(z.number()),
  categories: z.array(z.number()),
  sizes: z.array(z.number()),
  collectionId: z.number().optional(),
  relatedProducts: z.array(z.number()).optional(),
});

// Define the OrderProduct schema
const OrderProductSchema = z.object({
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number().min(1),
});

// Define the Order schema
const OrderSchema = z.object({
  id: z.number().optional(),
  orderDate: z.date().optional(),
  customerId: z.number(),
  products: z.array(OrderProductSchema).optional(),
});

// Define the Customer schema
const CustomerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(1)
    .regex(/^\+?[1-9]\d{1,14}$/), // Assuming E.164 phone format
  email: z.string().email().optional(),
  orders: z.array(OrderSchema).optional(),
});

type Product = z.infer<typeof ProductSchema>;
type Color = z.infer<typeof ColorSchema>;
type Category = z.infer<typeof CategorySchema>;
type Size = z.infer<typeof SizeSchema>;
type Collection = z.infer<typeof CollectionSchema>;
type OrderProduct = z.infer<typeof OrderProductSchema>;
type Order = z.infer<typeof OrderSchema>;
type Customer = z.infer<typeof CustomerSchema>;

export {
  ProductSchema,
  ColorSchema,
  CategorySchema,
  SizeSchema,
  CollectionSchema,
  OrderProductSchema,
  OrderSchema,
  CustomerSchema,
  type Product,
  type Color,
  type Category,
  type Size,
  type Collection,
  type OrderProduct,
  type Order,
  type Customer,
};
