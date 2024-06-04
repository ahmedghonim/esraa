import { getAllProducts } from "@/actions/product";
import ProductsList from "@/views/admin/products";
import React from "react";

export default async function ProductsPage() {
  const data = (await getAllProducts()) as any;

  return <ProductsList data={data} />;
}
