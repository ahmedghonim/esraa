"use client";
import React, { useTransition } from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EsraButton } from "@/components/ui";
import Image from "next/image";
import { Color, Product, Size } from "@prisma/client";
import { Link, useRouter } from "@/utils/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTranslations } from "use-intl";
import { productDelete } from "@/actions/product";
import { cn } from "@/lib/utils";

interface Props extends Product {
  sizes: Size[];
  colors: Color[];
}

export default function ProductRow({
  name,
  sizes,
  colors,
  thumbnail,
  price,
  stoke,
  description,
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

      <td className="py-4 w-[200px]">
        <div className="flex justify-center flex-wrap gap-2 ">
          {sizes.map(({ name }) => (
            <span
              key={name}
              className="border border-solid border-stone-300 px-5"
            >
              {name}
            </span>
          ))}
        </div>
      </td>

      <td className="py-4 w-[20px]">
        <div className="flex flex-col items-center justify-center gap-2 flex-wrap">
          {colors.map(({ hexCode }) => (
            <div
              key={hexCode}
              className="shrink-0 h-5 w-5"
              style={{ background: hexCode }}
            />
          ))}
        </div>
      </td>

      <td
        className={cn("py-4 text-center", {
          "text-red-500": stoke < 10,
          "text-green-500": stoke > 10,
        })}
      >
        {stoke}
      </td>

      <td className="py-4 text-center text-wrap !w-[400px] overflow-hidden">
        {description}
      </td>

      <td className="py-4 text-center">
        {Number(price).toLocaleString()} {t("LE")}
      </td>

      <td className="py-4">
        <div className="flex justify-center items-center gap-4">
          {/* edit alert */}
          <Link href={"/dashboard/products/" + id}>
            <Edit className="size-5" />
          </Link>
          {/* delete alert */}
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
