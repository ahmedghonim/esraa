"use client";
import { onSendOtp, register } from "@/actions/auth";
import { signIn } from "@/auth/helper";
import { EsraButton, EsraLink } from "@/components/ui";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/form-input";
import { useToast } from "@/components/ui/use-toast";
import { Signup, SignupSchema, UserLogin } from "@/schema";
import { useRouter } from "@/utils/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function LogSignUpn() {
  const { toast } = useToast();
  const form = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  });
  const router = useRouter();
  const t = useTranslations("common");
  const [isPending, startTransaction] = useTransition();

  const onSubmit = (values: Signup) => {
    startTransaction(() => {
      register(values).then((res) => {
        toast({
          title: "User registered successfully",
        });
        router.push("/sign-in");
      });
    });
  };

  const sendOtp = () => {
    startTransaction(() => {
      onSendOtp(process.env.NODE_MAILER_EMAIL!).then((res) => {
        toast({
          title: res?.message,
        });
      });
    });
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col text-sm max-md:mt-7 w-full">
        <h1 className="text-4xl font-bold text-zinc-800 max-md:max-w-full mb-6">
          {t("sign-up")} ...
        </h1>
        <EsraButton
          name={t("send-otp")}
          className="font-bold p-3 text-white"
          onClick={() => {
            sendOtp();
          }}
        />
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormInput form={form} name="otp" label={t("otp")} />

            <FormInput form={form} name="fullname" label={t("fullname")} />

            <FormInput form={form} name="email" label={t("email")} />

            <FormInput
              form={form}
              name="password"
              label={t("password")}
              type="password"
            />
            <FormInput
              form={form}
              type="password"
              name="confirmPassword"
              label={t("confirmPassword")}
            />

            <EsraButton
              isLoading={isPending}
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              name={t("sign-up")}
              className="mt-4 text-white py-3"
            />
          </div>
        </Form>

        <div className="mt-4 text-primary-100 max-md:max-w-full">
          <span>Have Account ?</span>
          <EsraLink
            href="/sign-in"
            name={t("sign-in")}
            className="font-bold text-primary-100"
          />
        </div>
      </div>
    </div>
  );
}
