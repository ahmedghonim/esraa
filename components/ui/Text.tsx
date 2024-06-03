import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const TextVariants = cva("max-lg:max-w-full text-[#1a1a1a]", {
  variants: {
    variant: {
      h1: "lg:!leading-[48px] !leading-[38px] text-[32px] lg:text-[48px] font-bold",
      h2: "lg:!leading-[48px] !leading-[38px] text-[24px] lg:text-[32px] font-bold",
      p: "!leading-8 lg:text-xl text-sm text-[#494949]",
      h4: "!leading-[24px] text-base font-bold",
      span: "!leading-[11px] !text-sm text-[#494949]",
      h3: "!leading-[32px] text-[24px] font-bold",
      li: "!leading-8 lg:text-xl text-sm text-[#494949]",
      div: "!leading-8 lg:text-xl text-sm text-[#494949]",
    },
    color: {
      white: "!text-white",
      primary: "!text-primary",
      gray: "!text-[#494949]",
    },
    weight: {
      normal: "!font-normal",
      medium: "!font-medium",
      semibold: "!font-semibold",
      bold: "font-bold",
    },
  },
});

export interface TextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TextVariants> {
  asChild?: boolean;
  as?: "span" | "h2" | "p" | "h4" | "span" | "h1" | "li" | "h3" | "div";
  color?: "primary" | "white" | "gray";
}
/**
 * @description Text component
 * @variant h2 ,p ,h4 ,span
 * @color white
 * @weight normal-400 ,medium-500 ,semibold-600 ,bold-700
 */

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, weight, color, asChild = false, as, ...props }) => {
    const Comp: any = asChild ? Slot : as ? as : "span";
    return (
      <Comp
        className={cn(
          TextVariants({ variant: as ? as : variant, weight, color, className })
        )}
        {...props}
      >
        {props.children || ""}
      </Comp>
    );
  }
);
Text.displayName = "Text";

export { Text, TextVariants };
