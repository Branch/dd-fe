import { oswald } from "@/utils/fonts/fonts";
import ChatComponent from "@/app/produktguide/chatFeed/chatFeed";
import Image from "next/image";
import Breadcrumbs from "@/components/navigation/breadcrumbs/breadcrumbs";

export async function generateMetadata() {
  return {
    metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
    title: "Produktguide för hund och katt: Fråga vår AI-assistent",
    description:
      "Upptäck produkter för katt och hund med hjälp av vår AI-chatt. Snabbt, enkelt och personligt – få träffsäkra rekommendationer baserade på dina behov. Sök bland över 10 000 produkter från VetZoo, FirstVet och flera andra välkända butiker.",
    applicationName: process.env.SITENAME,
    authors: "Vera Johansson",
    creator: "Vera Johansson",
    publisher: process.env.SITENAME,
    robots:
      !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
        ? "noindex, nofollow"
        : "index, follow",
    alternates: { canonical: "/produktguide" },
    openGraph: {
      url: "/produktguide",
      images: [
        { url: "/assets/images/ai-assistenten.webp", width: 1200, height: 630 },
      ],
      locale: "sv_SE",
      type: "article",
      siteName: process.env.SITENAME,
      emails: ["kontakt@djurdjungeln.se"],
      countryName: "Sweden",
    },
  };
}

export default function ChatPage() {
  const breadcrumbs = [
    { title: "Hem", fullPath: "/" },
    { title: "Produktguide", fullPath: "/produktguide" },
  ];

  return (
    <div className="container relative">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className={`text-4xl mt-4 font-bold ${oswald.className}`}>
        Hitta rätt produkt med vår AI-assistent!
      </h1>
      <p className="mt-4 mb-8">
        Att hitta rätt produkt kan vara tidskrävande – men inte längre.{" "}
        <strong>
          Med vår AI-drivna chatt får du personliga produktrekommendationer på
          bara några sekunder.
        </strong>{" "}
        Oavsett om du letar efter hundgodis, kattselar eller fästingborttagare
        hjälper vår intelligenta chatt dig att fatta smarta beslut baserat på
        dina behov och preferenser.{" "}
        <strong>
          Testa själv – ställ en fråga och upptäck produkter som verkligen
          passar dig och ditt husdjur.
        </strong>
      </p>
      <ChatComponent />
      <div className="bg-white rounded-lg px-4 py-12 mt-8">
        <h2 className={`text-3xl text-center font-bold ${oswald.className}`}>
          Hur tycker du AI-assistenten fungerar?
        </h2>
        <p className="text-center my-4 px-4 lg:px-24">
          Din feedback betyder mycket för oss.{" "}
          <a
            href="https://se.trustpilot.com/review/djurdjungeln.se"
            rel="noopener noreferrer nofollow"
            className="underline text-djungleBlue"
            target="_blank"
          >
            Lämna gärna ett omdöme på Trustpilot
          </a>{" "}
          – eller varför inte{" "}
          <a
            className="underline text-djungleBlue"
            href="mailto:kontakt@djurdjungeln.se"
          >
            skicka ett mejl
          </a>{" "}
          och berätta vad du tycker? Vi svarar oftast redan samma dag.
          <br />
          Stort tack för att du hjälper oss att bli bättre! ❤️
        </p>
        <Image
          src="/assets/images/headshots/vera.png"
          alt="Vera Johansson"
          width={100}
          height={100}
          quality={100}
          className="rounded-full w-20 h-20 mx-auto mt-8"
        />
        <p className="text-center mt-4 italic font-bold">Vera Johansson</p>
      </div>
    </div>
  );
}
