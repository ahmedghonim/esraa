import { z } from "zod";

// Define the nested schemas for colors, categories, sizes, and collection
const ColorSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  hexCode: z.string().min(1),
});

const CategorySchema = z.object({
  id: z.number().optional(),
  image: z.string(),
  name: z.string().min(1),
  topCategory: z.boolean().optional(),
});

const SizeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
});

const CollectionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
});

// Define the main Product schema
const ProductSchema = z.object({
  id: z.number().optional(),
  newArrival: z.boolean().optional(),
  price: z.number().or(z.string()),
  stoke: z.number().or(z.string()),
  name: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string()),
  thumbnail: z.string(),
  colors: z.array(z.number()),
  categories: z.array(z.number()),
  sizes: z.array(z.number()),
  collectionId: z.number().optional(),
  relatedProducts: z.array(z.number()).optional(),
});

// Define schema for OrderProduct
const OrderProductSchema = z.object({
  productId: z.number(),
  quantity: z.number().optional(),
  color: z.string(),
  size: z.string(),
});

// Define schema for Order
const OrderSchema = z.object({
  id: z.number().optional(), // Optional because it's generated by the database
  customerId: z.number(),
  orderDate: z.date().optional(), // Optional because it defaults to now in the database
  products: z.array(OrderProductSchema), // Optional array of OrderProduct
});

// Define the Customer schema
const CustomerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(1)
    .regex(/^\+?[0-9]\d{1,14}$/), // Assuming E.164 phone format
  address: z.string().min(1),
  email: z.string().email().optional(),
});

const SaleSliderSchema = z.object({
  id: z.number().int().optional(),
  hidden: z.boolean().optional(),
  description: z.string().min(1),
  image: z.string().url(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const WhatTheSaySchema = z.object({
  id: z.number().int().optional(),
  hidden: z.boolean().optional(),
  name: z.string().min(1),
  message: z.string().min(1),
  image: z.string().url(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserLoginSchema = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});

const SignupSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
  confirmPassword: z.string(),
  otp: z.string(),
});

const HeroSectionSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  products: z.array(z.number()),
  mainProduct: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const ContactSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  phone: z.string(),
  message: z.string(),
  isRead: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const OurInfoSchema = z.object({
  id: z.number().optional(),
  phone: z.string(),
  email: z.string(),
  whatsApp: z.string(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  x: z.string().optional(),
  tiktok: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Contact = z.infer<typeof ContactSchema>;

type OurInfo = z.infer<typeof OurInfoSchema>;

type HeroSection = z.infer<typeof HeroSectionSchema>;

type Signup = z.infer<typeof SignupSchema>;

type UserLogin = z.infer<typeof UserLoginSchema>;

type WhatTheSay = z.infer<typeof WhatTheSaySchema>;

type SaleSlider = z.infer<typeof SaleSliderSchema>;

type Product = z.infer<typeof ProductSchema>;

type Color = z.infer<typeof ColorSchema>;

type Category = z.infer<typeof CategorySchema>;

type Size = z.infer<typeof SizeSchema>;

type Collection = z.infer<typeof CollectionSchema>;

type OrderProduct = z.infer<typeof OrderProductSchema>;

type Order = z.infer<typeof OrderSchema>;

type CustomerType = z.infer<typeof CustomerSchema>;

export {
  SignupSchema,
  ProductSchema,
  ColorSchema,
  CategorySchema,
  SizeSchema,
  CollectionSchema,
  OrderProductSchema,
  OrderSchema,
  CustomerSchema,
  SaleSliderSchema,
  WhatTheSaySchema,
  HeroSectionSchema,
  ContactSchema,
  OurInfoSchema,
  type Contact,
  type OurInfo,
  type Signup,
  type UserLogin,
  type WhatTheSay,
  type Product,
  type Color,
  type Category,
  type Size,
  type Collection,
  type OrderProduct,
  type Order,
  type CustomerType,
  type SaleSlider,
  type HeroSection,
};
