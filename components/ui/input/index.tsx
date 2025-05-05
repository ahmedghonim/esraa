import { Input } from "@/ui/input";
import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  startContent?: React.ReactNode;
  isForm?: boolean;
  error?: string;
}

export function EsraInput({
  label,
  className,
  wrapperClassName,
  startContent,
  name,
  isForm = false,
  error,
  ...props
}: Props) {
  return isForm ? (
    <CustomInput
      label={label}
      name={name}
      className={className}
      wrapperClassName={wrapperClassName}
      startContent={startContent}
      error={error}
      {...props}
    />
  ) : (
    <CustomInput
      label={label}
      name={name}
      className={className}
      wrapperClassName={wrapperClassName}
      startContent={startContent}
      error={error}
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
  error,
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
              "border-red-500": error,
            }
          )}
        />
        {startContent && (
          <div className="absolute left-2 top-2">{startContent}</div>
        )}
      </div>

      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};
