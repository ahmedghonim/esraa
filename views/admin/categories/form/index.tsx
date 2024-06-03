import { EsraInput } from "@/components/ui";
import { TCategory } from "@/types";
import React from "react";

interface Props {
  editControler: TCategory | null;
}

export default function CategoryForm({ editControler }: Props) {
  return (
    <form>
      <EsraInput
        name="name"
        placeholder="Category Name"
        label="Category Name"
        onChange={() => {}}
      />
    </form>
  );
}
