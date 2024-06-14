"use client";
import React, { useTransition } from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EyeOff, EyeIcon } from "lucide-react";
import { EsraButton } from "@/components/ui";
import Image from "next/image";
import { Link, useRouter } from "@/utils/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useTranslations } from "use-intl";
import parser from "html-react-parser";
import { deleteSaleSlider, hiddenSaleSlider } from "@/actions/slae";
import { SaleSlider } from "@prisma/client";

export default function SaleRow({
  image,
  description,
  id,
  hidden,
}: SaleSlider) {
  const { toast } = useToast();
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  const onDelete = () => {
    startTransaction(() => {
      deleteSaleSlider(id)
        .then(() => {
          toast({
            title: "Deleted",
            description: "Sale Slider deleted successfully",
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

  const onHidden = () => {
    startTransaction(() => {
      hiddenSaleSlider(+id, !hidden)
        .then(() => {
          toast({
            title: hidden ? t("hidden") : t("visible"),
            description: `Sale Slider ${
              hidden ? t("hidden") : t("visible")
            } successfully`,
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
      <td className="py-4">
        <Image src={image} width={200} height={200} alt="Sale Slider image" />
      </td>

      <td className="py-4 text-center">{parser(description)}</td>

      <td className="py-4 text-center">
        {hidden ? t("hidden") : t("visible")}
      </td>

      <td className="py-4">
        <div className="flex justify-center items-center gap-4">
          {/* edit alert */}
          <Link href={"/dashboard/sale/" + id}>
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
                  <ToastAction altText="Delete" onClick={() => onDelete()}>
                    {t("delete")}
                  </ToastAction>
                ),
              });
            }}
          />
          <EsraButton
            className="bg-transparent"
            name={hidden ? <EyeIcon /> : <EyeOff />}
            onClick={onHidden}
          />
        </div>
      </td>
    </>
  );
}
