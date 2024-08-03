"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
interface Props {
  openTrigger: React.ReactNode | string;
  alertTitle: string;
  alertDescription: string;
  confirmClassName?: string;
  onAccept: () => void;
  isLoading?: boolean;
}
export function EsraAlertDialog({
  openTrigger,
  alertTitle,
  alertDescription,
  confirmClassName,
  onAccept,
  isLoading,
}: Props) {
  const t = useTranslations("common");
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {isLoading ? <Loader2 /> : openTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className={confirmClassName}>
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
