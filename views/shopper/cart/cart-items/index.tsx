import React from "react";
import SingleCartItem from "./single-cart-item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import { useCartActions } from "../helpers/useCartActions";
import { TCart } from "../../local-cart";

const dummyData = [
  {
    image: "/category.png",
    name: "tailored stretch",
    size: "M",
    color: "#8434E1",
    qty: 10,
    total: 3000,
    subTotal: 3900,
  },
  {
    image: "/category.png",
    name: "tailored stretch",
    size: "M",
    color: "#8434E1",
    qty: 10,
    total: 3000,
    subTotal: 3900,
  },
  {
    image: "/category.png",
    name: "tailored stretch",
    size: "M",
    color: "#8434E1",
    qty: 10,
    total: 3000,
    subTotal: 3900,
  },
  {
    image: "/category.png",
    name: "tailored stretch",
    size: "M",
    color: "#8434E1",
    qty: 10,
    total: 3000,
    subTotal: 3900,
  },
  {
    image: "/category.png",
    name: "tailored stretch",
    size: "M",
    color: "#8434E1",
    qty: 10,
    total: 3000,
    subTotal: 3900,
  },
];

interface Props {
  cart: TCart;
  onDeleteItem: (index: number) => void;
  onChangeQty: (id: number, type: "inc" | "dec") => void;
}

export default function CartItems({ cart, onDeleteItem, onChangeQty }: Props) {
  return (
    <section className="flex flex-col mt-8">
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white min-w-[250px] w-fit">
              Product
            </TableHead>
            <TableHead className="!text-white min-w-[220px] w-fit">
              Qty
            </TableHead>
            <TableHead className="!text-white min-w-[120px] w-fit">
              Price
            </TableHead>
            <TableHead className="!text-white min-w-[120px] w-fit">
              Sub Total
            </TableHead>
            <TableHead className="!text-white w-fit">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items?.map((product, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <SingleCartItem
                {...product}
                onDeleteItem={() => onDeleteItem(index)}
                onDecrease={() => onChangeQty(product.id, "dec")}
                onIncrease={() => onChangeQty(product.id, "inc")}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
