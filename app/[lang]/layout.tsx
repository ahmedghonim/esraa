import { NextIntlClientProvider, useMessages } from "next-intl";
import { El_Messiri } from "next/font/google";
import Layout from "@/layout";
import LocalCart from "@/views/shopper/local-cart";
import { Toaster } from "@/components/ui/toaster";

const cairo_font = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

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
          <Layout>
            <LocalCart>
              {children}
              <Toaster />
            </LocalCart>
          </Layout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
