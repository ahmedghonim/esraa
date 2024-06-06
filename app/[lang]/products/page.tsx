import { getAllCategories } from "@/actions/category";
import { getAllCollections } from "@/actions/collection";
import { getAllColors } from "@/actions/color";
import { getAllProducts } from "@/actions/product";
import { getAllSizes } from "@/actions/size";
import Filter from "@/views/shopper/products/filter";
import ProductsList from "@/views/shopper/products/products-list";
import React from "react";

type Props = {};

export default async function ProductsPage({}: Props) {
  const data = (await getAllProducts()) as any;
  const color = await getAllColors();
  const category = await getAllCategories({});
  const collection = await getAllCollections();
  const sizes = await getAllSizes();
  return (
    <main className="mt-[55px] grid grid-cols-12 gap-5">
      <Filter
        color={color}
        category={category}
        collection={collection}
        sizes={sizes}
      />
      <ProductsList data={data} />
    </main>
  );
}
