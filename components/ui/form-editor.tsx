"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import Editor from "./quill-editor";

function FormEditor({
  form,
  name,
  label,
  placeholder,
}: {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Editor {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormEditor;
