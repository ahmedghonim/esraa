"use client";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import { Color, ColorSchema } from "@/schema";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormInput from "@/components/ui/form-input";
import { deleteColor, upsertColor } from "@/actions/color";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ColorForm = ({ colors }: { colors: Color[] }) => {
  const { toast } = useToast();
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const router = useRouter();
  const form = useForm<Color>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      id: undefined,
    },
  });

  const onSubmit = (values: Color) => {
    startTransaction(() => {
      upsertColor(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Color saved successfully",
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
      deleteColor(form.getValues("id") || 0)
        .then(() => {
          toast({
            title: "Color deleted successfully",
            description: "Color deleted successfully",
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
            key: t("color"),
          })}
        </Text>

        <div className="flex flex-wrap gap-3">
          <EsraButton
            onClick={() => {
              form.setValue("id", undefined);
              form.setValue("name", "");
              router.refresh();
              form.reset();
            }}
            className="bg-primary-100 text-white p-2 rounded-sm"
            name={
              <span className="flex items-center gap-2">
                <RefreshCw className="size-4" />
                <span>{t("reset")}</span>
              </span>
            }
          />
          {colors.map((color) => (
            <div
              key={color.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <span
                style={{
                  backgroundColor: color.hexCode,
                }}
                className="size-6"
              />

              <Text>{color.name}</Text>
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", color.id);
                  form.setValue("name", color.name);
                  form.setValue("hexCode", color.hexCode);
                }}
              />

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", color.id);
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

        <FormInput form={form} label={t("name")} name="name" />
        <label className="flex flex-col gap-2">
          {t("color")}
          <input
            type="color"
            {...form.register("hexCode")}
            value={form.getValues("hexCode") || "#000000"}
            className="size-16"
          />
        </label>

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

export default ColorForm;
