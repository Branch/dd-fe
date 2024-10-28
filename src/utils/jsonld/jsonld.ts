import page from "@/app/page";
import { IAuthor, IFaq } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { Graph } from "schema-dts";

const publisher = {
  "@type": "Organization",
  "@id": `${process.env.BASE_URL}/#organization`,
  name: process.env.SITE_NAME,
  url: process.env.BASE_URL,
  description: "Allt för dig och dina husdjur",
  email: "kontakt@djurdjungeln.se",
  logo: {
    "@type": "ImageObject",
    "@id": `${process.env.BASE_URL}/#logo`,
    url: `${process.env.BASE_URL}/assets/images/share.webp`,
    contentUrl: `${process.env.BASE_URL}/assets/images/share.webp`,
    inLanguage: "sv-SE",
    width: "1200",
    height: "630",
  },
  image: {
    "@type": "ImageObject",
    "@id": `${process.env.BASE_URL}/#logo`,
    url: `${process.env.BASE_URL}/assets/images/share.webp`,
    contentUrl: `${process.env.BASE_URL}/assets/images/share.webp`,
    inLanguage: "sv-SE",
    width: "1200",
    height: "630",
  },
};
export const websiteData = {
  "@type": "WebSite",
  "@id": `${process.env.BASE_URL}/#website`,
  url: process.env.BASE_URL,
  name: process.env.SITE_NAME,
  inLanguage: "sv-SE",
  isPartOf: `${process.env.BASE_URL}/#organization`,
  publisher: publisher,
};

interface IBaseGraph {
  pagePath: string;
  createdAt: string;
  modifiedAt: string;
  headline: string;
  shareImage: string;
  about: string;
  faq: IFaq[];
  authors: IAuthor[];
  articleSection?: string;
  breadcrumbs?: any[];
}

export function baseGraph(
  pagePath: string,
  createdAt: string,
  modifiedAt: string,
  headline: string,
  about: string,
  faq: IFaq[],
  authors: IAuthor[],
  shareImage?: string | null,
  articleSection?: string,
  breadcrumbs?: any[]
) {
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pagePath}/#post`,
        datePublished: createdAt,
        dateCreated: createdAt,
        dateModified: modifiedAt,
        url: pagePath,
        headline: headline,
        image: {
          "@type": "ImageObject",
          "@id": `${pagePath}/#image`,
          url: shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          contentUrl:
            shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          inLanguage: "sv-SE",
          width: shareImage ? "550" : "1200",
          height: shareImage ? "310" : "630",
        },
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
        mainEntityOfPage: `${pagePath}/#post`,
        ...(articleSection
          ? {
              articleSection: articleSection,
            }
          : null),
        isPartOf: {
          "@type": "WebPage",
          "@id": `${pagePath}/#page`,
          url: process.env.BASE_URL,
          name: process.env.SITE_NAME,
          primaryImageOfPage: {
            "@type": "ImageObject",
            "@id": `${pagePath}/#image`,
            url:
              shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
            contentUrl:
              shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
            inLanguage: "sv-SE",
            width: shareImage ? "550" : "1200",
            height: shareImage ? "310" : "630",
          },
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
                  name: i !== 0 ? b.title : process.env.SITE_NAME,
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
  modifiedAt: string,
  headline: string,
  about: string,
  faq: IFaq[],
  authors: IAuthor[],
  shareImage?: string | null,
  articleSection?: string,
  breadcrumbs?: any[]
) {
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pagePath}/#webpage`,
        datePublished: createdAt,
        dateCreated: createdAt,
        dateModified: modifiedAt,
        url: pagePath,
        headline: headline,
        image: {
          "@type": "ImageObject",
          "@id": `${pagePath}/#image`,
          url: shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          contentUrl:
            shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          inLanguage: "sv-SE",
          width: shareImage ? "550" : "1200",
          height: shareImage ? "310" : "630",
        },
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
        mainEntityOfPage: `${pagePath}/#post`,
        isPartOf: {
          "@type": "WebPage",
          "@id": `${pagePath}/#page`,
          url: process.env.BASE_URL,
          name: process.env.SITE_NAME,
          primaryImageOfPage: {
            "@type": "ImageObject",
            "@id": `${pagePath}/#image`,
            url:
              shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
            contentUrl:
              shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
            inLanguage: "sv-SE",
            width: shareImage ? "550" : "1200",
            height: shareImage ? "310" : "630",
          },
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
                  name: i !== 0 ? b.title : process.env.SITE_NAME,
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
  shareImage?: string | null,
  breadcrumbs?: any[]
) {
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${pagePath}/#person`,
        url: pagePath,
        worksFor: {
          "@id": `${process.env.BASE_URL}/#organization`,
        },
        image: {
          "@type": "ImageObject",
          "@id": `${pagePath}/#image`,
          url: shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          contentUrl:
            shareImage || `${process.env.BASE_URL}/assets/images/share.webp`,
          inLanguage: "sv-SE",
          width: shareImage ? "550" : "1200",
          height: shareImage ? "310" : "630",
        },
        mainEntityOfPage: {
          "@type": "ProfilePage",
          "@id": `${pagePath}/#webpage`,
          url: pagePath,
          name: headline,
          inLanguage: "sv-SE",
          isPartOf: {
            "@type": "WebPage",
            "@id": `${pagePath}/#page`,
            url: process.env.BASE_URL,
            name: process.env.SITE_NAME,
            primaryImageOfPage: {
              "@type": "ImageObject",
              "@id": `${pagePath}/#image`,
              url:
                shareImage ||
                `${process.env.BASE_URL}/assets/images/share.webp`,
              contentUrl:
                shareImage ||
                `${process.env.BASE_URL}/assets/images/share.webp`,
              inLanguage: "sv-SE",
              width: shareImage ? "550" : "1200",
              height: shareImage ? "310" : "630",
            },
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
                    name: i !== 0 ? b.title : process.env.SITE_NAME,
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
