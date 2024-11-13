import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { PawPrint } from "lucide-react";
import { PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type PageComponent = {
  updatedAt: string;
};

const PageComponents = ({
  updatedAt,
}: PageComponent): PortableTextComponents => {
  // https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/
  return {
    listItem: {
      // Define the LI element
      bullet: ({ children }: any) => (
        <li className="flex items-center gap-2">
          <PawPrint size={14} className="self-start mt-1 min-w-4" />
          <span>{children}</span>
        </li>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <figure>
          <blockquote className="mb-6 mt-16 lg:mb-12 lg:mt-24 relative text-xl rounded-xl shadow-xl bg-white py-16 pb-12 md:py-24 px-8 md:px-14">
            <div className="bg-djungleGreen-100 flex items-center justify-center absolute md:left-12 -top-8 md:-top-12 h-16 w-16 md:h-24 md:w-24 rounded-full">
              <Image
                src={"/assets/icons/quote.svg"}
                alt={""}
                width={40}
                height={40}
                className="w-[25px] md:w-[40px]"
              />
            </div>
            {children}
          </blockquote>
        </figure>
      ),
      h2: ({ children }) => (
        <h2
          className={oswald.className}
          id={children?.toString().toLowerCase().replace(/\s/g, "-")}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => <h3 className={oswald.className}>{children}</h3>,
      h4: ({ children }) => <h4 className={oswald.className}>{children}</h4>,
    },
    types: {
      image: ({ value }) => {
        const image = value.asset;
        const src = sanityImageBuilder(image);
        return src ? (
          <figure className="mb-4">
            <Image
              src={src}
              alt={value.alt || value.caption}
              className=" rounded-md"
              width={767}
              height={433}
            />
            {value.caption && (
              <figcaption className="text-sm italic mt-1 text-djungleBlack/80">
                {value.caption}
              </figcaption>
            )}
          </figure>
        ) : null;
      },
      table: ({ value }) => {
        return (
          <table className="w-full mb-4">
            <tbody>
              {value.rows.map((row: { cells: string[] }, i: number) => {
                return (
                  <tr key={i} className={" odd:bg-djungleGreen-50"}>
                    {row.cells.map((cell, j: number) => {
                      return i === 0 ? (
                        <th className="p-2 text-left" key={j}>
                          {cell}
                        </th>
                      ) : (
                        <td className="p-2 text-left" key={j}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  className="text-djungleBlack-100/70 text-sm"
                  colSpan={value.rows[0].cells.length}
                >
                  Senast uppdaterad:{" "}
                  {new Intl.DateTimeFormat("sv-SE", {
                    dateStyle: "long",
                  }).format(new Date(updatedAt))}
                </td>
              </tr>
            </tfoot>
          </table>
        );
      },
    },
    marks: {
      externalLink: ({ value, children }) => {
        return (
          <a
            href={value.href}
            target={value.openInNewTab ? "_blank" : "_self"}
            rel={
              value.sponsored
                ? "sponsored noopener noreferrer nofollow"
                : "noopener noreferrer nofollow"
            }
          >
            {children}
          </a>
        );
      },
      internalLink: async ({ value, children }) => {
        const refData = await getPostDataById(value.reference._ref);
        return refData?.path ? (
          <Link href={refData?.path}>{children}</Link>
        ) : (
          <span>{children}</span>
        );
      },
    },
  };
};
export default PageComponents;
