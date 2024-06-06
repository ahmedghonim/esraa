import React from "react";
import WhatsApp from "@/svg/whatsapp.svg";
import Facebook from "@/svg/facebook.svg";
import Tiktok from "@/svg/tiktok.svg";
import Instagram from "@/svg/instagram.svg";
import { Link } from "@/utils/navigation";
import { OurInfo } from "@/schema";

interface Props {
  fill?: "primary" | "white";
  info: OurInfo;
}

export function SocialMedia({ fill = "white", info }: Props) {
  return (
    <>
      <Link href={"https://wa.me/" + info?.whatsApp || "/"}>
        <WhatsApp className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={info?.tiktok || "/"}>
        <Tiktok className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={info?.facebook || "/"}>
        <Facebook className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={info?.instagram || "/"}>
        <Instagram className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>
    </>
  );
}
