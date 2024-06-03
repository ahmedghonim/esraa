import React from "react";
import WhatsApp from "@/svg/whatsapp.svg";
import Facebook from "@/svg/facebook.svg";
import Tiktok from "@/svg/tiktok.svg";
import Instagram from "@/svg/instagram.svg";
import { Link } from "@/utils/navigation";

interface Props {
  fill?: "primary" | "white";
}

export function SocialMedia({ fill = "white" }: Props) {
  return (
    <>
      <Link href={""}>
        <WhatsApp className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={""}>
        <Tiktok className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={""}>
        <Facebook className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>

      <Link href={""}>
        <Instagram className={fill === "primary" ? "fill-primary-100" : ""} />
      </Link>
    </>
  );
}
