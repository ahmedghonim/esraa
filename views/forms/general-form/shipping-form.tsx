"use client";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import { Shipping, ShippingSchema } from "@/schema";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormInput from "@/components/ui/form-input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { deleteShipping, upsertShipping } from "@/actions/shipping";

const ShippingForm = ({ shipping }: { shipping: Shipping[] }) => {
  const { toast } = useToast();
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const router = useRouter();
  const form = useForm<Shipping>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      id: undefined,
    },
  });

  const onSubmit = (values: Shipping) => {
    startTransaction(() => {
      upsertShipping(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Shipping saved successfully",
          });
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

  const onDelete = () => {
    startTransaction(() => {
      deleteShipping(form.getValues("id") || 0)
        .then(() => {
          toast({
            title: "Shipping deleted successfully",
            description: "Shipping deleted successfully",
          });
          router.refresh();
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
          {t("section_", {
            key: t("shipping"),
          })}
        </Text>

        <div className="flex flex-wrap gap-3">
          {shipping?.map((shipping) => (
            <div
              key={shipping.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <Text>
                {shipping.city} - ${shipping.price}
              </Text>

              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", shipping.id);
                  form.setValue("city", shipping.city);
                  form.setValue("price", shipping.price);
                }}
              />

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", shipping.id);
                  toast({
                    title: "Are you sure?",
                    description: "This action is irreversible",

                    action: (
                      <ToastAction altText="Delete" onClick={onDelete}>
                        {t("delete")}
                      </ToastAction>
                    ),
                  });
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-10 w-full">
          <FormInput form={form} label={t("city")} name="city" className="w-full"/>

          <FormInput
            form={form}
            label={t("price")}
            name="price"
            type="number"
            className="w-24 items-end text-end justify-end me-auto"
          />
        </div>

        <EsraButton
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="bg-primary-100 text-white p-2 rounded-sm px-4"
          name={t("save")}
        />
      </div>
    </Form>
  );
};

export default ShippingForm;
