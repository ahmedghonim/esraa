"use client";
import { upsertCustomer } from "@/actions/customer";
import { createOrder } from "@/actions/order";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import { useToast } from "@/components/ui/use-toast";
import { CustomerSchema, CustomerType, Order, OrderProduct } from "@/schema";

import { useRouter } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useCartActions } from "../shopper/cart/helpers/useCartActions";
import { onMailer } from "@/actions/mailer";

type Props = {};

export default function ConfirmOrder({}: Props) {
  const { cart, setCart } = useCartActions();
  const { toast } = useToast();

  const t = useTranslations("common");

  const router = useRouter();

  const [isPending, startTransaction] = useTransition();

  const form = useForm<CustomerType>({
    resolver: zodResolver(CustomerSchema),
  });

  const onSubmit = (values: CustomerType) => {
    startTransaction(() => {
      upsertCustomer(values)
        .then((customer: Customer) => {
          const products: OrderProduct[] = cart.items.map((item) => ({
            productId: +item.id,
            quantity: +item.qty,
            size: item.selected_size.name,
            colorId: item.selected_color.id,
            sizeId: item.selected_size.id,
            color: item.selected_color.name,
          }));
          createOrder({
            customerId: customer.id,
            products,
          })
            .then(async (order: any) => {
              await onMailer({
                email: customer?.email!,
                subject: "Order Confirmation",
                html: `
                   <h1>Order Confirmation</h1>
                   <p>Dear ${customer.name},</p>
                   <p>Your order with ID ${order.id} has been placed successfully.</p>
                   <p>Thank you for shopping with us!</p>
                 `,
              });
              await onMailer({
                subject: "You have a new order",
                html: `
                   <h1>New Order</h1>
                   <p>Order ID: ${order.id}</p>
                   <p>Customer: ${customer.name}</p>
                   <p>Email: ${customer.email}</p>
                   <p>Phone: ${customer.phone}</p>
                   <p>Address: ${customer.address}</p>
                 `,
              });
              toast({
                title: t("success"),
                description: t("order_placed_successfully"),
              });
              setCart({ items: [], total: 0, subTotal: 0, shipping: 0 });
              router.push("/");
            })
            .catch((error) => {
              toast({
                title: t("error"),
                description: error.message || t("something_went_wrong"),
              });
            });
        })
        .catch((error) => {
          toast({
            title: t("error"),
            description: error.message || t("something_went_wrong"),
          });
        });
    });
  };

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 gap-4">
        <FormInput form={form} name="name" label={t("fullname")} />

        <FormInput form={form} name="phone" label={t("phone")} type="tel" />

        <FormInput form={form} name="email" label={t("email")} type="email" />
      </div>
      <FormTextArea form={form} name="address" label={t("address")} />

      <EsraButton
        name={t("order_now")}
        className="w-full p-2 text-white"
        onClick={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </Form>
  );
}
