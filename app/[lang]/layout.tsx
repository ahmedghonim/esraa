import { Toaster } from "@/components/ui/toaster";
import Layout from "@/layout";
import LocalCart from "@/views/shopper/local-cart";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { El_Messiri } from "next/font/google";
import Script from "next/script";
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || "https://esramodestwear.com"
    ),
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
      <head>
        {/* Facebook Pixel */}
        <Script
          id="fb-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
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
