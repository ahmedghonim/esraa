import BurgerIcon from "@/svg/burger-icon.svg";
import Logo from "@/svg/logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Link, usePathname } from "@/utils/navigation";
import clsx from "clsx";
import { links } from "..";

import { getAllCategories } from "@/actions/category";
import { EsraLink, Search } from "@/components/ui";
import { Category } from "@/schema";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";

export function MobileHeader() {
  const t = useTranslations("common");
  const cart = useContext<TCart | null>(CartContext);
  const { items } = cart as TCart;
  const asPath = usePathname();
  const isActive = (href: string) => asPath === href;
  const [category, setCategory] = React.useState<Category[]>();
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    getAllCategories({}).then((data) => {
      setCategory(data);
    });
  }, []);

  return (
    <section className="lg:hidden z-50">
      <Sheet>
        <SheetTrigger asChild>
          <button aria-label="Open menu" className="p-2 touch-manipulation">
            <BurgerIcon className="w-7 h-7" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="top"
          className="w-full h-[85vh] flex flex-col overflow-auto"
        >
          <div className="flex justify-between items-center py-4">
            <Logo />
            <div className="relative flex my-auto text-base font-bold leading-6 capitalize whitespace-nowrap">
              <EsraLink
                name={t("cart")}
                href="/cart"
                className="p-2 text-base font-bold leading-6 bg-primary-100 rounded-full text-white w-fit px-5 mr-2"
              />
              <Link
                href="/cart"
                className="p-3 text-base font-bold border-primary-100 border-4 rounded-full text-white w-fit"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="size-5 text-primary-100" />
              </Link>

              <div className="absolute -top-3 ltr:-right-3 rtl:-left-3 w-6 h-6 rounded-full bg-white grid place-items-center">
                {items?.length}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="my-4 px-2">
            <Search placeholder={t("search_products_or_categories")} />
          </div>

          {/* Mobile Navigation */}
          <ul className="flex flex-col gap-5 py-6">
            {links.map((link) => (
              <li
                key={link.name}
                className={clsx("text-primary-100 text-lg", {
                  "font-bold": isActive(link.href),
                  "text-red-600 font-bold": link.highlight,
                })}
              >
                {link.dropdown ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-3 touch-manipulation"
                      onClick={() => setShowCategories(!showCategories)}
                    >
                      <span>{t(link.name)}</span>
                      <span className="ml-2">{showCategories ? "▲" : "▼"}</span>
                    </button>

                    {showCategories && (
                      <ul className="pl-4 flex flex-col gap-3 py-2">
                        {category?.map((category) => (
                          <Link
                            className="hover:bg-primary-200/10 hover:text-primary-100 px-4 py-3 rounded-md transition-colors block touch-manipulation"
                            key={category.id}
                            href={`/products?categories=${category.id}`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block py-3 touch-manipulation"
                  >
                    {t(link.name)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </section>
  );
}
