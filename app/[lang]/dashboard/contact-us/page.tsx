import { getAllContacts } from "@/actions/contact";
import ContactUSList from "@/views/admin/contact-us";
import OrdersList from "@/views/admin/orders";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  const data = (await getAllContacts()) as any;
  return <ContactUSList data={data} />;
}
