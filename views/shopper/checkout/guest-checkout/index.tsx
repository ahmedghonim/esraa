"use client";

import { CheckoutProgress, EsraButton, EsraInput } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the guest checkout form schema
const guestCheckoutSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  state: z.string().min(2, "State is too short"),
  zipCode: z.string().min(4, "Zip code is too short"),
  country: z.string().min(2, "Country is too short"),
});

type GuestCheckoutFormData = z.infer<typeof guestCheckoutSchema>;

export default function GuestCheckout() {
  const t = useTranslations("common");
  const [step, setStep] = useState<"details" | "shipping" | "payment">(
    "details"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuestCheckoutFormData>({
    resolver: zodResolver(guestCheckoutSchema),
  });

  const onSubmit = async (data: GuestCheckoutFormData) => {
    // Process the form data
    console.log("Guest checkout data:", data);

    // Move to the next step
    if (step === "details") {
      setStep("shipping");
    } else if (step === "shipping") {
      setStep("payment");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-primary-100 mb-6">
        {t("guest_checkout")}
      </h1>

      <CheckoutProgress currentStep={step} className="mb-8" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === "details" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {t("personal_details")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EsraInput
                label={t("first_name")}
                {...register("firstName")}
                error={errors.firstName?.message}
              />

              <EsraInput
                label={t("last_name")}
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EsraInput
                label={t("email")}
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />

              <EsraInput
                label={t("phone")}
                type="tel"
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>
          </>
        )}

        {step === "shipping" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {t("shipping_address")}
            </h2>
            <EsraInput
              label={t("address")}
              {...register("address")}
              error={errors.address?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EsraInput
                label={t("city")}
                {...register("city")}
                error={errors.city?.message}
              />

              <EsraInput
                label={t("state")}
                {...register("state")}
                error={errors.state?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EsraInput
                label={t("zip_code")}
                {...register("zipCode")}
                error={errors.zipCode?.message}
              />

              <EsraInput
                label={t("country")}
                {...register("country")}
                error={errors.country?.message}
              />
            </div>
          </>
        )}

        {step === "payment" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {t("payment_details")}
            </h2>
            <p>{t("payment_method_description")}</p>

            {/* Payment method selection would go here */}
            <div className="mt-8">
              <h3 className="font-semibold mb-2">{t("order_summary")}</h3>
              {/* Order summary would go here */}
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step !== "details" && (
            <EsraButton
              name={t("back")}
              type="button"
              onClick={() =>
                setStep(step === "payment" ? "shipping" : "details")
              }
              className="bg-gray-200 text-primary-100"
            />
          )}

          <EsraButton
            name={step === "payment" ? t("place_order") : t("continue")}
            type="submit"
            isLoading={isSubmitting}
            className="ml-auto"
          />
        </div>
      </form>
    </div>
  );
}
