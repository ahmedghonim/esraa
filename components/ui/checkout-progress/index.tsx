"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, CircleDot } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export type CheckoutStep =
  | "cart"
  | "details"
  | "shipping"
  | "payment"
  | "confirmation";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
  className?: string;
}

export function CheckoutProgress({
  currentStep,
  className,
}: CheckoutProgressProps) {
  const t = useTranslations("common");

  const steps: { id: CheckoutStep; label: string }[] = [
    { id: "cart", label: t("cart") },
    { id: "details", label: t("details") },
    { id: "shipping", label: t("shipping") },
    { id: "payment", label: t("payment") },
    { id: "confirmation", label: t("confirmation") },
  ];

  // Find the index of the current step
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2",
                  index < currentStepIndex
                    ? "bg-primary-100 border-primary-100 text-white"
                    : index === currentStepIndex
                    ? "border-primary-100 text-primary-100"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {index < currentStepIndex ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : index === currentStepIndex ? (
                  <CircleDot className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  index <= currentStepIndex
                    ? "text-primary-100"
                    : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2",
                  index < currentStepIndex ? "bg-primary-100" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
