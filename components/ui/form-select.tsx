import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import Select from "@/ui/select_pro";

function FormSelect({
  form,
  name,
  label,
  placeholder,
  className,
  options,
  isMulti,
}: {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  options: {
    value: any;
    label: string;
  }[];
  isMulti?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              isMulti={isMulti}
              onChange={(value: any) => {
                if (isMulti) {
                  field.onChange(value.map((item: any) => item.value));
                  return;
                }
                field.onChange(value?.value);
              }}
              options={options}
              placeholder={placeholder}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormSelect;
