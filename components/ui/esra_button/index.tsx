import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { HTMLAttributes, MouseEvent } from "react";

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
  isLoading = false,
  type = "button",
  disabled = false,
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "flex justify-center items-center py-3 px-4 text-base font-bold leading-6 text-white bg-primary-100 rounded-full w-full hover:bg-primary-200 transition-colors duration-200 ease-in-out",
        {
          "opacity-70 cursor-not-allowed": disabled || isLoading,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        name
      )}
    </button>
  );
}
