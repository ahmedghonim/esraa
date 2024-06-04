"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import { EsraLink } from "@/components/ui";
import SaleRow from "./sale-row";
import { useTranslations } from "next-intl";
import { Product } from "@prisma/client";

type Props = { data: Product[] };

export default function SaleList({ data }: Props) {
  const t = useTranslations("common");

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">
          {t("sale_list:")}
        </h1>

        <EsraLink
          name={t("add_", {
            key: t("sale_slider"),
          })}
          className="text-white py-2 px-6 bg-primary-100 rounded-sm w-fit"
          href="/dashboard/sale/add"
        />
      </div>
      {/* categories list */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("image")}
            </TableHead>

            <TableHead className="!text-white text-center w-[220px]">
              {t("description")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("is_active")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((product: any, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <SaleRow {...product} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
