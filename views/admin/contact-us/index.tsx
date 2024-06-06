"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import { useTranslations } from "next-intl";
import { Contact } from "@prisma/client";
import ContactUSRow from "./contact-row";

type Props = { data: Contact[] };

export default function ContactUSList({ data }: Props) {
  const t = useTranslations("common");

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">
          {t("contact_us_list:")}
        </h1>
      </div>
      {/* categories list */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center  w-fit">
              {t("name")}
            </TableHead>

            <TableHead className="!text-white text-center  w-fit">
              {t("phone")}
            </TableHead>

            <TableHead className="!text-white text-center  w-fit">
              {t("message")}
            </TableHead>

            <TableHead className="!text-white text-center  w-fit">
              {t("read")}
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              {t("actions")}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <ContactUSRow {...item} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
