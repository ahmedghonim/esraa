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
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productUpsert, productDelete } from "@/actions/product";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormUpload from "@/components/ui/form-upload";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import FormSelect from "@/components/ui/form-select";
import { useToast } from "@/components/ui/use-toast";

const ProductForm = ({
  values,
  color,
  category,
  sizes,
  products,
  collection,
}: {
  values: any;
  color: Color[];
  category: Category[];
  sizes: Size[];
  products: Product[];
  collection: Collection[];
}) => {
  const t = useTranslations("common");
  const { toast } = useToast();
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: undefined,
      stoke: 1,
      newArrival: false,
    },
    values: {
      ...values,
      categories: values?.categories?.map((item: any) => item.id),
      colors: values?.colors?.map((item: any) => item.id),
      sizes: values?.sizes?.map((item: any) => item.id),
      relatedProducts: values?.products?.map((item: any) => item.id),
    },
  });

  const onSubmit = (values: Product) => {
    startTransaction(() => {
      productUpsert(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "Product saved successfully",
          });
          router.push("/dashboard/products");
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
  console.log("form.watch() >>>> ", form.watch());
  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name ||
            t("new_", {
              key: t("product"),
            })}
        </Text>

        <FormUpload
          className="w-full min-h-[350px]"
          form={form}
          label={t("thumbnail")}
          name="thumbnail"
        />

        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
          {form.getValues("images")?.map((_phone, index) => (
            <div className="flex-1 w-full flex flex-col gap-2" key={index}>
              <FormUpload
                className="w-full min-h-[350px]"
                form={form}
                label={t("images") + " " + (+index + 1)}
                name={`images[${index}]`}
                hideDelete
              />
              <EsraButton
                className="bg-red-500 text-white p-2 rounded-sm text-center mt-5"
                onClick={() => {
                  startTransaction(() => {
                    form.setValue(`images[${index}]` as any, "");

                    const images = form.getValues("images");
                    const newPhones = images
                      .filter((images, i) => images !== "")
                      .filter((images) => images);

                    form.setValue("images", newPhones);
                  });
                }}
                name={
                  <span className="flex items-center gap-2 justify-center">
                    {t("remove")} {t("image")}
                    <Trash2 />
                  </span>
                }
              />
            </div>
          ))}
        </div>

        <EsraButton
          className="bg-primary-100 text-white p-2 rounded-sm"
          isLoading={isPending}
          onClick={() => {
            startTransaction(() =>
              form.setValue(
                `images[${form.getValues("images")?.length || 0}]` as any,
                ""
              )
            );
          }}
          name={t("add_", {
            key: t("images"),
          })}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <FormInput form={form} label={t("name")} name="name" />
          <FormInput
            form={form}
            label={t("price")}
            name="price"
            type="number"
          />
          <div className="flex gap-4 items-center">
            <FormInput
              form={form}
              label={t("stoke")}
              name="stoke"
              type="number"
            />
            <FormInput
              form={form}
              label={t("is_new_arrival")}
              name="newArrival"
              type="checkbox"
              className="w-24 items-end text-end justify-end me-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <FormSelect
            options={collection.map((item: any) => ({
              value: item.id,
              label: item?.name,
            }))}
            form={form}
            label={t("collection")}
            name="collectionId"
          />

          <FormSelect
            isMulti
            options={category.map((item) => ({
              value: item.id,
              label: item?.name,
            }))}
            form={form}
            label={t("categories")}
            name="categories"
          />

          <FormSelect
            isMulti
            options={color.map((item) => ({
              value: item.id,
              label: item?.name,
            }))}
            form={form}
            label={t("color")}
            name="colors"
          />

          <FormSelect
            isMulti
            options={sizes.map((item) => ({
              value: item.id,
              label: item?.name,
            }))}
            form={form}
            label={t("sizes")}
            name="sizes"
          />
        </div>

        <FormSelect
          isMulti
          options={products.map((item) => ({
            value: item.id,
            label: item?.name,
          }))}
          form={form}
          label={t("related_products")}
          name="relatedProducts"
        />

        <FormTextArea form={form} label={t("description")} name="description" />

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
