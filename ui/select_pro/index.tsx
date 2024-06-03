"use client";
import React from "react";
import ReactSelect, { Props } from "react-select";

export interface Options {
  value: string | number;
  label: string | number;
}

interface SelectProps extends Omit<Props, "placeholder"> {
  options: Options[];
  label?: string;
  placeholder?: string;
}

function Select({
  options,
  className = "",
  label,
  name = "",
  required,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <ReactSelect
      id="long-value-select"
      instanceId="long-value-select"
      {...props}
      options={options}
      value={options?.find((option) => option.value == props.value)}
      defaultValue={options?.find(
        (option) => option.value == props.defaultValue
      )}
      placeholder={placeholder as string}
      className={`h-10 w-full z-[50]${className} `}
    />
  );
}

export default Select;
