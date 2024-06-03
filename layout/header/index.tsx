"use client";
import { Link } from "@/utils/navigation";
import React from "react";
import Logo from "@/svg/logo.svg";
import clsx from "clsx";
import { MobileHeader } from "./mobile-header";
import { useTranslations } from "next-intl";
import { usePathname } from "@/utils/navigation";
import { EsraButton, EsraLink } from "@/components/ui";
import { ShoppingCart } from "lucide-react";
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
    name: "About Us",
    href: "/about-us",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

type Props = {};

export default function Header({}: Props) {
  const t = useTranslations("common");

  const asPath = usePathname();

  const isActive = (href: string) => asPath === href;

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
      </ul>

      <div className="max-lg:hidden flex  my-auto text-base font-bold leading-6 capitalize whitespace-nowrap">
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
      </div>

      {/* Mobile Header */}

      <MobileHeader />
    </header>
  );
}
