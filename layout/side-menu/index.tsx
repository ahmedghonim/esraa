import React from "react";
import LeftArrow from "@/svg/left-arrow.svg";
import WhatsApp from "@/svg/whatsapp.svg";
import Facebook from "@/svg/facebook.svg";
import Tiktok from "@/svg/tiktok.svg";
import Instagram from "@/svg/instagram.svg";
import { Link } from "@/utils/navigation";

type Props = {};

export default function SideMenu({}: Props) {
  return (
    <section className="max-lg:hidden absolute left-0 top-0">
      <div className="flex flex-col justify-between items-center h-[730px] max-w-[96px] bg-primary-100 pt-[55px] pb-9">
        <button>
          <LeftArrow />
        </button>
        <div className="flex flex-col gap-4">
          <Link href={""}>
            <WhatsApp />
          </Link>

          <Link href={""}>
            <Tiktok />
          </Link>

          <Link href={""}>
            <Facebook />
          </Link>

          <Link href={""}>
            <Instagram />
          </Link>
        </div>
      </div>
    </section>
  );
}
