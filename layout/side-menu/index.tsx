import { getOurInfo } from "@/actions/our-info";
import Facebook from "@/svg/facebook.svg";
import Instagram from "@/svg/instagram.svg";
import LeftArrow from "@/svg/left-arrow.svg";
import Tiktok from "@/svg/tiktok.svg";
import WhatsApp from "@/svg/whatsapp.svg";
import { Link } from "@/utils/navigation";
import React, { useEffect } from "react";

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
        <button aria-label="Close side menu">
          <LeftArrow />
        </button>
        <div className="flex flex-col gap-4">
          {info?.whatsApp && (
            <Link
              href={"https://wa.me/" + info?.whatsApp || "/"}
              aria-label="Contact us on WhatsApp"
            >
              <WhatsApp />
            </Link>
          )}
          {info?.tiktok && (
            <Link href={info?.tiktok || "/"} aria-label="Visit our TikTok page">
              <Tiktok />
            </Link>
          )}
          {info?.facebook && (
            <Link
              href={info?.facebook || "/"}
              aria-label="Visit our Facebook page"
            >
              <Facebook />
            </Link>
          )}
          {info?.instagram && (
            <Link
              href={info?.instagram || "/"}
              aria-label="Visit our Instagram page"
            >
              <Instagram />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
