import { getAllProducts } from "@/actions/product";
import ProductsList from "@/views/admin/products";
import React from "react";

type Props = {};

export default async function ProductsPage() {
  const data = await getAllProducts();
  return <ProductsList data={data} />;
}
