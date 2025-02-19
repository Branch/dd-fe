/** @format */

import { IAuthor, IFaq } from "@/types/types";
import { Graph } from "schema-dts";

const publisher = {
  "@type": "Organization",
  "@id": `${process.env.BASE_URL}#organization`,
  name: process.env.SITENAME,
  url: process.env.BASE_URL,
  description: "Allt för dig och dina husdjur",
  email: "kontakt@djurdjungeln.se",
  logo: {
    "@type": "ImageObject",
    "@id": `${process.env.BASE_URL}#logo`,
    url: `${process.env.BASE_URL}/assets/images/share.webp`,
    contentUrl: `${process.env.BASE_URL}/assets/images/share.webp`,
    inLanguage: "sv-SE",
    width: "1200",
    height: "630",
  },
  image: {
    "@type": "ImageObject",
    "@id": `${process.env.BASE_URL}#logo`,
    url: `${process.env.BASE_URL}/assets/images/share.webp`,
    contentUrl: `${process.env.BASE_URL}/assets/images/share.webp`,
    inLanguage: "sv-SE",
    width: "1200",
    height: "630",
  },
};
export const websiteData = {
  "@type": "WebSite",
  "@id": `${process.env.BASE_URL}#website`,
  url: process.env.BASE_URL,
  name: process.env.SITENAME,
  inLanguage: "sv-SE",
  isPartOf: `${process.env.BASE_URL}#organization`,
  publisher: publisher,
};

export interface IJsonLdImage {
  url: string;
  width: number;
  height: number;
}

const jsonImgArray = (shareImages: IJsonLdImage[]) => {
  return shareImages?.map((img) => {
    return img?.url
      ? {
          "@type": "ImageObject",
          "@id": `${img.url}#image`,
          url: img.url,
          contentUrl: img.url,
          inLanguage: "sv-SE",
          width: img.width,
          height: img.height,
        }
      : {
          "@type": "ImageObject",
          "@id": `${process.env.BASE_URL}/assets/images/share.webp#image`,
          url: img.url,
          contentUrl: img.url,
          inLanguage: "sv-SE",
          width: img.width,
          height: img.height,
        };
  });
};

