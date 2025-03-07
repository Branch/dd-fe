/** @format */

import BaseLink from "@/components/navigation/link/base/baseLink";
interface IProductCard {
  title: string;
  description: string;
  pros: string[];
  readMore?: {
    url: string;
    text: string;
  };
  cta: {
    ctaUrl: string;
    ctaText: string;
  };
}
export default function ProductCard({
  title,
  description,
  pros,
  readMore,
  cta,
}: IProductCard) {
  return (
    <div className="bg-white w-full md:w-[300px] border-djungleBlue-50 border shadow-sm p-4 rounded-lg">
      <h2 className={`text-center font-bold text-xl`}>{title}</h2>
      <p className="my-4">{description}</p>
      <ul className="ml-6">
        {pros.map((pro, i) => (
          <li
            key={i}
            className="before:content-['✓'] my-2 flex items-center relative before:absolute before:-left-5 before:text-lg"
          >
            {pro}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 mt-4">
        <BaseLink
          text={cta.ctaText}
          url={cta.ctaUrl}
          rel="noreferrer nofollow sponsored noopener"
        />
        {readMore ? (
          <BaseLink
            text={readMore.text}
            url={readMore.url}
            design="secondary"
          />
        ) : null}
      </div>
    </div>
  );
}
