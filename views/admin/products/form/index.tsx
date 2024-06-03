import { EsraInput } from "@/components/ui";
import { TProduct } from "@/types";
import { colorsData } from "@/views/shopper/products/filter/colors";
import { sizesData } from "@/views/shopper/products/filter/sizes";
import clsx from "clsx";
import React from "react";

interface Props {
  editControler: TProduct | null;
}

export default function ProductForm({ editControler }: Props) {
  return (
    <form>
      <EsraInput name="image" type="file" onChange={() => {}} />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <EsraInput
          name="name"
          placeholder="Product Name"
          label="Product Name:"
          onChange={() => {}}
        />

        <EsraInput
          name="price"
          type="number"
          min={1}
          placeholder="Product Price"
          label="Product Price:"
          onChange={() => {}}
        />

        <EsraInput
          name="stock"
          type="number"
          min={1}
          placeholder="Product Stock"
          label="Product Stock:"
          onChange={() => {}}
        />
      </div>

      <div className="my-6">
        <label htmlFor="description">Description:</label>

        <textarea
          name="description"
          rows={5}
          className="outline-none w-full border-[1px] border-primary-100 rounded-md"
        />
      </div>

      <div className="mb-6">
        <span>Colors:</span>

        <div className="grid grid-cols-10 gap-4 mt-1">
          {colorsData.map((color, index) => (
            <button key={index}>
              <span
                className="block h-9 w-9 mb-3 mx-auto"
                style={{ background: color.hexCode }}
                onClick={() => {}}
              />
              <span
                className={clsx(
                  "text-[#8A8989] font-Heebo block duration-300",
                  {
                    "!text-primary-100 font-bold":
                      // activeCondition,
                      false,
                  }
                )}
              >
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <span>Sizes:</span>

        <div className="grid grid-cols-10 gap-4 mt-1">
          {sizesData.map((size, index) => (
            <button
              key={index}
              className={clsx(
                "uppercase border-[1px] border-secondary-600  py-1 text-primary-300 duration-300",
                {
                  "bg-primary-100 text-white font-bold":
                    // activeCondition,
                    false,
                }
              )}
              onClick={() => {}}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
