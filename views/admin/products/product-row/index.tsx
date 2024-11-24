"use client";
import React, { useTransition } from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EsraButton } from "@/components/ui";
import parser from "html-react-parser";
import Image from "next/image";
import { Color, Product, Size, ProductVariant } from "@prisma/client";
import { Link, useRouter } from "@/utils/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTranslations } from "use-intl";
import { productDelete } from "@/actions/product";
import { cn } from "@/lib/utils";

interface Props extends Product {
  ProductVariant: {
    size: Size;
    color: Color;
    stock: number;
  }[];
}

export default function ProductRow({
  name,
  thumbnail,
  price,
  newPrice,
  description,
  ProductVariant,
  id,
}: Props) {
  const { toast } = useToast();
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  const onDelete = (id: number) => {
    startTransaction(() => {
      productDelete(id)
        .then(() => {
          toast({
            title: "Deleted",
            description: "Product deleted successfully",
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
    <>
      <td className="py-4 w-[100px]">
        <div>
          <div className="flex flex-col my-auto justify-start items-center">
            <Image
              src={thumbnail}
              width={100}
              height={100}
              alt="product image"
            />
            <span className="text-lg font-bold leading-6 capitalize text-zinc-800">
              {name}
            </span>
          </div>
        </div>
      </td>

      {/* Table for Color, Size, Stock */}
      <td className="w-[200px] ">
        <table className="w-full border-0">
          <thead>
            <tr>
              <th className="text-center">{t("color")}</th>
              <th className="text-center">{t("size")}</th>
              <th className="text-center">{t("stock")}</th>
            </tr>
          </thead>
          <tbody>
            {ProductVariant?.map(({ size, color, stock }, index) => (
              <tr key={index}>
                <td className="text-center">
                  {color.hexCode === "multi_color" ? (
                    <Image
                      className="shrink-0 h-5 w-5 mx-auto my-0"
                      alt="WhatsApp Image 2024-10-20 at 12.39.39 PM.jpeg"
                      width={10}
                      height={10}
                      src="/WhatsApp Image 2024-10-20 at 12.39.39 PM.jpeg"
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: color.hexCode,
                      }}
                      className=" h-5 w-5 mx-auto"
                    />
                  )}
                </td>
                <td className="text-center">{size.name}</td>
                <td
                  className={cn("text-center", {
                    "text-red-500": stock < 10,
                    "text-green-500": stock >= 10,
                  })}
                >
                  {stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>

      <td className="py-4 !w-[400px] overflow-hidden">{parser(description)}</td>

      <td className="py-4 text-center ">
        <span
          className={cn("", {
            "line-through text-red-500 p-2": newPrice,
          })}
        >
          {Number(price).toLocaleString()} {t("LE")} <br />
        </span>
        {newPrice && Number(newPrice).toLocaleString()} {t("LE")}
      </td>

      <td className="py-4">
        <div className="flex justify-center items-center gap-4">
          <Link href={"/dashboard/products/" + id}>
            <Edit className="size-5" />
          </Link>

          <EsraButton
            className="bg-transparent"
            name={<Delete />}
            onClick={() => {
              toast({
                title: "Are you sure?",
                description: "This action is irreversible",
                action: (
                  <ToastAction altText="Delete" onClick={() => onDelete(id)}>
                    {t("delete")}
                  </ToastAction>
                ),
              });
            }}
          />
        </div>
      </td>
    </>
  );
}
