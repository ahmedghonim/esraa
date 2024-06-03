import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import OrderRow from "./order-row";

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

type Props = {};

export default function OrdersList({}: Props) {
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
              Name
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Phone
            </TableHead>

            <TableHead className="!text-white text-center !w-[250px]">
              Address
            </TableHead>
            <TableHead className="!text-white text-center !w-[250px]">
              Products
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Order Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <OrderRow {...order} index={index} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
