import { getOurInfo } from "@/actions/our-info";
import OurInfoForm from "@/views/forms/our-info";

async function HeroSection() {
  const values = (await getOurInfo()) as any;
  return <OurInfoForm values={values} />;
}

export default HeroSection;
