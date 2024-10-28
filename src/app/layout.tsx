import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/navigation/header/header";
import Footer from "@/components/navigation/footer/footer";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import dynamic from "next/dynamic";
import { NAV_QUERY } from "@/sanity/queries/queries";
import { istok } from "@/utils/fonts/fonts";
const CookieConsentCmp = dynamic(
  () => import("@/components/navigation/cookieConsent/cookieConsent"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: process.env.SITE_NAME,
  description: "Allt för dig och dina husdjur",
  applicationName: process.env.SITE_NAME,
  publisher: process.env.SITE_NAME,
  robots:
    !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
      ? "noindex, nofollow"
      : "index, follow",
  alternates: { canonical: "https://djurdjungeln.se" },
  openGraph: {
    url: "https://djurdjungeln.se",
    images: [{ url: "/assets/images/share.webp", width: 1200, height: 630 }],
    locale: "sv_SE",
    type: "article",
    siteName: process.env.SITE_NAME,
    emails: ["kontakt@djurdjungeln.se"],
    countryName: "Sweden",
  },
};

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
      <body className={`${istok.className} overflow-x-clip`}>
        <Header sections={navSections} />
        {children}
        <Footer />
        <CookieConsentCmp />
      </body>
    </html>
  );
}
