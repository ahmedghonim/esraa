import { EsraButton, EsraModal } from "@/components/ui";
import ConfirmOrder from "@/views/forms/confirm-order";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  subTotal: number;
  total: number;
  shipping: number;
}

export default function CartTotal({ subTotal, total, shipping }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const t = useTranslations("common");

  return (
    <section className="flex flex-col justify-center p-6 bg-neutral-200 max-w-[453px] mt-5 ms-auto">
      <div className="flex gap-5 justify-between items-center text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">{t("subtotal")}</h1>
        <span className="font-bold text-primary-600 !font-Heebo">
          {Number(subTotal).toLocaleString()} {t("LE")}
        </span>
      </div>

      <div className="flex gap-5 justify-between items-center mt-4 text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">{t("shipping")}</h1>
        <span className="font-bold text-primary-600 !font-Heebo">
          {shipping} {t("LE")}
        </span>
      </div>

      <div className="flex gap-5 justify-between items-center mt-7 text-2xl tracking-wide">
        <h1 className="text-neutral-500 text-[22px]">{t("grand_total")}</h1>
        <span className="font-bold text-right text-primary-600 !font-Heebo">
          {Number(total).toLocaleString()} {t("LE")}
        </span>
      </div>

      <EsraModal
        modalClassName="sm:max-w-[650px]"
        open={open}
        modalTitle={t("confirm_order")}
        openTrigger={
          <EsraButton
            name={t("complete_order")}
            className="w-full justify-center items-center p-2 mt-5 text-base font-bold leading-6 text-white capitalize bg-primary-100"
          />
        }
        onOpenChange={() => setOpen(!open)}
      >
        <ConfirmOrder />
      </EsraModal>
    </section>
  );
}
