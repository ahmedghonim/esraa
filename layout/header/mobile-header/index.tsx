import BurgerIcon from "@/svg/burger-icon.svg";
import Logo from "@/svg/logo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { Link, usePathname } from "@/utils/navigation";
import clsx from "clsx";
import { links } from "..";

import { getAllCategories } from "@/actions/category";
import { EsraLink } from "@/components/ui";
import { Category } from "@/schema";
import { CartContext, TCart } from "@/views/shopper/local-cart";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";

export function MobileHeader() {
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
    <section className="lg:hidden z-50">
      <Sheet>
        <SheetTrigger asChild>
          <button>
            <BurgerIcon />
          </button>
        </SheetTrigger>

        <SheetContent side="top" className="w-full h-fit flex flex-col">
          <div className="flex justify-between">
            <Logo />
            <div className="relative  flex  my-auto text-base font-bold leading-6 capitalize whitespace-nowrap">
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
                {items?.length}
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <ul className=" flex flex-col gap-4 justify-between">
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
              <ul className="flex-col -start-3 hidden bg-white z-50 shadow  duration-150 rounded-lg text-nowrap p-2 group-hover:flex gap-3 grow text-lg leading-6 text-zinc-800 max-md:mt-4">
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
        </SheetContent>
      </Sheet>
    </section>
  );
}
