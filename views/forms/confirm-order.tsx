"use client";
import { createOrder } from "@/actions/order";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import { useToast } from "@/components/ui/use-toast";
import { ConfirmOrderSchema } from "@/schema";
import { useRouter } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function ConfirmOrder({}: Props) {
  const { toast } = useToast();

  const t = useTranslations("common");

  const router = useRouter();

  const [isPending, startTransaction] = useTransition();

  const form = useForm<{}>({
    resolver: zodResolver(ConfirmOrderSchema),
  });

  const onSubmit = async (values: ConfirmOrder) => {
    startTransaction(() => {
      createOrder(values)
        .then(() => {
          toast({
            title: t("success"),
            description: t("Message sent successfully"),
          });
          router.refresh();
          form.reset();
        })
        .catch((error) => {
          toast({
            title: t("error"),
            description: error.message,
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
    </Form>
  );
}
