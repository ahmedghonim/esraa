import { EsraButton, EsraModal } from "@/components/ui";
import ConfirmOrder from "@/views/forms/confirm-order";
import React, { useState } from "react";

interface Props {
  subTotal: number;
  shipping: number;
  grandTotal: number;
}

export default function CartTotal({ subTotal, shipping, grandTotal }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  /* ------------------------ */
  /*     on confirm order     */
  /* ------------------------ */
  const onConfirmOrder = () => {};

  return (
    <section className="flex flex-col justify-center p-6 bg-neutral-200 max-w-[453px] mt-5 ms-auto">
      <div className="flex gap-5 justify-between items-center text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">Subtotal</h1>
        <span className="font-bold text-primary-600 !font-Heebo">
          {subTotal} LE
        </span>
      </div>

      <div className="flex gap-5 justify-between items-center mt-4 text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">Shipping</h1>
        <span className="font-bold text-primary-600 !font-Heebo">
          {shipping} LE
        </span>
      </div>

      <div className="flex gap-3 mt-6 whitespace-nowrap">
        <input
          className="bg-transparent p-2 text-sm border border-solid border-neutral-400 text-neutral-400 flex-1 outline-none"
          placeholder="Coupon"
        />

        <EsraButton
          name="Apply"
          className="justify-center p-2 text-base font-bold leading-6 text-white capitalize w-[132px]"
        />
      </div>

      <div className="flex gap-5 justify-between items-center mt-7 text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">Grand Total</h1>
        <span className="font-bold text-right text-primary-600 !font-Heebo">
          {grandTotal} LE
        </span>
      </div>

      <EsraModal
        open={open}
        modalTitle={"Confirm Order"}
        openTrigger={
          <EsraButton
            name="Complete Order"
            className="w-full justify-center items-center p-2 mt-5 text-base font-bold leading-6 text-white capitalize bg-primary-100"
          />
        }
        onConfirm={onConfirmOrder}
        onOpenChange={() => setOpen(!open)}
      >
        <ConfirmOrder />
      </EsraModal>
    </section>
  );
}
