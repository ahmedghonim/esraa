import React from "react";
import SingleCartItem from "./single-cart-item";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import { TCart } from "../../local-cart";
import { useTranslations } from "next-intl";
import { TColor, TSize } from "@/types";

interface Props {
  cart: TCart;
  onDeleteItem: (index: number) => void;
  onChangeQty: (
    id: number,
    selected_size: TSize,
    selected_color: TColor,
    type: "inc" | "dec"
  ) => void;
}

export default function CartItems({ cart, onDeleteItem, onChangeQty }: Props) {
  const t = useTranslations("common");

  return (
    <section className="flex flex-col mt-8">
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white min-w-[250px] w-fit">
              {t("product")}
            </TableHead>
            <TableHead className="!text-white min-w-[220px] w-fit">
              {t("qty")}
            </TableHead>
            <TableHead className="!text-white min-w-[120px] w-fit">
              {t("price")}
            </TableHead>
            <TableHead className="!text-white min-w-[120px] w-fit">
              {t("subtotal")}
            </TableHead>
            <TableHead className="!text-white w-fit">{t("action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items?.map((product, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <SingleCartItem
                {...product}
                price={product.newPrice || product.price}
                onDeleteItem={() => onDeleteItem(index)}
                onDecrease={() =>
                  onChangeQty(
                    product.id,
                    product.selected_size,
                    product.selected_color,
                    "dec"
                  )
                }
                onIncrease={() => {
                  const variant = product?.ProductVariant?.find(
                    (variant) =>
                      variant.sizeId === product.selected_size.id &&
                      variant.colorId === product.selected_color.id
                  );

                  if (variant && variant.stock > product.qty) {
                    onChangeQty(
                      product.id,
                      product.selected_size,
                      product.selected_color,
                      "inc"
                    );
                  }
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
