import { EsraButton, EsraInput, EsraLink } from "@/components/ui";
import { Link } from "@/utils/navigation";

import React from "react";

type Props = {};

export default function Login({}: Props) {
  return (
    <div className="flex flex-col ml-5 max-md:ml-0 w-full">
      <div className="flex flex-col text-sm max-md:mt-7 w-full">
        <h1 className="text-4xl font-bold text-zinc-800 max-md:max-w-full mb-6">
          Login ...
        </h1>

        <form className="flex flex-col">
          <EsraInput
            name="phone_number"
            placeholder="Phone Number"
            onChange={() => {}}
            wrapperClassName="mb-6"
          />

          <EsraInput
            name="password"
            type="password"
            placeholder="Password"
            onChange={() => {}}
          />

          <Link href="" className="self-end mt-4 underline text-primary-100">
            Forget Password ?
          </Link>

          <EsraButton
            name="Login"
            className="mt-8 text-white py-3"
            onClick={() => {}}
          />
        </form>

        <div className="mt-4 text-primary-100 max-md:max-w-full">
          <span> Don’t Have Account ?</span>
          <EsraLink
            href=""
            name="Signup"
            className="font-bold text-primary-100"
          />
        </div>
      </div>
    </div>
  );
}
