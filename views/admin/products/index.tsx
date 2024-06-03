"use client";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import React from "react";
import { EsraButton, EsraModal } from "@/components/ui";
import { useProductsActions } from "./helpers/useProductsActions";
import ProductForm from "./form";
import ProductRow from "./product-row";

// { name: "Purple", hexCode: "#8434E1" },
// { name: "Black", hexCode: "#000" },
// { name: "Red", hexCode: "#F32840" },
// { name: "Orange", hexCode: "#F16F2B" },
// { name: "Navy", hexCode: "#345EFF" },
// { name: "White", hexCode: "#fff" },
// { name: "Broom", hexCode: "#D67E3B" },
// { name: "Green", hexCode: "#48BC4E" },
// { name: "Yellow", hexCode: "#FDC761" },
// { name: "Grey", hexCode: "#E4E5E8" },
// { name: "Pink", hexCode: "#E08D9D" },
// { name: "Blue", hexCode: "#3FDEFF" },

const products = [
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
  {
    name: "Product Test Name",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#8434E1", "#F32840", "#48BC4E"],
    image: "/intro-1.png",
    price: 540,
    stock: 20,
    description:
      "Test Description Test Description Test Description Test Description Test Description",
  },
];

type Props = {};

export default function ProductsList({}: Props) {
  const {
    open,
    editControler,
    setEditControler,
    setOpen,
    onEditProduct,
    onDeleteProduct,
  } = useProductsActions();

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-primary-100 font-bold text-3xl">Products List:</h1>

        <EsraButton
          name="Add Product"
          className="text-white py-2 px-6"
          onClick={() => setOpen(true)}
        />
      </div>
      {/* categories list */}
      <Table>
        <TableHeader className="bg-primary-100">
          <TableRow>
            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Product
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Sizes
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Colors
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Stock
            </TableHead>

            <TableHead className="!text-white text-center w-[220px]">
              Description
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Price
            </TableHead>

            <TableHead className="!text-white text-center min-w-[100px] w-fit">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} className="border-y-[1px] border-[#8C8C8C]">
              <ProductRow
                {...product}
                onDelete={onDeleteProduct}
                onEdit={() => onEditProduct(product as any)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* product form */}
      <EsraModal
        open={open}
        modalTitle={Boolean(editControler) ? "Edit Product" : "Add Product"}
        modalClassName="sm:max-w-[800px]"
        onConfirm={() => {}}
        onOpenChange={() => {
          setOpen(!open);
          setEditControler(null);
        }}
      >
        <ProductForm editControler={editControler} />
      </EsraModal>
    </section>
  );
}
