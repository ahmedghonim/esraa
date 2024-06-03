import React from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EsraAlertDialog } from "@/components/ui";
import Image from "next/image";

interface Props {
  name: string;
  image: string;
  sizes: string[];
  colors: string[];
  price: number;
  stock: number;
  description: string;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function ProductRow({
  name,
  sizes,
  colors,
  image,
  price,
  stock,
  description,
  onDelete,
  onEdit,
}: Props) {
  return (
    <>
      <td className="py-4">
        <div className="flex gap-2.5">
          <Image src={image} width={100} height={100} alt="product image" />
          <div className="flex flex-col my-auto">
            <span className="text-lg font-bold leading-6 capitalize text-zinc-800">
              {name}
            </span>
          </div>
        </div>
      </td>

      <td className="py-4">
        <div className="flex justify-center flex-wrap gap-2">
          {sizes.map((size) => (
            <span
              key={size}
              className="grid place-items-center border border-solid border-stone-300 px-5"
            >
              {size}
            </span>
          ))}
        </div>
      </td>

      <td className="py-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {colors.map((color) => (
            <div
              key={color}
              className="shrink-0 h-5 w-5"
              style={{ background: color }}
            />
          ))}
        </div>
      </td>

      <td className="py-4 text-center">{stock} Item</td>

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
