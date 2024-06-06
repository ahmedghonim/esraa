import React from "react";
import Plus from "@/svg/plus-1.svg";
import Minus from "@/svg/minus.svg";

interface Props {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function ChangeProductCount({ qty, onIncrease, onDecrease }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button className="bg-[#5264583D] p-2" onClick={onDecrease}>
        <Minus />
      </button>

      <span>{qty}</span>

      <button className="bg-primary-100 p-2" onClick={onIncrease}>
        <Plus />
      </button>
    </div>
  );
}
