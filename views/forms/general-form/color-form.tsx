"use client";
import { Edit, Trash2 } from "lucide-react";
import { Color, ColorSchema } from "@/schema";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormInput from "@/components/ui/form-input";
import { deleteColor, upsertColor } from "@/actions/color";

const ColorForm = ({ colors }: { colors: Color[] }) => {
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
          toast.success("save successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const onDelete = () => {
    startTransaction(() => {
      deleteColor(form.getValues("id"))
        .then(() => {
          toast.success("Color deleted successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {t("section_", {
            key: t("collection"),
          })}
        </Text>

        <div className="flex flex-wrap gap-3">
          <EsraButton
            onClick={() => {
              form.reset();
            }}
            name={t("reset")}
          />
          {colors.map((color) => (
            <div
              key={color.id}
              className="flex gap-2 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <span
                style={{
                  backgroundColor: color.hexCode,
                }}
                className="size-4"
              />

              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", color.id);
                  form.setValue("name", color.name);
                  form.setValue("hexCode", color.hexCode);
                }}
              />

              <Text>{color.name}</Text>
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", color.id);
                  onDelete();
                }}
              />
            </div>
          ))}
        </div>

        <FormInput form={form} label={t("name")} name="name" />

        <input type="color" {...form.register("hexCode")} />

        <EsraButton
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          name={t("save")}
        />
      </div>
    </Form>
  );
};

export default ColorForm;
