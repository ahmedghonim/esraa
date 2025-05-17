"use client";
import { getAllCategories } from "@/actions/category";
import { Category } from "@/schema";
import Logo from "@/svg/logo.svg";
import { Link, usePathname } from "@/utils/navigation";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";
import { MobileHeader } from "./mobile-header";

// Updated navigation links based on recommendations
export const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "shop_all",
    href: "/products",
  },
  {
    name: "shop_by_category",
    href: "/products",
    dropdown: true,
  },
  {
    name: "best_sellers",
    href: "/products?categories=36",
  },
  {
    name: "sale",
    href: "/products?categories=35",
    highlight: true,
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

type Props = {};

export default function Header({}: Props) {
  const t = useTranslations("common");
  const cart = useContext<TCart | null>(CartContext);
  const { items } = cart as TCart;
  const asPath = usePathname();
  const isActive = (href: string) => asPath === href;
  const [category, setCategory] = React.useState<Category[]>();

  useEffect(() => {
    getAllCategories({}).then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <header
      className={`flex gap-5 mx-auto sticky top-2 left-2 right-2 lg:px-6 lg:py-4  rounded-full bg-white justify-between items-center z-50 w-full !translate-y-0`}
    >
      <Link href="/" aria-label="Home page" className="max-lg:scale-75">
        <Logo />
      </Link>
      {/* Desktop Header */}
      <ul className="max-lg:hidden flex flex-1 lg:gap-8 2xl:gap-12 justify-center px-5 my-auto max-md:flex-wrap max-md:max-w-full">
        {links.map((link) => (
          <li
            key={link.name}
            className={clsx("text-primary-100 whitespace-nowrap", {
              "font-bold": isActive(link.href),
              "text-red-600 font-bold": link.highlight,
            })}
          >
            {link.dropdown ? (
              <div className="group relative">
                <Link href={link.href}>{t(link.name)}</Link>
                <ul className="absolute flex-col top-full left-0 bg-white z-50 shadow hidden duration-150 rounded-lg text-nowrap p-2 group-hover:flex gap-3 grow text-lg leading-6 text-zinc-800 min-w-48">
                  {category?.map((category) => (
                    <Link
                      className="hover:bg-primary-200 hover:text-white px-4 py-2 rounded-md transition-colors"
                      key={category.id}
                      href={`/products?categories=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </ul>
              </div>
            ) : (
              <Link href={link.href}>{t(link.name)}</Link>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        {/* Cart Button - Updated Design */}
        <Link
          href="/cart"
          className="relative flex items-center justify-center gap-2 bg-primary-100 hover:bg-primary-200 text-white px-6 py-2 rounded-full transition-colors max-lg:hidden"
          aria-label={t("cart")}
        >
          <ShoppingCart className="size-5" />
          <span className="font-medium">{t("cart")}</span>
          {items?.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-primary-100 text-xs font-bold flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
      </div>
      {/* Mobile Header */}
      <MobileHeader />
    </header>
  );
}
