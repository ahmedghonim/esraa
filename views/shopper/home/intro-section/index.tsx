import { getHeroSection } from "@/actions/heroSection";
import parser from "html-react-parser";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/utils/navigation";
export default async function IntroSection() {
  const t = await getTranslations("common");
  const data = (await getHeroSection()) as any;

  return (
    <section className="h-screen w-screen ">
      <video
        autoPlay
        muted
        loop
        className="w-full h-screen absolute end-[0px] start-[0px] md:top-0 -top-8 -z-10 object-cover"
        src={data?.title}
      />
      <div className="flex flex-col items-center mt-[20%] h-full w-full relative z-10">
        <h1 className="text-5xl text-white font-bold text-center">
          {parser(data?.description)}
        </h1>
        <Link className="mt-5" href="/products">
          <Button className=" text-white p-2 rounded-sm">
            {t("shop_now")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
