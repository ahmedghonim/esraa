import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  name: string | React.ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

export function EsraButton({
  name,
  className,
  onClick,
  isLoading,
  type,
}: Props) {
  return (
    <button
      className={clsx("bg-primary-100", className)}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader className={cn("size-6 fill-current mx-auto")} />
      ) : (
        name
      )}
    </button>
  );
}
