import { getAllOrders } from "@/actions/order";
import OrdersList from "@/views/admin/orders";
import React from "react";

type Props = {};

export default async function OrdersPage({}: Props) {
  const data = (await getAllOrders()) as any;
  return <OrdersList data={data} />;
}
