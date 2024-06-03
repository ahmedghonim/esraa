import React from "react";
import { getAllColors } from "@/actions/color";
import { getAllProducts, getProductById } from "@/actions/product";
import { getAllCategories } from "@/actions/category";
import { getAllSizes } from "@/actions/size";
import ProductForm from "@/views/forms/product-form";
import { getAllCollections } from "@/actions/collection";

async function Page({ params: { id } }: { params: { id: string } }) {
  const values = id === "new" ? {} : ((await getProductById(+id)) as any);
  const products = (await getAllProducts()) as any;
  const color = await getAllColors();
  const category = await getAllCategories();
  const collection = await getAllCollections();
  const sizes = await getAllSizes();
  return (
    <ProductForm
      values={values}
      color={color}
      category={category}
      sizes={sizes}
      products={products}
      collection={collection}
    />
  );
}

export default Page;
