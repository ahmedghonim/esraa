"use client";
import { SaleSlider, SaleSliderSchema } from "@/schema";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormUpload from "@/components/ui/form-upload";
import { useToast } from "@/components/ui/use-toast";
import { upsertSaleSlider } from "@/actions/slae";
import FormEditor from "@/components/ui/form-editor";

const SaleForm = ({ values }: { values: any }) => {
  const t = useTranslations("common");
  const { toast } = useToast();
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const form = useForm<SaleSlider>({
    resolver: zodResolver(SaleSliderSchema),
    defaultValues: {
      id: undefined,
    },
    values,
  });

  const onSubmit = (values: SaleSlider) => {
    startTransaction(() => {
      upsertSaleSlider(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Sale Slider saved successfully",
          });
          router.push("/dashboard/sale");
          router.refresh();
          form.reset();
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name ||
            t("new_", {
              key: t("sale_slider"),
            })}
        </Text>

        <FormUpload
          className="w-full min-h-[350px]"
          form={form}
          label={t("image")}
          name="image"
        />

        <FormEditor form={form} label={t("description")} name="description" />

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
};

export default SaleForm;
