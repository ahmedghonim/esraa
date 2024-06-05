import React from "react";
import { getSaleSliderById } from "@/actions/slae";
import SayForm from "@/views/forms/say-form";
import { getWhatTheSayById } from "@/actions/whatStay";

async function Page({ params: { id } }: { params: { id: string } }) {
  const values = id === "add" ? {} : ((await getWhatTheSayById(+id)) as any);

  return <SayForm values={values} />;
}

export default Page;
