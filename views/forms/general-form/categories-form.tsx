"use client";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import { Category, CategorySchema } from "@/schema";
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
import { deleteCategory, upsertCategory } from "@/actions/category";
import FormUpload from "@/components/ui/form-upload";

const CategoryForm = ({ category }: { category: Category[] }) => {
  const { toast } = useToast();
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const router = useRouter();
  const form = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      id: undefined,
    },
  });

  const onSubmit = (values: Category) => {
    startTransaction(() => {
      upsertCategory(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Category saved successfully",
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
      deleteCategory(form.getValues("id") || 0)
        .then(() => {
          toast({
            title: "Category deleted successfully",
            description: "Category deleted successfully",
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
            key: t("category"),
          })}
        </Text>

        <div className="flex flex-wrap gap-3">
          <EsraButton
            onClick={() => {
              form.setValue("id", undefined);
              form.setValue("name", "");
              form.setValue("image", "");
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
          {category.map((category) => (
            <div
              key={category.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <Text>{category.name}</Text>
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", category.id);
                  form.setValue("name", category.name);
                  form.setValue("image", category.image);
                }}
              />

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", category.id);
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

        <FormUpload
          className="w-full min-h-[350px]"
          form={form}
          label={t("image")}
          name="image"
        />

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

export default CategoryForm;
