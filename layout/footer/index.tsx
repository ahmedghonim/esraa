import React from "react";
import FooterBar from "./footer-bar";
import NewsSubscribe from "./news-subscribe";
import WhatsAppAndSocialMedia from "./whatsApp-and-social";
import FooterNav from "./footer-nav";
import ContactData from "./contact-data";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="flex flex-col items-center pt-14 bg-neutral-200">
      <div className="w-full max-w-[1045px] max-md:max-w-full max-lg:px-6">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          {/* subscribe to news */}
          <NewsSubscribe />

          <div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
            <div className="flex max-lg:flex-col-reverse flex-col max-md:mt-10 max-md:max-w-full">
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
