"use client";
import { deleteOrder } from "@/actions/order";
import { EsraAlertDialog } from "@/components/ui";
import { Link, useRouter } from "@/utils/navigation";
import React, { useTransition } from "react";
import Delete from "@/svg/delete.svg";

interface Props {
  data: any;
}

export default function OrderRow({ data }: Props) {
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();

  return (
    <>
      <td className="py-4 text-center w-[10px]">{data.id}</td>
      <td className="py-4 text-center w-[110px]">{data.customer.name}</td>

      <td className="py-4 text-center w-[110px]">
        <Link href={`tel:${data.customer.phone}`}>{data.customer.phone}</Link>
      </td>

      <td className="text-primary-100 font-medium py-4 text-center ">
        <address>{data.customer.address}</address>
      </td>

      <td className="text-primary-100 font-medium py-4 ">
        {data.products.map(
          ({ product, size, quantity, color }: any, index: any, arr: any) => (
            <span key={product.id}>
              ({product.price}){product.name} - {quantity} - {size} - {color}
              {index !== arr.length - 1 && <br />}
            </span>
          )
        )}
      </td>
      <td className="text-primary-100 font-medium py-4 text-center ">
        <EsraAlertDialog
          alertTitle="Are you absolutely sure?"
          alertDescription="This action cannot be undone. This will permanently delete the order."
          openTrigger={<Delete />}
          isLoading={isPending}
          confirmClassName="bg-red-600"
          onAccept={async () => {
            startTransaction(() => {
              deleteOrder(data.id);
              router.refresh();
            });
          }}
        />
      </td>
    </>
  );
}
