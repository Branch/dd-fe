import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/navigation/header/header";
import Footer from "@/components/navigation/footer/footer";
import { client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import dynamic from "next/dynamic";
const CookieConsentCmp = dynamic(
  () => import("@/components/navigation/cookieConsent/cookieConsent"),
  { ssr: false }
);
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Djur djungeln",
  description: "Allt för dig och ditt husdjur.",
};

const NAV_QUERY = `
       *[_id == 'nav' && name == 'headerNav'][0] {
        ...,
        sections[]{
          ...,
          target->{title, slug, _id, image},
          links[]{
            ...,
            target->{title, slug, _id, image, modifiedAt, image, parent->, authors[]->, description},
          }
        }
      }
      `;

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header sections={navSections} />
        {children}
        <Footer />
        <CookieConsentCmp />
      </body>
    </html>
  );
}
