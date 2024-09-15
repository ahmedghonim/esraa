"use client";
import { Link } from "@/utils/navigation";
import React, { useContext, useEffect } from "react";
import Logo from "@/svg/logo.svg";
import clsx from "clsx";
import { MobileHeader } from "./mobile-header";
import { useTranslations } from "next-intl";
import { usePathname } from "@/utils/navigation";
import { EsraLink } from "@/components/ui";
import { ShoppingCart } from "lucide-react";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { getAllCategories } from "@/actions/category";
import { Category } from "@/schema";
export const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "products",
    href: "/products",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

type Props = {};

export default function Header({}: Props) {
  const t = useTranslations("common");

  const { cart } = useContext<{
    cart: TCart;
    setCart: React.Dispatch<React.SetStateAction<TCart>>;
  }>(CartContext as any);

  const asPath = usePathname();

  const isActive = (href: string) => asPath === href;
  const [category, setCategory] = React.useState<Category[]>();
  useEffect(() => {
    getAllCategories({}).then((data) => {
      setCategory(data);
    });
  }, []);
  return (
    <header className="flex gap-5 justify-between items-center max-md:flex-wrap max-lg:mt-6">
      <Link href="/">
        <Logo />
      </Link>

      {/* Desktop Header */}
      <ul className="max-lg:hidden flex flex-1 lg:gap-12 2xl:gap-20 justify-center px-5 my-auto max-md:flex-wrap max-md:max-w-full">
        {links.map((link) => (
          <li
            key={link.name}
            className={clsx("text-primary-100", {
              "font-bold": isActive(link.href),
            })}
          >
            <Link href={link.href}>{t(link.name)}</Link>
          </li>
        ))}
        <li className="group relative">
          <Link href="/products">{t("categories")}</Link>
          <ul className=" absolute flex-col top-2 -start-3  bg-white z-50 shadow hidden duration-150 rounded-lg text-nowrap p-2 group-hover:flex gap-3 grow text-lg leading-6 text-zinc-800 max-md:mt-4">
            {category?.map((category) => (
              <Link
                className="hover:bg-primary-200 hover:text-white px-2 p-1  rounded-md"
                key={category.id}
                href={`/products?categories=${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </ul>
        </li>
      </ul>

      <div className="relative max-lg:hidden flex  my-auto text-base font-bold leading-6 capitalize whitespace-nowrap">
        <EsraLink
          name={t("cart")}
          href="/cart"
          className="p-2 text-base font-bold leading-6 bg-primary-100 rounded-full text-white w-fit px-3"
        />
        <Link
          href="/cart"
          className="p-2 text-base font-bold  border-primary-100 border-4 rounded-full text-white w-fit"
        >
          <ShoppingCart className="size-4 text-primary-100" />
        </Link>

        <div className="absolute -top-3 ltr:-right-3 rtl:-left-3 w-6 h-6 rounded-full bg-white grid place-items-center">
          {cart.items?.length}
        </div>
      </div>

      {/* Mobile Header */}

      <MobileHeader />
    </header>
  );
}
