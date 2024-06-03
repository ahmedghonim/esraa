import React from "react";
import Header from "../header";
import Image from "next/image";
interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="lg:px-[168px] px-6 py-10">
      <Header />

      <section className="grid grid-cols-12 mt-8">
        <div className="col-span-12 md:col-span-6">
          <Image
            src="/auth-image.png"
            width={400}
            height={652}
            alt="logo pattern"
            className="!h-[652px] w-full"
          />
        </div>
        <div className="col-span-12 md:col-span-6">{children}</div>
      </section>
    </main>
  );
}
