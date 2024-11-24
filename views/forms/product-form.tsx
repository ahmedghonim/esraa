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
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productUpsert } from "@/actions/product";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import FormSelect from "@/components/ui/form-select";
import { useToast } from "@/components/ui/use-toast";
import FormEditor from "@/components/ui/form-editor";
import UploadImage from "@/components/ui/upload-image";

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
      newArrival: false,
    },
    values: {
      ...values,
      categories: values?.categories?.map((item: any) => item.id),
      collectionId: values?.collectionId || null,
      relatedProducts: values?.products?.map((item: any) => item.id),
      variants:
        values?.ProductVariant?.map((variant: any) => ({
          ...variant,
          colorId: variant.color.id,
          sizeId: variant.size.id,
        })) || [],
    },
  });

  const { append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    // @ts-ignore
    name: "variants",
  });
  const onSubmit = () => {
    const values = form.getValues();
    const formattedValues = {
      ...values,
      price: Number(values.price),
      // @ts-ignore
      productVariant: values?.variants?.map((variant: any) => ({
        ...variant,
        stock: Number(variant.stock),
      })),
    };

    startTransaction(() => {
      productUpsert(formattedValues)
        .then(() => {
          toast({
            title: "Saved successfully",
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

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name ||
            t("new_", {
              key: t("product"),
            })}
        </Text>

        <UploadImage
          className="w-full min-h-[350px]"
          label={t("thumbnail")}
          name="thumbnail"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
          {form.getValues("images")?.map((_image, index) => (
            <div className="flex-1 w-full flex flex-col gap-2" key={index}>
              <UploadImage
                className="w-full min-h-[350px]"
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
                    const newImages = images.filter((image) => image);

                    form.setValue("images", newImages);
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

        <div className="space-y-4">
          {/*  @ts-ignore */}
          {form.getValues("variants")?.map((variant, index) => (
            <div
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full "
              key={index}
            >
              <FormSelect
                form={form}
                label={t("color")}
                name={`variants[${index}].colorId`}
                options={color.map((c) => ({ value: c.id, label: c.name }))}
              />
              <FormSelect
                form={form}
                label={t("size")}
                name={`variants[${index}].sizeId`}
                options={sizes.map((s) => ({ value: s.id, label: s.name }))}
              />
              <FormInput
                form={form}
                label={t("stock")}
                name={`variants[${index}].stock`}
                type="number"
              />
              <EsraButton
                className="bg-red-500 text-white p-2 rounded-sm text-center !mt-auto h-fit"
                onClick={() => {
                  removeVariant(index);
                }}
                name={
                  <span className="flex items-center gap-2 justify-center">
                    {t("remove")} {t("variant")}
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
            appendVariant({
              colorId: null,
              sizeId: null,
              stock: 0,
            } as any);
          }}
          name={t("add_", {
            key: t("variant"),
          })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
          <FormInput form={form} label={t("name")} name="name" />
          <FormInput
            form={form}
            label={t("price")}
            name="price"
            type="number"
          />
          <FormInput
            form={form}
            label={t("new_price")}
            name="newPrice"
            type="number"
          />
          <div className="flex gap-4 items-center">
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

        <FormEditor form={form} label={t("description")} name="description" />

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
