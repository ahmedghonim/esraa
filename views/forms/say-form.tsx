"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/utils/navigation";
import { Form } from "@/components/ui/form";
import { Text } from "@/components/ui/Text";
import { EsraButton } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import FormEditor from "@/components/ui/form-editor";
import { WhatTheSay, WhatTheSaySchema } from "@/schema";
import { upsertWhatTheSay } from "@/actions/whatStay";
import FormInput from "@/components/ui/form-input";
import UploadImage from "@/components/ui/upload-image";

const SayForm = ({ values }: { values: any }) => {
  const t = useTranslations("common");
  const { toast } = useToast();
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();
  const form = useForm<WhatTheSay>({
    resolver: zodResolver(WhatTheSaySchema),
    defaultValues: {
      id: undefined,
    },
    values,
  });

  const onSubmit = (values: WhatTheSay) => {
    startTransaction(() => {
      upsertWhatTheSay(values)
        .then(() => {
          toast({
            title: "Save successfully",
            description: "What the say saved successfully",
          });
          router.push("/dashboard/say");
          router.refresh();
          form.reset();
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
          });
        });
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <Text variant="h2" className="flex gap-2 items-baseline">
          {values?.name ||
            t("new_", {
              key: t("what_they_say"),
            })}
        </Text>

        <UploadImage
          className="w-full min-h-[350px]"
          label={t("image")}
          name="image"
        />

        <FormInput form={form} label={t("name")} name="name" />

        <FormEditor form={form} label={t("message")} name="message" />

        <EsraButton
          isLoading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          type="submit"
          className="bg-primary-100 text-white p-2 rounded-sm"
          name={t("save")}
        />
      </div>
    </Form>
  );
};

export default SayForm;
