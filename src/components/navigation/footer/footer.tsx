"use client";
import FooterList from "@/components/navigation/footer/footerList/footerList";
import { Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-djungleBlack mt-16 text-white py-24 relative">
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
            djurnamn till recensioner och förslag på foder, leksaker och
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
      <div className="text-center text-xs mt-24 absolute left-0 right-0 mx-auto bottom-6">
        © {new Date().getFullYear()} Djurdjungeln
      </div>
    </footer>
  );
};
export default Footer;
