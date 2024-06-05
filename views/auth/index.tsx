"use client";
import { signIn } from "@/auth/helper";
import { EsraButton, EsraLink } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { UserLogin, UserLoginSchema } from "@/schema";
import { Link } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function Login({}: Props) {
  const form = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const onSubmit = (values: UserLogin) => {
    startTransaction(() => {
      signIn(values);
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col text-sm max-md:mt-7 w-full">
        <h1 className="text-4xl font-bold text-zinc-800 max-md:max-w-full mb-6">
          {t("login")} ...
        </h1>

        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormInput form={form} name="email" label={t("email")} />
            <FormInput form={form} name="password" label={t("password")} />

            {/* <Link
              href="/forget_password"
              className="self-end mt-4 underline text-primary-100"
            >
              Forget Password ?
            </Link> */}

            <EsraButton
              isLoading={isPending}
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              name={t("login")}
              className="mt-4 text-white py-3"
            />
          </div>
        </Form>

        <div className="mt-4 text-primary-100 max-md:max-w-full">
          <span> Don’t Have Account ?</span>
          <EsraLink
            href="/sign-up"
            name={t("sign-up")}
            className="font-bold text-primary-100"
          />
        </div>
      </div>
    </div>
  );
}