export function baseGraph(
  pagePath: string,
  createdAt: string,
  _updatedAt: string,
  headline: string,
  about: string,
  faq: IFaq[],
  authors: IAuthor[],
  shareImage: IJsonLdImage[],
  articleSection?: string,
  breadcrumbs?: any[]
) {
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pagePath}#post`,
        datePublished: createdAt,
        dateCreated: createdAt,
        dateModified: _updatedAt,
        url: pagePath,
        headline: headline,
        image: images,
        about: about,
        subjectOf: {
          "@type": "FAQPage",
          mainEntity: faq?.map((faq: { question: string; answer: string }) => {
            return {
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            };
          }),
        },
        ...(authors?.length > 0
          ? {
              author: authors?.map((a: any) => {
                return {
                  "@type": "Person",
                  name: a.name,
                  url: a.url,
                  worksFor: {
                    "@id": a.worksFor,
                  },
                  knowsAbout: [
                    {
                      "@type": "Thing",
                      name: "Husdjur",
                      sameAs: [
                        "https://sv.wikipedia.org/wiki/Husdjur",
                        "https://sv.wikipedia.org/wiki/S%C3%A4llskapsdjur",
                      ],
                    },
                    {
                      "@type": "Thing",
                      name: "Katt",
                      sameAs: "https://sv.wikipedia.org/wiki/Katt",
                    },
                    {
                      "@type": "Thing",
                      name: "Hund",
                      sameAs: "https://sv.wikipedia.org/wiki/Hund",
                    },
                    {
                      "@type": "Thing",
                      name: "Djurfoder",
                      sameAs: "https://sv.wikipedia.org/wiki/Djurfoder",
                    },
                    {
                      "@type": "Thing",
                      name: "Veterinär",
                      sameAs: [
                        "https://sv.wikipedia.org/wiki/Veterin%C3%A4r",
                        "https://sv.wikipedia.org/wiki/Veterin%C3%A4rmedicin",
                      ],
                    },
                  ],
                };
              }),
            }
          : null),
        inLanguage: "sv-SE",
        mainEntityOfPage: `${pagePath}#post`,
        ...(articleSection
          ? {
              articleSection: articleSection,
            }
          : null),
        isPartOf: {
          "@type": "WebPage",
          "@id": `${pagePath}#page`,
          url: process.env.BASE_URL,
          name: process.env.SITENAME,
          primaryImageOfPage: images,
          inLanguage: "sv-SE",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs?.map((b: any, i: number) => {
              return {
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Thing",
                  "@id": i !== 0 ? b.fullPath : process.env.BASE_URL,
                  name: i !== 0 ? b.title : process.env.SITENAME,
                },
              };
            }),
          },
          isPartOf: websiteData,
        },
      },
    ],
  };
  return graph;
}
export function aboutGraph(
  pagePath: string,
  createdAt: string,
  _updatedAt: string,
  headline: string,
  about: string,
  faq: IFaq[],
  authors: IAuthor[],
  shareImage: IJsonLdImage[],
  articleSection?: string,
  breadcrumbs?: any[]
) {
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pagePath}#webpage`,
        datePublished: createdAt,
        dateCreated: createdAt,
        dateModified: _updatedAt,
        url: pagePath,
        headline: headline,
        image: images,
        about: about,
        ...(authors?.length > 0
          ? {
              author: authors?.map((a: any) => {
                return {
                  "@type": "Person",
                  name: a.name,
                  url: a.url,
                  worksFor: {
                    "@id": a.worksFor,
                  },
                  knowsAbout: [
                    {
                      "@type": "Thing",
                      name: "Husdjur",
                      sameAs: [
                        "https://sv.wikipedia.org/wiki/Husdjur",
                        "https://sv.wikipedia.org/wiki/S%C3%A4llskapsdjur",
                      ],
                    },
                    {
                      "@type": "Thing",
                      name: "Katt",
                      sameAs: "https://sv.wikipedia.org/wiki/Katt",
                    },
                    {
                      "@type": "Thing",
                      name: "Hund",
                      sameAs: "https://sv.wikipedia.org/wiki/Hund",
                    },
                    {
                      "@type": "Thing",
                      name: "Djurfoder",
                      sameAs: "https://sv.wikipedia.org/wiki/Djurfoder",
                    },
                    {
                      "@type": "Thing",
                      name: "Veterinär",
                      sameAs: [
                        "https://sv.wikipedia.org/wiki/Veterin%C3%A4r",
                        "https://sv.wikipedia.org/wiki/Veterin%C3%A4rmedicin",
                      ],
                    },
                  ],
                };
              }),
            }
          : null),
        inLanguage: "sv-SE",
        mainEntityOfPage: `${pagePath}#post`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${pagePath}#page`,
          url: process.env.BASE_URL,
          name: process.env.SITENAME,
          primaryImageOfPage: images,
          inLanguage: "sv-SE",
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs?.map((b: any, i: number) => {
              return {
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Thing",
                  "@id": i !== 0 ? b.fullPath : process.env.BASE_URL,
                  name: i !== 0 ? b.title : process.env.SITENAME,
                },
              };
            }),
          },
          isPartOf: websiteData,
        },
      },
    ],
  };
  return graph;
}

