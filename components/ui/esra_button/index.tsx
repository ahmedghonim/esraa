import React, { HTMLAttributes, MouseEvent } from "react";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  name: string | React.ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function EsraButton({
  name,
  className,
  onClick,
  isLoading,
  type,
  disabled,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={clsx("bg-primary-100", className, {
        "cursor-not-allowed": disabled,
        "opacity-50": disabled,
      })}
      type={type}
      onClick={(e) => onClick?.(e)}
    >
      {isLoading ? (
        <Loader className={cn("size-6 fill-current mx-auto")} />
      ) : (
        name
      )}
    </button>
  );
}
