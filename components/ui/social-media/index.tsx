import { OurInfo } from "@/schema";
import Facebook from "@/svg/facebook.svg";
import Instagram from "@/svg/instagram.svg";
import Tiktok from "@/svg/tiktok.svg";
import { Link } from "@/utils/navigation";

interface Props {
  fill?: "primary" | "white";
  info: OurInfo;
}

export function SocialMedia({ fill = "white", info }: Props) {
  return (
    <>
      {info?.tiktok && (
        <Link href={info?.tiktok || "/"} aria-label="Visit our TikTok page">
          <Tiktok className={fill === "primary" ? "fill-primary-100" : ""} />
        </Link>
      )}
      {info?.facebook && (
        <Link href={info?.facebook || "/"} aria-label="Visit our Facebook page">
          <Facebook className={fill === "primary" ? "fill-primary-100" : ""} />
        </Link>
      )}
      {info?.instagram && (
        <Link
          href={info?.instagram || "/"}
          aria-label="Visit our Instagram page"
        >
          <Instagram className={fill === "primary" ? "fill-primary-100" : ""} />
        </Link>
      )}
    </>
  );
}
