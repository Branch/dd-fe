import "./globals.css";
import Header from "@/components/navigation/header/header";
import Footer from "@/components/navigation/footer/footer";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import dynamic from "next/dynamic";
import { NAV_QUERY } from "@/sanity/queries/queries";
import { istok } from "@/utils/fonts/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
const CookieConsentCmp = dynamic(
  () => import("@/components/navigation/cookieConsent/cookieConsent"),
  { ssr: false }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav = await client.fetch<SanityDocument>(NAV_QUERY);
  const navSections = await Promise.all(
    nav.sections.map(async (s: any) => {
      const data = await getPostDataById(s.target._id);
      return {
        ...s,
        fullPath: data?.path,
        links: await Promise.all(
          s?.links?.map(async (l: any) => {
            const data = await getPostDataById(l.target._id);
            return {
              ...l,
              fullPath: data?.path,
            };
          }) || []
        ),
      };
    })
  );
  return (
    <html lang="sv-SE">
      <GoogleTagManager gtmId="GTM-KGXK3JMC" />
      <body className={`${istok.className} overflow-x-clip`}>
        <Header sections={navSections} />
        {children}
        <Footer />
        <CookieConsentCmp />
      </body>
    </html>
  );
}
