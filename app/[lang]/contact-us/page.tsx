import ConactUsForm from "@/views/forms/conact-us-Form";
import React from "react";

import Image from "next/image";
async function ContactUs() {
  return (
    <div className="flex gap-10 w-full max-sm:flex-col items-center justify-center mt-10">
      <div className="flex-1">
        <ConactUsForm />
      </div>
      <div className="flex-1">
        <Image src="/logo.jpg" alt="contact us" width={500} height={500} />
      </div>
    </div>
  );
}

export default ContactUs;
