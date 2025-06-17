/** @format */

import "./globals.css";
import Header from "@/components/navigation/header/header";
import Footer from "@/components/navigation/footer/footer";
import dynamic from "next/dynamic";
import { istok } from "@/utils/fonts/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
const CookieConsentCmp = dynamic(
  () => import("@/components/navigation/cookieConsent/cookieConsent"),
  { ssr: false }
);
import GlobalPopup from "@/components/popup/GlobalPopup";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navQ = await tryCatchFetch(
    `${process.env.BASE_URL}/api/navigation/header`
  );
  const nav = await navQ?.json();
  let navSections = [];
  if (navQ) {
    navSections = await Promise?.all(
      nav?.sections?.map(async (s: any) => {
        const d = await tryCatchFetch(
          `${process.env.BASE_URL}/api/page/metaData/id/${s.target._id}`
        );
        const data = await d?.json();
        return {
          ...s,
          fullPath: data?.path,
          links: await Promise.all(
            s?.links?.map(async (l: any) => {
              const d = await tryCatchFetch(
                `${process.env.BASE_URL}/api/page/metaData/id/${l.target._id}`
              );
              const data = await d?.json();
              return {
                ...l,
                fullPath: data?.path,
              };
            }) || []
          ),
        };
      })
    );
  }
  return (
    <html lang="sv-SE">
      <GoogleTagManager gtmId="GTM-KGXK3JMC" />
      <body className={`${istok.className} overflow-x-clip`}>
        <Header sections={navSections} />
        {children}
        <Footer />
        <CookieConsentCmp />
        <GlobalPopup />
      </body>
    </html>
  );
}
