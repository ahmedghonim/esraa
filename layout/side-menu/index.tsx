import React, { useEffect } from "react";
import LeftArrow from "@/svg/left-arrow.svg";
import WhatsApp from "@/svg/whatsapp.svg";
import Facebook from "@/svg/facebook.svg";
import Tiktok from "@/svg/tiktok.svg";
import Instagram from "@/svg/instagram.svg";
import { Link } from "@/utils/navigation";
import { getOurInfo } from "@/actions/our-info";
import { OurInfo } from "@/schema";

type Props = {};

export default function SideMenu({}: Props) {
  const [info, setInfo] = React.useState<any>();
  useEffect(() => {
    getOurInfo().then((data) => {
      setInfo(data as any);
    });
  }, []);
  return (
    <section className="max-lg:hidden fixed left-0 top-0">
      <div className="flex flex-col justify-between items-center h-[730px] max-w-[96px] bg-primary-100 pt-[55px] pb-9">
        <button>
          <LeftArrow />
        </button>
        <div className="flex flex-col gap-4">
          {info?.whatsApp && (
            <Link href={"https://wa.me/" + info?.whatsApp || "/"}>
              <WhatsApp />
            </Link>
          )}
          {info?.tiktok && (
            <Link href={info?.tiktok || "/"}>
              <Tiktok />
            </Link>
          )}
          {info?.facebook && (
            <Link href={info?.facebook || "/"}>
              <Facebook />
            </Link>
          )}
          {info?.instagram && (
            <Link href={info?.instagram || "/"}>
              <Instagram />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
