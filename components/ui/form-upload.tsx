"use client";
import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import FileUpload from "./upload";

function FormUpload({
  form,
  name,
  label,
  className,
  hideDelete,
}: {
  form: any;
  name: string;
  label?: string;
  className?: string;
  hideDelete?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <FileUpload
              label={label}
              className={className}
              onChange={field.onChange}
              value={field.value}
              hideDelete={hideDelete}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default FormUpload;
