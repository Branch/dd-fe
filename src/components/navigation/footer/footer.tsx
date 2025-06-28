/** @format */

"use client";
import FooterList from "@/components/navigation/footer/footerList/footerList";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-djungleBlack mt-16 text-white py-24 relative">
      <div className="text-center text-sm mb-12 px-4">
        <h2 className="text-lg font-bold">
          Har du testat vår AI-assistent? 🤖
        </h2>
        <p className="mt-2 mb-4">
          Den hjälper dig att hitta rätt produkt för ditt husdjur, baserat på
          din egen produktbeskrivning.
          <br />
        </p>
        <a href="/produktguide" className="underline">
          Testa den här!
        </a>
      </div>
      <div className="grid md:grid-flow-col auto-cols-fr container gap-12">
        <FooterList title={"Länkar"}>
          <li className="text-sm">
            <Link className="underline" href={"/integritetspolicy"}>
              Integritetspolicy
            </Link>
          </li>
          <li className="text-sm">
            <Link className="underline" href={"/cookies"}>
              Hur vi hanterar cookies
            </Link>
          </li>
          <li className="text-sm">
            <a
              href="https://instagram.com/djurdjungeln_sverige"
              rel="noopener noreferrer nofollow"
              className="underline flex gap-2 items-center"
              target="_blank"
            >
              <Instagram />
              <span>Instagram</span>
            </a>
          </li>
          <li className="text-sm">
            <a
              href="https://www.facebook.com/people/Djurdjungeln/61573527694074/"
              rel="noopener noreferrer nofollow"
              className="underline flex gap-2 items-center"
              target="_blank"
            >
              <Facebook />
              <span>Facebook</span>
            </a>
          </li>
          <li className="text-sm">
            <a
              href="https://se.trustpilot.com/review/djurdjungeln.se"
              rel="noopener noreferrer nofollow"
              className="underline flex gap-2 items-center"
              target="_blank"
            >
              <Image
                src={"/assets/icons/trustpilot.svg"}
                alt={""}
                width={40}
                height={40}
                className="w-1/4 md:w-2/3 lg:w-1/3"
              />
            </a>
          </li>
        </FooterList>
        <FooterList title={"Om oss"}>
          <li className="text-sm">
            Djurdjungeln är en oberoende hemsida byggd och underhållen av
            passionerade djurälskare som är dedikerade till att tillhandahålla
            pålitlig, djupgående information. Vi erbjuder allt ifrån tips på
            hundnamn till recensioner och förslag på foder, leksaker och
            tillbehör till dig och dina husdjur.
          </li>
          <li className="text-sm">
            <Link className="underline" href={"/om-djurdjungeln"}>
              Läs mer om Djurdjungeln
            </Link>
          </li>
        </FooterList>
        <FooterList title={"Ägare"}>
          <li className="text-sm">
            Siten ägs och drivs av privatpersoner i hobbysyfte.
          </li>
          <li className="text-sm">
            <a href="mailto:kontakt@djurdjungeln.se" className="underline">
              Maila oss
            </a>
          </li>
        </FooterList>
      </div>
      <div className="text-xs container mt-12 text-center">
        <strong>Disclaimer:</strong> Information och uppgifter på
        djurdjungeln.se ska bara användas i informativt syfte och publiceras
        därför med reservation för eventuella fel. Du som besökare godkänner att
        djurdjungeln.se erhåller ersättning om/när du klickar på länkar och
        annat marknadsföringsmaterial samt blir kund hos våra samarbetspartners.
      </div>
      <div className="text-center text-xs mt-12 absolute left-0 right-0 mx-auto bottom-6">
        © {new Date().getFullYear()} Djurdjungeln
      </div>
    </footer>
  );
};
export default Footer;
