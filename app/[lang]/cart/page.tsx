import { getOurInfo } from "@/actions/our-info";
import Cart from "@/views/shopper/cart";
import React from "react";

type Props = {};

export default async function CartPage({}: Props) {
  const data = await getOurInfo();

  return <Cart shipping={data?.shipping || 0} />;
}
