import React, { HTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  onClick?: () => void;
}

export function EsraButton({ name, className, onClick }: Props) {
  return (
    <button className={clsx("bg-primary-100", className)} onClick={onClick}>
      {name}
    </button>
  );
}
