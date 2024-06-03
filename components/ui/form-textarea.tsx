import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { TextArea } from "@/ui/textarea";

function FormTextArea({
  form,
  name,
  label,
  placeholder,
  className,
}: {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <TextArea
              {...field}
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

export default FormTextArea;
