"use client";
import { Trash2, Edit, RefreshCw } from "lucide-react";
import { Collection, CollectionSchema } from "@/schema";
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

const CollectionForm = ({ collection }: { collection: Collection[] }) => {
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const router = useRouter();
  const form = useForm<Collection>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      id: undefined,
    },
  });

  const onSubmit = (values: Collection) => {
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
          toast.success("collection deleted successfully");
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
            className="bg-primary-100 text-white p-2 rounded-sm"
            name={
              <span className="flex items-center gap-2">
                <RefreshCw className="size-4" />
                <span>{t("reset")}</span>
              </span>
            }
          />
          {collection.map((collection) => (
            <div
              key={collection.id}
              className="flex gap-3 items-center justify-center py-2 px-3  border border-primary-100 rounded-sm"
            >
              <Edit
                className="cursor-pointer text-blue-500"
                onClick={() => {
                  form.setValue("id", collection.id);
                  form.setValue("name", collection.name);
                }}
              />

              <Text>{collection.name}</Text>

              <Trash2
                className="cursor-pointer text-red-500"
                onClick={() => {
                  form.setValue("id", collection.id);
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

export default CollectionForm;
