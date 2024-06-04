"use client";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import { Size, SizeSchema } from "@/schema";
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
import { deleteSize, upsertSize } from "@/actions/size";

const SizeForm = ({ sizes }: { sizes: Size[] }) => {
  const { toast } = useToast();
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
      upsertSize(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Size saved successfully",
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
      deleteSize(form.getValues("id") || 0)
        .then(() => {
          toast({
            title: "Size deleted successfully",
            description: "Size deleted successfully",
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
            key: t("size"),
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
          {sizes.map((color) => (
            <div
              key={color.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <Text>{color.name}</Text>
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", color.id);
                  form.setValue("name", color.name);
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

export default SizeForm;
