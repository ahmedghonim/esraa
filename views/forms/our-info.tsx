"use client";

import { upsertOurInfo } from "@/actions/our-info";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { useToast } from "@/components/ui/use-toast";
import { OurInfo, OurInfoSchema } from "@/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

function OurInfoForm({ values }: { values: OurInfo }) {
  const { toast } = useToast();
  const t = useTranslations("common");

  const [isPending, startTransaction] = useTransition();
  const form = useForm<OurInfo>({
    resolver: zodResolver(OurInfoSchema),
    defaultValues: {
      id: undefined,
    },
    values,
  });
  const onSubmit = async (values: OurInfo) => {
    startTransaction(() => {
      upsertOurInfo(values)
        .then(() => {
          toast({
            title: t("success"),
            description: t("info_updated"),
          });
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
      <div className="flex flex-col gap-6">
        <FormInput form={form} name="phone" label={t("phone")} type="tel" />
        <FormInput
          form={form}
          name="whatsApp"
          label={t("whatsApp")}
          type="tel"
        />
        <FormInput form={form} name="email" label={t("email")} type="email" />
        <FormInput form={form} name="facebook" label={t("facebook")} />
        <FormInput form={form} name="instagram" label={t("instagram")} />
        <FormInput form={form} name="x" label={t("x")} />
        <FormInput form={form} name="tiktok" label={t("tiktok")} />

        <EsraButton
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="bg-primary-100 text-white p-2 rounded-sm"
          name={t("save")}
        />
      </div>
    </Form>
  );
}

export default OurInfoForm;
