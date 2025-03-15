"use client";
import { upsertCustomer } from "@/actions/customer";
import { onMailer } from "@/actions/mailer";
import { createOrder } from "@/actions/order";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import { useToast } from "@/components/ui/use-toast";
import { CustomerSchema, CustomerType, OrderProduct } from "@/schema";
import { useRouter } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useCartActions } from "../shopper/cart/helpers/useCartActions";

type Props = {};

export default function ConfirmOrder({}: Props) {
  const { items, clearCart } = useCartActions();

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
          const products: OrderProduct[] = items.map((item) => ({
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
                    <p>City: ${values.city}</p>
                    <p>Country: ${values.country}</p>
                    <p>Floor No: ${values.floor_no}</p>
                    <p>Building No: ${values.build_no}</p>
                    <p>Details: ${values.details}</p>
                 `,
              });
              toast({
                title: t("success"),
                description: t("order_placed_successfully"),
              });
              clearCart();
              router.push("/");
            })
            .catch((error) => {
              console.log("🚀 ~ .then ~ error:", error);
              toast({
                title: t("error"),
                description: error.message || t("something_went_wrong"),
              });
            });
        })
        .catch((error) => {
          console.log("🚀 ~ startTransaction ~ error:", error);
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
      <FormInput form={form} name="city" label={t("city")} />
      <FormInput form={form} name="country" label={t("country")} />
      <FormInput form={form} name="build_no" label={t("build_no")} />
      <FormInput form={form} name="floor_no" label={t("floor_no")} />
      <FormTextArea form={form} name="details" label={t("details")} />

      <EsraButton
        name={t("order_now")}
        className="w-full p-2 text-white"
        onClick={form.handleSubmit(onSubmit)}
        isLoading={isPending}
      />
    </Form>
  );
}
