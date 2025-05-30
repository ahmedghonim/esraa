import React from "react";
import Delete from "@/svg/delete.svg";
import Image from "next/image";
import { ChangeProductCount, EsraAlertDialog } from "@/components/ui";
import { useTranslations } from "next-intl";

interface Props {
  thumbnail: string;
  name: string;
  selected_size: { id: number; name: string };
  selected_color: { id: number; hexCode: string; name: string };
  qty: number;
  price: number;
  onDeleteItem: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function SingleCartItem({
  thumbnail,
  name,
  selected_size,
  selected_color,
  qty,
  price,
  onIncrease,
  onDecrease,
  onDeleteItem,
}: Props) {
  const t = useTranslations("common");
  return (
    <>
      <td className="py-4">
        <div className="flex gap-2.5">
          <Image src={thumbnail} width={100} height={100} alt="product image" />
          <div className="flex flex-col my-auto">
            <span className="text-lg font-bold leading-6 capitalize text-zinc-800">
              {name}
            </span>
            <div className="flex gap-3 mt-2.5 text-base  text-neutral-500">
              <span className="grid place-items-center border border-solid border-stone-300 px-5">
                {selected_size?.name}
              </span>

              {selected_color.hexCode === "multi_color" ? (
                <Image
                  className="shrink-0  h-[37px] w-[37px] m-0"
                  alt="WhatsApp Image 2024-10-20 at 12.39.39 PM.jpeg"
                  width={10}
                  height={10}
                  src="/WhatsApp Image 2024-10-20 at 12.39.39 PM.jpeg"
                />
              ) : (
                <span
                  style={{
                    backgroundColor: selected_color.hexCode,
                  }}
                  className="shrink-0  h-[37px] w-[37px]"
                />
              )}
            </div>
          </div>
        </div>
      </td>

      <td className="py-4">
        <ChangeProductCount
          qty={qty}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
        />
      </td>

      <td className="text-[20px] text-primary-100 font-medium py-4 text-center">
        {Number(price).toLocaleString()} {t("LE")}
      </td>

      <td className="text-[20px] text-primary-100 font-medium py-4 text-center">
        {Number(price * qty).toLocaleString()} {t("LE")}
      </td>

      <td className="py-4 text-center">
        {/* delete alert */}
        <EsraAlertDialog
          alertTitle="Are you absolutely sure?"
          alertDescription="This action cannot be undone. This will permanently delete the item
          and will be removed from the cart"
          openTrigger={<Delete />}
          confirmClassName="bg-red-600"
          onAccept={onDeleteItem}
        />
      </td>
    </>
  );
}
