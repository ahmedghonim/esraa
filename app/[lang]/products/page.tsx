import { getAllProducts } from "@/actions/product";
import Filter from "@/views/shopper/products/filter";
import ProductsList from "@/views/shopper/products/products-list";
import React from "react";

type Props = {};

export default async function ProductsPage({}: Props) {
  const data = (await getAllProducts()) as any;
  return (
    <main className="mt-[55px] grid grid-cols-12 gap-5">
      <Filter />
      <ProductsList data={data} />
    </main>
  );
}
