import React from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EsraAlertDialog } from "@/components/ui";
import Image from "next/image";
import { Color, Product, Size } from "@prisma/client";

interface Props extends Product {
  sizes: Size[];
  colors: Color[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function ProductRow({
  name,
  sizes,
  colors,
  thumbnail,
  price,
  inStock,
  description,
  onDelete,
  onEdit,
}: Props) {
  console.log("colors >>>> ", colors);
  console.log("sizes >>>> ", sizes);
  return (
    <>
      <td className="py-4">
        <div className="flex gap-2.5">
          <Image src={thumbnail} width={100} height={100} alt="product image" />
          <div className="flex flex-col my-auto">
            <span className="text-lg font-bold leading-6 capitalize text-zinc-800">
              {name}
            </span>
          </div>
        </div>
      </td>

      <td className="py-4">
        <div className="flex justify-center flex-wrap gap-2">
          {sizes.map(({ name }) => (
            <span
              key={name}
              className="grid place-items-center border border-solid border-stone-300 px-5"
            >
              {name}
            </span>
          ))}
        </div>
      </td>

      <td className="py-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {colors.map(({ hexCode }) => (
            <div
              key={hexCode}
              className="shrink-0 h-5 w-5"
              style={{ background: hexCode }}
            />
          ))}
        </div>
      </td>

      <td className="py-4 text-center">{inStock} Item</td>

      <td className="py-4 text-center">{description}</td>

      <td className="py-4 text-center">{Number(price).toLocaleString()} LE</td>

      <td className="py-4">
        <div className="flex justify-center items-center gap-4">
          {/* edit alert */}
          <button onClick={onEdit}>
            <Edit className="size-5" />
          </button>
          {/* delete alert */}
          <EsraAlertDialog
            alertTitle="Are you absolutely sure?"
            alertDescription="This action cannot be undone. This will permanently delete the product."
            openTrigger={<Delete />}
            confirmClassName="bg-red-600"
            onAccept={() => onDelete(0)}
          />
        </div>
      </td>
    </>
  );
}
