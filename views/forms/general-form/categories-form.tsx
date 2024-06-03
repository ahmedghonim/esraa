"use client";
import { Edit, Trash2 } from "lucide-react";
import { Category, CategorySchema } from "@/schema";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { upsertCategory, deleteCategory } from "@/actions/category";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormInput from "@/components/ui/form-input";

const CategoriesForm = ({ category }: { category: Category[] }) => {
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
      deleteCategory(form.getValues("id"))
        .then(() => {
          toast.success("Category deleted successfully");
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
            key: t("category"),
          })}
        </Text>

        <div className="flex flex-wrap gap-3">
          <EsraButton
            onClick={() => {
              form.reset();
            }}
            name={t("reset")}
          />
          {category.map((category) => (
            <div
              key={category.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", category.id);
                  form.setValue("name", category.name);
                }}
              />

              <Text>{category.name}</Text>
              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", category.id);
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
          name={t("save")}
        />
      </div>
    </Form>
  );
};

export default CategoriesForm;
