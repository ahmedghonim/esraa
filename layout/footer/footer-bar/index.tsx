import { Link } from "@/utils/navigation";

import React from "react";

type Props = {};

const currentYear = new Date().getFullYear();

export default function FooterBar({}: Props) {
  return (
    <div className="flex justify-center items-center self-stretch px-16 py-5 mt-12 w-full text-sm leading-5 bg-primary-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 justify-between w-full max-w-[1044px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 self-start mt-2 text-neutral-50">
          <div className="flex-auto">© {currentYear} — Copyright</div>
          <div className="flex gap-4">
            <Link href="" className="underline">
              Privacy
            </Link>
            <Link href="" className="underline">
              Terms & Policy
            </Link>
          </div>
        </div>
        <div className="flex gap-5 justify-between font-medium tracking-wide uppercase whitespace-nowrap">
          <button className="text-neutral-50">En</button>
          <button className="text-neutral-400">Ar</button>
        </div>
      </div>
    </div>
  );
}
