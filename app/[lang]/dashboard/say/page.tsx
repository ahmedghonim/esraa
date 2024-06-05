import { getAllProducts } from "@/actions/product";
import { getAllWhatTheSays } from "@/actions/whatStay";
import ProductsList from "@/views/admin/products";
import SayList from "@/views/admin/say";
import React from "react";

export default async function ProductsPage() {
  const data = (await getAllWhatTheSays()) as any;

  return <SayList data={data} />;
}
