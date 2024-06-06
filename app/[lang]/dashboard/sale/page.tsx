import { getAllSaleSliders } from "@/actions/slae";
import SaleList from "@/views/admin/sale";
import React from "react";

export default async function ProductsPage() {
  const data = (await getAllSaleSliders({})) as any;

  return <SaleList data={data} />;
}
