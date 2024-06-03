import EsraSectionTitle from "@/components/ui/section-title";
import { Link } from "@/utils/navigation";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Categories({}: Props) {
  return (
    <section className="flex flex-col font-bold leading-[150%] mt-[45px]">
      <EsraSectionTitle title="Top Categories" href="" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-[14px]">
        {[...Array(6)].map((_item, index) => (
          <Link
            href={""}
            className="flex flex-col items-center whitespace-nowrap"
            key={index}
          >
            <Image
              src="/category.png"
              width={1200}
              height={1200}
              alt="category image"
            />
            <span className="mt-2">Hejab</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
