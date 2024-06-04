"use client";
import React from "react";
import ReactSelect, { Props } from "react-select";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface Options {
  value: string | number;
  label: string | number;
}

interface SelectProps extends Props {
  options: Options[];
  label?: string;
  isError?: string | boolean | null | undefined;
  formatOptionLabel?: (option: any) => React.ReactNode;
}

function Select({
  options,
  className = "",
  label,
  name = "",
  required,
  value,
  defaultValue,
  formatOptionLabel,
  ...props
}: SelectProps) {
  const t = useTranslations("common");

  return (
    <div
      className={cn("w-full flex flex-col gap-2", {
        "!opacity-80 !cursor-not-allowed": props.isDisabled,
      })}
    >
      {Boolean(label) && (
        <label htmlFor={name} className={"text-[16px] font-bold"}>
          {label}
        </label>
      )}

      <ReactSelect
        id="long-value-select"
        instanceId="long-value-select"
        options={options}
        value={
          props.isMulti
            ? value
            : options?.find((option) => option.value == value)
        }
        defaultValue={
          props.isMulti
            ? defaultValue
            : options?.find((option) => option.value == defaultValue)
        }
        formatOptionLabel={formatOptionLabel}
        {...props}
        classNamePrefix={`select2-selection ${
          props.isDisabled === true ? "!opacity-80 " : ""
        }
         `}
        className={cn("h-10 w-full", className, {
          "border border-red-500": props.isError,
        })}
        placeholder={props.placeholder || t("select")}
      />
      {props.isError && (
        <p className="text-red-500 w-full m-0 text-start text-sm">
          {props.isError}
        </p>
      )}
    </div>
  );
}

export default Select;
