"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import { EsraLink } from "@/components/ui";
import ProductRow from "./product-row";
import { useTranslations } from "next-intl";
import { Product } from "@prisma/client";

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
            <TableHead className="!text-white text-center w-[200px]">
              {t("product")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[70px]">
              {t("sizes")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px]">
              {t("colors")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px]">
              {t("stock")}
            </TableHead>

            <TableHead className="!text-white text-center !max-w-[200px]">
              {t("description")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px]">
              {t("price")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px]">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((product: any, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <ProductRow {...product} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
