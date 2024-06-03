"use client";
import { Edit, Trash2 } from "lucide-react";
import { Size, SizeSchema } from "@/schema";
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
import { deleteCollection, upsertCollection } from "@/actions/collection";
import { cn } from "@/lib/utils";

const SizeForm = ({ size }: { size: Size[] }) => {
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const router = useRouter();
  const form = useForm<Size>({
    resolver: zodResolver(SizeSchema),
    defaultValues: {
      id: undefined,
    },
  });

  const onSubmit = (values: Size) => {
    startTransaction(() => {
      upsertCollection(values)
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
      deleteCollection(form.getValues("id") || 0)
        .then(() => {
          toast.success("Size deleted successfully");
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
          {size.map((size) => (
            <div
              key={size.id}
              className={cn(
                "flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm",
                {
                  "bg-red-500": form.watch("id") === size.id,
                }
              )}
            >
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", size.id);
                  form.setValue("name", size.name);
                }}
              />

              <Text>{size.name}</Text>

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", size.id);
                  onDelete();
                }}
              />
            </div>
          ))}
        </div>

        <FormInput form={form} label={t("name")} name="name" />

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

export default SizeForm;
