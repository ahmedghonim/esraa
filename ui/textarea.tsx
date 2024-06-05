import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/utils";

const inputVariants = cva(
  "bg-transparent !outline-none placeholder:text-primary-200 border-primary-100 relative items-start p-4 bg-white text-[#1a1a1a] rounded-lg border border-solid max-lg:pr-5 flex disabled:cursor-not-allowed text-justify w-full disabled:opacity-50 text-base focus-visible:outline-primary",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
      ghost: {
        true: "border-none bg-transparent border-0 text-primary font-bold ",
      },
      size: {
        lg: "sm:text-[16px] px-5 py-[8px] text-[14px]",
      },
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  label?: string;
  isError?: string | boolean | null | undefined;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, name, label, error, size, isError, ghost, ...props }, ref) => {
    return (
      <div className={cn("relative flex w-full flex-1 flex-col")}>
        {label && (
          <label htmlFor={name} className="pb-2 text-[16px] font-bold">
            {label}
          </label>
        )}

        <div className="relative flex">
          <textarea
            id={name}
            className={cn(
              inputVariants({ className, size, error, ghost, ...props }),
              {
                "border-red-500": isError,
              }
            )}
            {...props}
          />
        </div>
        <p className="w-full m-0 text-sm text-red-500 text-start">{isError}</p>
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
