"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import { EsraLink } from "@/components/ui";
import ProductRow from "./product-row";
import { useTranslations } from "next-intl";
import { Product } from "@prisma/client";

const products = [
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
];

type Props = { data: Product[] };

export default function ProductsList({ data }: Props) {
  const t = useTranslations("common");
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">
          {t("products_list:")}
        </h1>

        <EsraLink
          name="Add Product"
          className="text-white py-2 px-6 bg-primary-100 rounded-sm w-fit"
          href="/dashboard/products/add"
        />
      </div>
      {/* categories list */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("product")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("sizes")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("colors")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("stock")}
            </TableHead>

            <TableHead className="!text-white text-center w-[220px]">
              {t("description")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("price")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <ProductRow
                {...product}
                // onDelete={()=>{}}
                // onEdit={() => onEditProduct(product as any)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
