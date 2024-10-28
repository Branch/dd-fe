"use client";
import FooterList from "@/components/navigation/footer/footerList/footerList";
import Link from "next/link";

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
        </FooterList>
        <FooterList title={"Om oss"}>
          <li className="text-sm">
            Djur djungeln är en oberoende hemsida byggd och underhållen av
            passionerade djurälskare som är dedikerade till att tillhandahålla
            pålitlig, djupgående information. Vi erbjuder allt ifrån tips på
            djurnamn till recensioner och förslag på foder, leksaker och
            tillbehör till dig och dina husdjur.
          </li>
          <li className="text-sm">
            <Link className="underline" href={"/om-djurdjungeln"}>
              Läs mer
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
        © {new Date().getFullYear()} Djur djungeln
      </div>
    </footer>
  );
};
export default Footer;
