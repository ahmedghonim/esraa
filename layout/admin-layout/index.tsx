import { Link } from "@/utils/navigation";

import React from "react";
import Logo from "@/svg/logo.svg";
import { useTranslations } from "next-intl";
interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const t = useTranslations("common");
  const links = [
    {
      name: t("orders"),
      href: "/dashboard",
    },
    {
      name: t("products"),
      href: "/dashboard/products",
    },
    {
      name: t("categories"),
      href: "/dashboard/categories",
    },
  ];
  return (
    <main className="min-h-screen flex justify-between gap-6">
      <section className="w-[300px] bg-primary-100 py-6 px-10">
        <Logo />
        <div className="flex flex-col gap-6 my-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-white">
              {link.name}
            </Link>
          ))}
          <Link href={"/"} className="bg-white py-3 px-6 block text-center">
            {t("back_to_website")}
          </Link>
        </div>
      </section>
      <section className="flex-1 p-8">{children}</section>
    </main>
  );
}
