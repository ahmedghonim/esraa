import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import OrderRow from "./order-row";
import { useTranslations } from "next-intl";
import { Order } from "@/schema";
import { Customer } from "@prisma/client";

const orders = [
  {
    name: "Ahmed Fahiim",
    phone: "01154232534",
    address:
      "Test Long Addres Comming from the customer Test Long Addres Comming from the customer",
    products: [
      { id: 0, name: "Product 1" },
      { id: 0, name: "Product 2" },
      { id: 0, name: "Product 3" },
      { id: 0, name: "Product 4" },
    ],
    price: 3298,
  },

  {
    name: "Ahmed Fahiim",
    phone: "01154232534",
    address:
      "Test Long Addres Comming from the customer Test Long Addres Comming from the customer",
    products: [
      { id: 0, name: "Product 1" },
      { id: 0, name: "Product 2" },
      { id: 0, name: "Product 3" },
      { id: 0, name: "Product 4" },
    ],
    price: 3298,
  },

  {
    name: "Ahmed Fahiim",
    phone: "01154232534",
    address:
      "Test Long Addres Comming from the customer Test Long Addres Comming from the customer",
    products: [
      { id: 0, name: "Product 1" },
      { id: 0, name: "Product 2" },
      { id: 0, name: "Product 3" },
      { id: 0, name: "Product 4" },
    ],
    price: 3298,
  },

  {
    name: "Ahmed Fahiim",
    phone: "01154232534",
    address:
      "Test Long Addres Comming from the customer Test Long Addres Comming from the customer",
    products: [
      { id: 0, name: "Product 1" },
      { id: 0, name: "Product 2" },
      { id: 0, name: "Product 3" },
      { id: 0, name: "Product 4" },
    ],
    price: 3298,
  },
];

type Props = {
  data: Order[];
};

export default function OrdersList({ data }: Props) {
  const t = useTranslations("common");

  return (
    <section>
      <h1 className="text-primary-100 mb-8 font-bold text-3xl">Orders List:</h1>
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
              {t("products")}
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
