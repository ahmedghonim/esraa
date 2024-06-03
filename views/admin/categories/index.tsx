import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import CategoryRow from "./category-row";
import { EsraButton, EsraModal } from "@/components/ui";
import { useCategoriesActions } from "./helpers/useCategoriesActions";
import CategoryForm from "./form";

const categories = [
  { id: 0, name: "Test Category" },
  { id: 0, name: "Test Category" },
  { id: 0, name: "Test Category" },
  { id: 0, name: "Test Category" },
];

type Props = {};

export default function CategoriesList({}: Props) {
  const {
    open,
    editControler,
    setEditControler,
    onEditCategory,
    onDeleteCategory,
    setOpen,
  } = useCategoriesActions();

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">
          Categories List:
        </h1>

        <EsraButton
          name="Add Category"
          className="text-white py-2 px-6"
          onClick={() => setOpen(true)}
        />
      </div>
      {/* categories list */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center min-w-[50px] w-fit">
              #
            </TableHead>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Name
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <CategoryRow
                {...category}
                index={index}
                onDelete={onDeleteCategory}
                onEdit={() => onEditCategory(category)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* category form */}
      <EsraModal
        open={open}
        modalTitle={Boolean(editControler) ? "Edit Category" : "Add Category"}
        onConfirm={() => {}}
        onOpenChange={() => {
          setOpen(!open);
          setEditControler(null);
        }}
      >
        <CategoryForm editControler={editControler} />
      </EsraModal>
    </section>
  );
}
