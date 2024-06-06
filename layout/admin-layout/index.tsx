import { Link } from "@/utils/navigation";

import React from "react";
import Logo from "@/svg/logo.svg";
import { useTranslations } from "next-intl";
import { signOut } from "@/auth/helper";
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
      name: t("hero-section"),
      href: "/dashboard/hero-section",
    },
    {
      name: t("products"),
      href: "/dashboard/products",
    },
    // {
    //   name: t("categories"),
    //   href: "/dashboard/categories",
    // },
    {
      name: t("general-info"),
      href: "/dashboard/general-info",
    },
    {
      name: t("sale_slider"),
      href: "/dashboard/sale",
    },
    {
      name: t("what_they_say"),
      href: "/dashboard/say",
    },
    {
      name: t("contact_us"),
      href: "/dashboard/contact-us",
    },
    {
      name: t("our_info"),
      href: "/dashboard/info",
    },
  ];
  return (
    <main className="min-h-screen flex justify-between gap-6">
      <section className="w-[200px] bg-primary-100 py-6 px-10">
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
        <button onClick={() => signOut()} className="text-red-400">
          {t("log_out")}
        </button>
      </section>
      <section className="flex-1 p-8">{children}</section>
    </main>
  );
}
