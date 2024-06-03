import { Link } from "@/utils/navigation";

import React from "react";
import Logo from "@/svg/logo.svg";
interface Props {
  children: React.ReactNode;
}

const links = [
  {
    name: "Products",
    href: "/admin/products",
  },
  {
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Orders",
    href: "/admin/orders",
  },
];

export default function AdminLayout({ children }: Props) {
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
            Back TO Website
          </Link>
        </div>
      </section>
      <section className="flex-1 p-8">{children}</section>
    </main>
  );
}
