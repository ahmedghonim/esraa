import { Link } from "@/utils/navigation";

import React from "react";

interface Props {
  name: string;
  phone: string;
  address: string;
  price: number;
  products: TProduct[];
  index: number;
}

export default function OrderRow({
  name,
  phone,
  address,
  price,
  products,
  index,
}: Props) {
  return (
    <>
      <td className="py-4 text-center">{index + 1}</td>
      <td className="py-4 text-center">{name}</td>

      <td className="py-4 text-center">
        <Link href={`tel:${phone}`}>{phone}</Link>
      </td>

      <td className="text-primary-100 font-medium py-4 text-center ">
        <address>{address}</address>
      </td>

      <td className="text-primary-100 font-medium py-4 text-center ">
        {products.map((product, index, arr) =>
          index < arr.length - 1 ? ` ${product.name} - ` : product.name
        )}
      </td>

      <td className="text-primary-100 font-medium py-4 text-center ">
        {Number(price).toLocaleString()} LE
      </td>
    </>
  );
}
