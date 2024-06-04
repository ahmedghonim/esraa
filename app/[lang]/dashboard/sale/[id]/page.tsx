import React from "react";
import SaleForm from "@/views/forms/sale-form";
import { getSaleSliderById } from "@/actions/slae";

async function Page({ params: { id } }: { params: { id: string } }) {
  const values = id === "add" ? {} : ((await getSaleSliderById(+id)) as any);

  return <SaleForm values={values} />;
}

export default Page;
