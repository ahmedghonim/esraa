import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React, { useTransition } from "react";
import OrderRow from "./order-row";
import { useTranslations } from "next-intl";
import { Order } from "@/schema";
import { CSVLink } from "react-csv";
import Csv from "./csv";

type Props = {
  data: Order[];
};

export default function OrdersList({ data }: Props) {
  const t = useTranslations("common");

  const csvData = data
    .map((order: any) => {
      return {
        name: order.customer.name,
        phone: order.customer.phone,
        address: order.customer.address,
        data: order.createdAt,
        products: order.products
          .map(
            ({ product, size, quantity, color }: any, index: any) =>
              `${index + 1} - ${product.price} ${
                product.name
              } - ${quantity} - ${size} - ${color}`
          )
          .join(", \n"),
      };
    })
    .filter((order) => order !== null);

  return (
    <section>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-primary-100 mb-8 font-bold text-3xl">
          {t("orders_list")}:
        </h1>
        <Csv data={csvData} />
      </div>
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center min-w-[50px] w-fit">
              #
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("name")}
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("phone")}
            </TableHead>

            <TableHead className="!text-white text-center !w-[250px]">
              {t("address")}
            </TableHead>
            <TableHead className="!text-white text-center !w-[250px]">
              {t("date")}
            </TableHead>
            <TableHead className="!text-white text-center !w-[250px]">
              {t("products")}
            </TableHead>
            <TableHead className="!text-white text-center !w-[250px]">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <OrderRow data={order} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
