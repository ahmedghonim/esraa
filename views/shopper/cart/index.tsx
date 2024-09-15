"use client";
import React, { useEffect } from "react";
import EmptyCart from "./empty-cart";
import CartItems from "./cart-items";
import CartTotal from "./cart-total";
import { useCartActions } from "./helpers/useCartActions";
import Select from "@/ui/select_pro";

import { useTranslations } from "next-intl";
import { getAllShipping } from "@/actions/shipping";
import { Shipping } from "@/schema";
type Props = {
  shipping: number;
};

export default function Cart() {
  const { cart, onDeleteItem, onChangeQty, setCart } = useCartActions();
  const [shipping, setShipping] = React.useState<Shipping[]>([]);
  const t = useTranslations("common");
  const isCartHasItems = cart.items.length > 0;

  useEffect(() => {
    getAllShipping().then((data) => {
      setShipping(data);
    });
    setCart({
      ...cart,
      shipping: shipping[0]?.price || 0,
    });
  }, [shipping[0]?.price]);

  return (
    <main className="mb-10">
      {isCartHasItems ? (
        <>
          <CartItems
            cart={cart}
            onChangeQty={onChangeQty}
            onDeleteItem={onDeleteItem}
          />
          <div className=" bg-neutral-200 w-fit me-auto">
            <div className="p-4">
              {t("select_city")}
              <Select
                value={cart.shipping}
                options={shipping.map((item) => ({
                  value: item.price.toString(),
                  label: item.city,
                }))}
                onChange={(value: any) => {
                  setCart({
                    ...cart,
                    shipping: value?.value,
                  });
                }}
                defaultValue={shipping[0]?.price.toString()}
              />
            </div>

            <CartTotal cart={cart} />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </main>
  );
}
