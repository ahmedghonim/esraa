import React from "react";
import ArrowUp from "@/svg/arrow-top.svg";
import { Link } from "@/utils/navigation";

type Props = {};

export default function ContactData({}: Props) {
  const firstNumber = "(693) 209-8416 x541";

  const secondNumber = "(693) 209-8416 x541";

  const firstEmail = "Taylor_Kreiger52@gmail.com";

  const secondEmail = "Taylor_Kreiger52@gmail.com";

  return (
    <div className="flex gap-5 justify-between items-start mt-12 w-full max-w-[1044px] max-md:mt-10 max-md:max-w-full max-md:flex-col-reverse  max-lg:px-6">
      <div className="flex justify-center items-center px-8 mt-2.5 border border-solid bg-primary-100 border-zinc-600 h-[88px] w-[88px] max-md:px-5">
        <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
          <ArrowUp />
        </button>
      </div>
      <div className="flex gap-5 justify-between items-start px-5 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col self-stretch text-sm leading-5 text-neutral-600">
          <h1 className="text-2xl text-zinc-800">Phone Number</h1>

          <Link href={`tel:${firstNumber}`} className="mt-2">
            {firstNumber}
          </Link>
          <Link href={`tel:${secondNumber}`} className="mt-3">
            {secondNumber}
          </Link>
        </div>
        <div className="flex flex-col text-sm leading-5 whitespace-nowrap text-neutral-600">
          <h1 className="text-2xl text-zinc-800">E-mails</h1>
          <Link href={`mailto:${firstEmail}`} className="mt-2">
            {firstEmail}
          </Link>
          <Link href={`mailto:${secondEmail}`} className="mt-2">
            {secondEmail}
          </Link>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl leading-8 text-zinc-800">Address</h1>
          <address className="mt-2 text-sm leading-5 text-neutral-600">
            33426 Fiona Ports, Feeneyport 63186-7530
          </address>
        </div>
      </div>
    </div>
  );
}
