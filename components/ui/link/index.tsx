import clsx from "clsx";
import { Link } from "@/utils/navigation";

import React from "react";

interface Props {
  name: string;
  href: string;
  className?: string;
}
export function EsraLink({ name, href, className }: Props) {
  return (
    <Link href={href} className={clsx("p-2 w-[106px] text-center", className)}>
      {name}
    </Link>
  );
}
