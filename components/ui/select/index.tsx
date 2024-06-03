import React, { SelectHTMLAttributes } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import clsx from "clsx";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

export function EsraSelect({
  label,
  className,
  wrapperClassName,
  name,
  placeholder,
  options,
  value,
  ...props
}: Props) {
  return (
    <div className={clsx("w-full", wrapperClassName)}>
      {label && <label htmlFor={name}>{label}</label>}

      <Select>
        <SelectTrigger
          className={clsx("w-[120px] bg-transparent outline-none", className)}
        >
          <SelectValue placeholder={placeholder} {...props} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
