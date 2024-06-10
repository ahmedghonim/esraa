"use client";
import { upsertHeroSection } from "@/actions/heroSection";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormEditor from "@/components/ui/form-editor";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import { useToast } from "@/components/ui/use-toast";
import { HeroSection, HeroSectionSchema, Product } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

function HeroSectionForm({
  values,
  products,
}: {
  values: HeroSection;
  products: Product[];
}) {
  const { toast } = useToast();
  const t = useTranslations("common");

  const [isPending, startTransaction] = useTransition();
  const form = useForm<HeroSection>({
    resolver: zodResolver(HeroSectionSchema),
    defaultValues: {
      id: undefined,
    },
    values: {
      ...values,
      products: values?.products?.map((item: any) => item.id),
    },
  });
  const onSubmit = async (values: HeroSection) => {
    startTransaction(() => {
      upsertHeroSection(values)
        .then(() => {
          toast({
            title: t("success"),
            description: t("hero_section_updated"),
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
        <FormInput form={form} name="title" label={t("title")} />
        <FormEditor form={form} name="description" label={t("description")} />

        <FormSelect
          isMulti
          options={products.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("products")}
          name={"products"}
        />

        <FormSelect
          // @ts-ignore
          options={form?.getValues("products")?.map(
            (val: any) =>
              products
                .map((item) => ({
                  value: item.id,
                  label: item?.name,
                }))
                ?.find((option) => option.value == val) || []
          )}
          form={form}
          label={t("main_product")}
          name="mainProduct"
        />

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

export default HeroSectionForm;
