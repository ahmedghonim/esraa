import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Input } from "@/ui/input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  startContent?: React.ReactNode;
  isForm?: boolean;
}

export function EsraInput({
  label,
  className,
  wrapperClassName,
  startContent,
  name,
  isForm = false,
  ...props
}: Props) {
  return isForm ? (
    <CustomInput
      label={label}
      name={name}
      className={className}
      wrapperClassName={wrapperClassName}
      startContent={startContent}
      {...props}
    />
  ) : (
    <CustomInput
      label={label}
      name={name}
      className={className}
      wrapperClassName={wrapperClassName}
      startContent={startContent}
      {...props}
    />
  );
}

const CustomInput = ({
  label,
  className,
  wrapperClassName,
  startContent,
  name,
  ...props
}: Props) => {
  return (
    <div className={clsx("!w-full items-center gap-1.5", wrapperClassName)}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className="relative">
        <Input
          {...props}
          className={clsx(
            "bg-transparent !outline-none placeholder:text-primary-200 border-primary-100",
            className,
            {
              "ps-10": startContent,
            }
          )}
        />
        {startContent && (
          <div className="absolute left-2 top-2">{startContent}</div>
        )}
      </div>
    </div>
  );
};
