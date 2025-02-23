/** @format */

import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import { IBaseDocument } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText } from "next-sanity";
import Image from "next/image";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";
import DiscountButton from "@/components/inputs/button/discount/discountButton";
import { ShoppingCart } from "lucide-react";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import BaseCarousel from "@/components/carousel/base/baseCarousel";
interface IProduct extends IBaseDocument {
  ctaUrl?: string;
  ctaButtonText?: string;
  price: number;
  discountPrice?: number;
  discountCode?: string;
  discountText?: string;
  productImages: string[];
  brand: string;
}
export default function ProductType({
  title,
  brand,
  description,
  updatedAt,
  body,
  faq,
  graph,
  price,
  ctaUrl,
  ctaButtonText,
  discountPrice,
  discountCode,
  discountText,
  productImages,
}: IProduct) {
  const sliderImages = productImages?.map((img) => {
    return {
      url: sanityImageBuilder(img, 600, 600) as string,
      alt: title,
    };
  });
  return (
    <article>
      <JsonLd graph={graph} />
      <section className="flex flex-col-reverse md:grid md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <div className="hidden md:block">
            <h1 className={`text-4xl font-bold ${oswald.className}`}>
              {title}
            </h1>
            <div className="text-djungleBlack/60 text-sm uppercase mt-2">
              {brand}
            </div>
            {discountPrice && discountPrice > 0 ? (
              <>
                <div className="text-3xl font-bold mt-4">
                  {discountPrice} kr
                </div>
                <div className="font-bold text-sm">
                  <span className="line-through">{price} kr</span>
                  <span className="text-[#FF0000] ml-2">
                    -{Math.round(((price - discountPrice) / price) * 100)}%
                  </span>
                </div>
              </>
            ) : (
              <div className="text-3xl font-bold mt-4">{price} kr</div>
            )}
          </div>
          <p className="md:mt-4">{description}</p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="bg-djungleGreen flex items-center justify-center gap-2 text-xl !text-white hover:bg-djungleGreen/90 !no-underline px-4 py-2 rounded-md mt-4 text-center mx-auto font-bold"
          >
            {ctaButtonText}
            <ShoppingCart size={18} />
          </a>
          {discountCode ? (
            <Collapsible
              isTitleHeading
              title="Rabattkod"
              styles="bg-transparent border-y mt-4"
              headerItem={
                <div className="relative flex items-center justify-center animate-wiggle">
                  <Image
                    src={"/assets/icons/spark.svg"}
                    alt={""}
                    width={40}
                    height={40}
                    className="w-[25px] md:w-[30px]"
                  />
                  <span className="absolute text-white text-[11px] md:text-[12px] font-bold top-[0px] md:top-[2px]">
                    %
                  </span>
                </div>
              }
              defaultOpen
            >
              <p className="mt-4">{discountText}</p>
              <DiscountButton code={discountCode} />
            </Collapsible>
          ) : null}
          <Collapsible
            isTitleHeading
            wrapperStyles="[&>h3:first-child]:mt-4"
            title="Produktbeskrivning"
            styles={`bg-transparent product-description ${discountCode ? "border-b" : "border-y mt-4"}`}
          >
            {Array.isArray(body) && (
              <PortableText
                value={body}
                components={PageComponents({ updatedAt })}
              />
            )}
          </Collapsible>
        </div>
        <div>
          <div className="md:hidden mb-2">
            <h1 className={`text-4xl font-bold ${oswald.className}`}>
              {title}
            </h1>
            <div className="text-djungleBlack/60 text-sm uppercase mt-2">
              {brand}
            </div>
            {discountPrice && discountPrice > 0 ? (
              <>
                <div className="text-3xl font-bold mt-1">
                  {discountPrice} kr
                </div>
                <div className="font-bold text-sm">
                  <span className="line-through">{price} kr</span>
                  <span className="text-[#FF0000] ml-2">
                    -{Math.round(((price - discountPrice) / price) * 100)}%
                  </span>
                </div>
              </>
            ) : (
              <div className="text-3xl font-bold mt-1">{price} kr</div>
            )}
          </div>
          <BaseCarousel images={sliderImages} />
        </div>
      </section>
      <section>
        <div id="content" className="prose">
          {faq && faq.length > 0 ? (
            <>
              <h2
                className={`${oswald.className} !text-xl`}
                id={faqHeading.toLowerCase().replace(/\s/g, "-")}
              >
                {faqHeading}
              </h2>
              {faq.map(
                (faq: { question: string; answer: string }, i: number) => {
                  return (
                    <Collapsible
                      key={i}
                      title={faq.question}
                      styles="bg-djungleGreen-100/50 rounded-md mb-2 px-4"
                    >
                      <p className="!mb-0 mt-2">{faq.answer}</p>
                    </Collapsible>
                  );
                }
              )}
            </>
          ) : null}
        </div>
      </section>
    </article>
  );
}
