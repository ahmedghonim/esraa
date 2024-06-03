import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import clsx from "clsx";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function CollapseCard({ title, children, className }: Props) {
  return (
    <Accordion
      type="single"
      collapsible
      className={"w-full"}
      defaultValue={title}
    >
      <AccordionItem value={title}>
        <AccordionTrigger
          className={clsx("w-full border-[1px] no-underline px-2", className)}
        >
          {title}
        </AccordionTrigger>
        <AccordionContent className="p-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
