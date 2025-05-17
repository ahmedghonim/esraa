import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layout";
import LocalCart from "@/views/shopper/local-cart";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { El_Messiri } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const cairo_font = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

type Props = {
  params: {
    lang: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = params;

  return {
    title: {
      template: "%s | Esraa Fashion",
      default: "Esraa Fashion - Elegant Modest Fashion",
    },
    description:
      "Shop the latest modest fashion trends at Esraa Fashion. Elegant dresses, abayas, and more for the modern woman.",
    keywords: [
      "modest fashion",
      "abayas",
      "dresses",
      "islamic clothing",
      "women fashion",
    ],
    openGraph: {
      title: "Esraa Fashion - Elegant Modest Fashion",
      description:
        "Shop the latest modest fashion trends at Esraa Fashion. Elegant dresses, abayas, and more for the modern woman.",
      url: "https://esramodestwear.com",
      siteName: "Esraa Fashion",
      locale: lang,
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Esraa Fashion",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://esramodestwear.com",
      languages: {
        en: "https://esramodestwear.com/en",
        ar: "https://esramodestwear.com/ar",
      },
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
