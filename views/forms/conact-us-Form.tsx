"use client";
import { createContact } from "@/actions/contact";
import { EsraButton } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import { useToast } from "@/components/ui/use-toast";
import { Contact, ContactSchema } from "@/schema";
import { useRouter } from "@/utils/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

function ConactUsForm() {
  const { toast } = useToast();
  const t = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const form = useForm<Contact>({
    resolver: zodResolver(ContactSchema),
  });
  const onSubmit = async (values: Contact) => {
    startTransaction(() => {
      createContact(values)
        .then(() => {
          toast({
            title: t("success"),
            description: t("Message sent successfully"),
          });
          router.refresh();
          form.reset();
        })
        .catch((error) => {
          toast({
            title: t("error"),
            description: error.message,
          });
        });
    });
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4">
        <FormInput form={form} name="name" label={t("fullname")} />

        <FormInput form={form} name="phone" label={t("phone")} type="tel" />

        <FormTextArea form={form} name="message" label={t("message")} />

        <EsraButton
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="bg-primary-100 text-white p-2 rounded-sm"
          name={t("send")}
        />
      </div>
    </Form>
  );
}

export default ConactUsForm;
