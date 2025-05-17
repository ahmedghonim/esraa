import ContactData from "./contact-data";
import FooterBar from "./footer-bar";
import FooterNav from "./footer-nav";
import NewsSubscribe from "./news-subscribe";
import WhatsAppAndSocialMedia from "./whatsApp-and-social";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="flex flex-col items-center pt-8 md:pt-14 bg-neutral-200">
      <div className="w-full max-w-[1045px] max-md:max-w-full px-4 max-lg:px-6">
        <div className="flex gap-5 max-md:flex-col max-md:gap-8">
          {/* subscribe to news */}
          <NewsSubscribe />

          <div className="flex flex-col md:ms-5 w-full md:w-[63%]">
            <div className="flex max-lg:flex-col-reverse flex-col max-xl:mt-6 max-md:max-w-full">
              {/* whatsApp chat + social media */}
              <WhatsAppAndSocialMedia />
              {/* footer nav */}
              <FooterNav />
            </div>
          </div>
        </div>
      </div>
      <ContactData />
      <FooterBar />
    </footer>
  );
}
