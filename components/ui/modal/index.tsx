"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import clsx from "clsx";
import { EsraButton } from "../esra_button";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  modalTitle: string;
  children: React.ReactNode;
  modalDescription?: string;
  openTrigger?: React.ReactNode | string;
  confirmClassName?: string;
  submitText?: string;
  modalClassName?: string;
  onConfirm?: () => void;
  onOpenChange?: () => void;
}
export function EsraModal({
  openTrigger,
  modalTitle,
  open,
  modalDescription,
  confirmClassName,
  modalClassName,
  submitText = "Submit",
  children,
  onConfirm,
  onOpenChange,
}: Props) {
  const t = useTranslations("common");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button>{openTrigger}</button>
      </DialogTrigger>

      <DialogContent
        className={clsx(
          "sm:max-w-[425px] max-h-[90%] overflow-auto",
          modalClassName
        )}
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>
            <button type="button">{t("close")}</button>
          </DialogClose>
          {onConfirm && (
            <EsraButton
              name={submitText as string}
              className={`py-2 text-center w-[100px] text-white !ms-4 ${confirmClassName}`}
              onClick={onConfirm}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
