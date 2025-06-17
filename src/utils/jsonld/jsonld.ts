/** @format */

import { IBestProduct } from "@/app/[...slug]/_pageTypes/bestOf/bestOf";
import { IAuthor, IFaq } from "@/types/types";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
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

export async function bestOfGraph(
  pagePath: string,
  headline: string,
  authors: IAuthor[],
  shareImage: IJsonLdImage[],
  recommendedProducts: IBestProduct[],
  faq: IFaq[],
  breadcrumbs?: any[]
) {
  const prods = await Promise.all(
    recommendedProducts?.map(async (product: IBestProduct) => {
      const prodData = await tryCatchFetch(
        `${process.env.BASE_URL}/api/page/metaData/id/${product.reference._id}`
      );
      const prod = await prodData?.json();
      const prodImage = {
        url: sanityImageBuilder(product.reference.image, 1200, 630) as string,
        width: 1200,
        height: 630,
      };
      return {
        ...product,
        url: prod.path,
        image: jsonImgArray([prodImage]),
        rating:
          product.tableValues.reduce(
            (sum, value) => sum + value.tableValueRating,
            0
          ) / product.tableValues.length,
      };
    })
  );
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Guide",
        "@id": `${pagePath}#guide`,
        url: pagePath,
        headline: headline,
        name: headline,
        image: images,
        hasPart: prods?.map((product: any) => {
          return {
            "@type": "Recommendation",
            name: product.title,
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
                    };
                  }),
                }
              : null),
            itemReviewed: {
              "@type": "Product",
              name: product.title,
              image: product.image,
              offers: {
                "@type": "Offer",
                url: `${process.env.BASE_URL}${product.url}`,
                price: product?.reference?.price
                  ? product?.reference?.discountedPrice
                    ? product?.reference?.discountedPrice
                    : product?.reference?.price
                  : 0,
                priceCurrency: "SEK",
                availability: "https://schema.org/InStock",
              },
            },
            reviewBody: product.text,
            reviewRating: {
              "@type": "Rating",
              ratingValue: product.rating.toFixed(1),
              bestRating: 5,
              worstRating: 1,
            },
          };
        }),
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
                };
              }),
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
export function insuranceProductGraph(
  pagePath: string,
  createdAt: string,
  _updatedAt: string,
  headline: string,
  about: string,
  faq: IFaq[],
  pros: string[],
  cons: string[],
  shareImage: IJsonLdImage[],
  reviewText: any[],
  rating: number,
  authors: IAuthor[],
  breadcrumbs?: any[]
) {
  const bodyArrayToText = reviewText
    .map((block: any) => {
      // Extract text from each block's children
      return block?.children?.map((child: any) => child.text).join("");
    })
    .join("\n"); // Optionally join blocks with a newline
  const images = jsonImgArray(shareImage);
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pagePath}#product`,
        category: "Försäkringar",
        name: headline,
        review: {
          "@type": "Review",
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
          isPartOf: {
            "@type": "WebPage",
            "@id": `${pagePath}#product`,
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
          reviewBody: bodyArrayToText,
          reviewRating: {
            "@type": "Rating",
            ratingValue: rating,
            bestRating: 5,
            worstRating: 1,
          },
          positiveNotes: pros,
          negativeNotes: cons,
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
        },
        mainEntityOfPage: `${pagePath}#product`,
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
  sku: string,
  breadcrumbs?: any[],
  gtin13?: string
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
        sku: sku,
        ...(gtin13 ? { gtin13: gtin13 } : {}),
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
          itemCondition: "https://schema.org/NewCondition",
          url: pagePath,
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: price >= 499 ? 0 : 39,
              currency: "SEK",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "SE",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 4,
                unitCode: "DAY",
              },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "SE",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            refundType: "https://schema.org/FullRefund",
            itemCondition: "https://schema.org/NewCondition",
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
            returnLabelSource: "https://schema.org/ReturnLabelInBox",
          },
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
