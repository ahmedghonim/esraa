import React from "react";
import { getAllColors } from "@/actions/color";
import { getAllProducts, getProductById } from "@/actions/product";
import { getAllCategories } from "@/actions/category";
import { getAllSizes } from "@/actions/size";
import ProductForm from "@/views/forms/product-form";
import { getAllCollections } from "@/actions/collection";
import { Product } from "@/schema";
import SaleForm from "@/views/forms/sale-form";
import { getSaleSliderById } from "@/actions/slae";

async function Page({ params: { id } }: { params: { id: string } }) {
  const values = id === "add" ? {} : ((await getSaleSliderById(+id)) as any);

  return <SaleForm values={values} />;
}

export default Page;
