import React from "react";
import Delete from "@/svg/delete.svg";
import Edit from "@/svg/edit.svg";
import { EsraAlertDialog } from "@/components/ui";

interface Props {
  name: string;
  index: number;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function CategoryRow({ name, index, onDelete, onEdit }: Props) {
  return (
    <>
      <td className="py-4 text-center">#{index + 1}</td>
      <td className="py-4 text-center">{name}</td>

      <td className="py-4 flex justify-center items-center gap-4">
        {/* edit alert */}
        <button onClick={onEdit}>
          <Edit className="size-5" />
        </button>
        {/* delete alert */}
        <EsraAlertDialog
          alertTitle="Are you absolutely sure?"
          alertDescription="This action cannot be undone. This will permanently delete the category."
          openTrigger={<Delete />}
          confirmClassName="bg-red-600"
          onAccept={() => onDelete(0)}
        />
      </td>
    </>
  );
}