export function authorGraph(
  pagePath: string,
  headline: string,
  authors: IAuthor[],
  shareImage: IJsonLdImage[],
  breadcrumbs?: any[]
) {
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${pagePath}#person`,
        url: pagePath,
        name: headline,
        worksFor: {
          "@id": `${process.env.BASE_URL}#organization`,
        },
        image: images,
        mainEntityOfPage: {
          "@type": "ProfilePage",
          "@id": `${pagePath}#webpage`,
          url: pagePath,
          name: headline,
          inLanguage: "sv-SE",
          isPartOf: {
            "@type": "WebPage",
            "@id": `${pagePath}#page`,
            url: process.env.BASE_URL,
            name: process.env.SITENAME,
            primaryImageOfPage: images,
            inLanguage: "sv-SE",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs?.map((b: any, i: number) => {
                return {
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Thing",
                    "@id": i !== 0 ? b.fullPath : process.env.BASE_URL,
                    name: i !== 0 ? b.title : process.env.SITENAME,
                  },
                };
              }),
            },
            isPartOf: websiteData,
          },
        },
      },
    ],
  };
  return graph;
}

export function productGraph(
  pagePath: string,
  createdAt: string,
  _updatedAt: string,
  productName: string,
  headline: string,
  about: string,
  faq: IFaq[],
  authors: IAuthor[],
  shareImage: IJsonLdImage[],
  brand: string,
  productCategory: string,
  price: number,
  isAvailable: boolean,
  rating: number,
  breadcrumbs?: any[]
) {
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pagePath}#product`,
        brand: brand,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount: 1,
        },
        category: productCategory,
        url: pagePath,
        name: productName,
        image: images,
        description: about,
        offers: {
          "@type": "Offer",
          price: price,
          priceCurrency: "SEK",
          availability: isAvailable
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
          url: pagePath,
        },
        subjectOf: {
          "@type": "FAQPage",
          mainEntity: faq?.map((faq: { question: string; answer: string }) => {
            return {
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            };
          }),
          datePublished: createdAt,
          dateCreated: createdAt,
          dateModified: _updatedAt,
          url: pagePath,
          headline: headline,
          image: images,
          about: about,
          ...(authors?.length > 0
            ? {
                author: authors?.map((a: any) => {
                  return {
                    "@type": "Person",
                    name: a.name,
                    url: a.url,
                    worksFor: {
                      "@id": a.worksFor,
                    },
                    knowsAbout: [
                      {
                        "@type": "Thing",
                        name: "Husdjur",
                        sameAs: [
                          "https://sv.wikipedia.org/wiki/Husdjur",
                          "https://sv.wikipedia.org/wiki/S%C3%A4llskapsdjur",
                        ],
                      },
                      {
                        "@type": "Thing",
                        name: "Katt",
                        sameAs: "https://sv.wikipedia.org/wiki/Katt",
                      },
                      {
                        "@type": "Thing",
                        name: "Hund",
                        sameAs: "https://sv.wikipedia.org/wiki/Hund",
                      },
                      {
                        "@type": "Thing",
                        name: "Djurfoder",
                        sameAs: "https://sv.wikipedia.org/wiki/Djurfoder",
                      },
                      {
                        "@type": "Thing",
                        name: "Veterinär",
                        sameAs: [
                          "https://sv.wikipedia.org/wiki/Veterin%C3%A4r",
                          "https://sv.wikipedia.org/wiki/Veterin%C3%A4rmedicin",
                        ],
                      },
                    ],
                  };
                }),
              }
            : null),
          inLanguage: "sv-SE",
          mainEntityOfPage: `${pagePath}#product`,
          isPartOf: {
            "@type": "WebPage",
            "@id": `${pagePath}#page`,
            url: process.env.BASE_URL,
            name: process.env.SITENAME,
            primaryImageOfPage: images,
            inLanguage: "sv-SE",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs?.map((b: any, i: number) => {
                return {
                  "@type": "ListItem",
                  position: i + 1,
                  item: {
                    "@type": "Thing",
                    "@id": i !== 0 ? b.fullPath : process.env.BASE_URL,
                    name: i !== 0 ? b.title : process.env.SITENAME,
                  },
                };
              }),
            },
            isPartOf: websiteData,
          },
        },
      },
    ],
  };
  return graph;
}
