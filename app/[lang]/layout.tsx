import { NextIntlClientProvider, useMessages } from "next-intl";
import { El_Messiri } from "next/font/google";
import Layout from "@/layout";
import LocalCart from "@/views/shopper/local-cart";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

const cairo_font = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

export async function generateMetadata(
  {
    params: { lang },
  }: {
    params: { lang: string };
  },
  cookieLang: string | undefined
): Promise<Metadata> {
  return {
    title: {
      template: `Esra | %s`,
      default: "Esra",
    },
    // description: t("description"),
    // keywords: t("keywords"),
    authors: [{ name: "esramodestwear" }],
    applicationName: "esramodestwear",
    metadataBase: new URL("https://www.esramodestwear.com"),
    alternates: {
      canonical: `${cookieLang ? "/" + (lang === "en" ? "" : `${lang}`) : ""}`,
      languages: {
        en: "/",
        "en-US": "/",
        "en-au": "/",
        "en-bz": "/",
        "en-ca": "/",
        "en-ie": "/",
        "en-jm": "/",
        "en-nz": "/",
        "en-za": "/",
        "en-tt": "/",
        "en-gb": "/",
        "en-us": "/",
        "ar-AR": "/ar",
        "ar-dz": "/ar",
        "ar-bh": "/ar",
        "ar-eg": "/ar",
        "ar-iq": "/ar",
        "ar-jo": "/ar",
        "ar-kw": "/ar",
        "ar-lb": "/ar",
        "ar-ly": "/ar",
        "ar-ma": "/ar",
        "ar-om": "/ar",
        "ar-qa": "/ar",
        "ar-sa": "/ar",
        "ar-sy": "/ar",
        "ar-tn": "/ar",
        "ar-ae": "/ar",
        "ar-ye": "/ar",
      },
    },

    openGraph: {
      type: "website",
      title: "Esra Modestwear",
      url: `https://www.esramodestwear.com/${lang}`,
      siteName: "esramodestwear",
      images: [
        {
          url: "./logo.jpg",
          width: 800,
          height: 600,
          alt: "esramodestwear",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = useMessages();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo_font.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LocalCart>
            <Layout>
              <NextTopLoader
                height={10}
                color="#526458"
                crawlSpeed={50}
                crawl={true}
                showSpinner={false}
              />
              {children}
              <Toaster />
            </Layout>
          </LocalCart>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
