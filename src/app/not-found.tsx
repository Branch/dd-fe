import BaseLink from "@/components/navigation/link/base/baseLink";
import { oswald } from "@/utils/fonts/fonts";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "404: Sidan hittades inte",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  applicationName: process.env.SITENAME,
  publisher: process.env.SITENAME,
  robots:
    !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
      ? "noindex, nofollow"
      : "index, follow",
  openGraph: {
    url: "https://djurdjungeln.se",
    images: [{ url: "/assets/images/share.webp", width: 1200, height: 630 }],
    locale: "sv_SE",
    type: "article",
    siteName: process.env.SITENAME,
    emails: ["kontakt@djurdjungeln.se"],
    countryName: "Sweden",
  },
};
export default function NotFound() {
  return (
    <main className="min-h-screen container mt-12">
      <h1 className={`text-4xl font-bold ${oswald.className}`}>
        404: Sidan kunde inte hittas
      </h1>
      <p className="pt-4 pb-8">
        Sidan hittades inte. Den har antingen tagits bort eller flyttats.
      </p>
      <BaseLink text={"Hem"} url={"/"} />
    </main>
  );
}
