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
} from "@/ui/alert-dialog";

interface Props {
  openTrigger: React.ReactNode | string;
  alertTitle: string;
  alertDescription: string;
  confirmClassName?: string;
  onAccept: () => void;
}
export function EsraAlertDialog({
  openTrigger,
  alertTitle,
  alertDescription,
  confirmClassName,
  onAccept,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{openTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className={confirmClassName}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
