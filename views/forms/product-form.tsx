"use client";
import { Trash2 } from "lucide-react";
import {
  Product,
  Color,
  Category,
  Size,
  ProductSchema,
  Collection,
} from "@/schema";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { productUpsert, productDelete } from "@/actions/product";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormUpload from "@/components/ui/form-upload";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import FormSelect from "@/components/ui/form-select";

const ProductForm = ({
  values,
  color,
  category,
  sizes,
  products,
  collection,
}: {
  values: Product;
  color: Color[];
  category: Category[];
  sizes: Size[];
  products: Product[];
  collection: Collection[];
}) => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: undefined,
    },
    values,
  });

  const onSubmit = (values: Product) => {
    startTransaction(() => {
      productUpsert(values)
        .then(() => {
          toast.success("updated successfully");
          router.push("/dashboard/our-blog");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  const onDelete = () => {
    startTransaction(() => {
      productDelete(values.id || 0)
        .then(() => {
          toast.success("updated successfully");
          router.push("/dashboard/our-blog");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };
  console.log("form.s >>>> ", form.watch());
  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name && <EsraButton onClick={onDelete} name={<Trash2 />} />}
          {values?.name ||
            t("new_", {
              key: t("product"),
            })}
        </Text>

        <FormUpload
          className="w-full min-h-[350px]"
          form={form}
          label={t("image")}
          name="image"
        />

        <FormInput form={form} label={t("name")} name="name" />

        <FormTextArea form={form} label={t("description")} name="description" />

        <FormSelect
          options={category.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("category")}
          name="category"
        />

        <FormSelect
          options={color.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("color")}
          name="colors"
        />
        <FormSelect
          options={sizes.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("sizes")}
          name="sizes"
        />
        <FormSelect
          options={products.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("collection")}
          name="collection"
        />
        <FormSelect
          options={products.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("related_products")}
          name="products"
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
};

export default ProductForm;
