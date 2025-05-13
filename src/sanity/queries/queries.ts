/** @format */

const toasterFragment = `
"toaster": {
  "title": toasterTitle,
  "description": toasterDescription,
  "buttonText": toasterButtonText,
  "externalUrl": externalToasterLink,
  "internalUrl": internalToasterLink->_id
},`;

const crumbsFragment = `"breadcrumb": {
   "items": [
     select(defined(parent->parent->parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->parent->parent->title,
       "shortTitle": parent->parent->parent->parent->parent->parent->shortTitle,
       "slug": parent->parent->parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->parent->title,
       "shortTitle": parent->parent->parent->parent->parent->shortTitle,
       "slug": parent->parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->title,
       "shortTitle": parent->parent->parent->parent->shortTitle,
       "slug": parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->) => {
       "_id": parent->parent->parent->_id,
       "_type": parent->parent->parent->_type,
       "title": parent->parent->parent->title,
       "shortTitle": parent->parent->parent->shortTitle,
       "slug": parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->) => {
       "_id": parent->parent->_id,
       "_type": parent->parent->_type,
       "title": parent->parent->title,
       "shortTitle": parent->parent->shortTitle,
       "slug": parent->parent->slug.current
     }),
     select(defined(parent) => {
       "_id": parent->_id,
       "_type": parent->_type,
       "title": parent->title,
       "shortTitle": parent->shortTitle,
       "slug": parent->slug.current
     }),
     {
       _id,
       _type,
       title,
       shortTitle,
       "slug": slug.current
     },
   ],
 },`;
const POST_QUERY = `*[_id == $id][0]{
  ${toasterFragment}
  ${crumbsFragment}
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;
// Reading time estimate: https://www.sanity.io/schemas/word-count-and-reading-time-estimation-for-groq-and-portable-text-7470eab7

const CAT_QUERY = `*[_id == $id][0]{
  ${toasterFragment}
  ${crumbsFragment}
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, _updatedAt, authors[]->, popular[]->{
  _id,
  title,
  shortTitle,
  image,
  description,
  authors[]->,
  _updatedAt
}, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const PRODUCT_CAT_QUERY = `*[_id == $id][0]{
  ${toasterFragment}
  ${crumbsFragment}
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, _updatedAt, authors[]->, popularProducts[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const AUTHOR_QUERY = `*[_id == $id][0]{
  ${toasterFragment}
  ${crumbsFragment}
 "posts": *[_type in ["post", "category"] && $id in authors[]._ref]|order(_updatedAt desc)[0..2]{
    parent->,
    _id,
    title,
    description,
    image,
    _updatedAt
  },
 title, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const NAV_QUERY = `
*[_id == 'nav' && name == 'headerNav'][0] {
 ...,
 sections[]{
   ...,
   target->{title, slug, _id, image},
   links[]{
     ...,
     target->{title, slug, _id, image, _updatedAt, image, parent->, authors[]->, description},
   }
 }
}
`;

const LATEST_CATS_QUERY = `*[
  _type in ["category", "productCategory"]
  && defined(slug.current)
]|order(_updatedAt desc)[0...10]{_id, title, shortTitle, image, description}`;

const POSTS_CATS_QUERY = `*[
    _type in ["post", "category", "product", "productCategory", "dogYearCalculator", "insuranceCompanyPage", "insuranceCompanyProductPage", "discountPage", "bestOfPage"]
    && defined(slug.current)
  ]|order(_updatedAt desc)[0...10]{_id, title, shortTitle, slug, _updatedAt, description, image, parent->, authors[]->}`;

const SEARCH_QUERY = `*[
              title match $queryString + '*' ||
              pt::text(body) match $queryString + '*'
          ]|order(_updatedAt desc){_id, title, slug, _updatedAt, description, image, parent->, authors[]->}
  `;

const ALL_PRODUCT_PAGES_QUERY = `*[
  _type in ["product", 'productCategory']
  && defined(slug.current)
  ]|order(_updatedAt desc){_id,parent{_ref},title,shortTitle,slug,description,price,discountedPrice,rating,brand,image,_updatedAt, _type}`;

const PROMOTED_PRODUCTS_QUERY = `*[
    _type in ["product"] && isPromoted == true
    && defined(slug.current)
    ]|order(_updatedAt desc){_id,parent{_ref},title,shortTitle,slug,description,price,discountedPrice,rating,brand,image,_updatedAt, _type}`;

const PRODUCT_QUERY = `*[_id == $id][0]{
    ${toasterFragment}
    ${crumbsFragment}
   title, shortTitle, image, body[]{
   ...,
   markDefs[]{ 
       ..., 
       _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
       },
  },description, "pageType":_type, productImages[], price, discountedPrice, discountCode, ctaUrl,ctaButtonText,discountText,isPromoted, brand, rating, inStock, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;
const INSURANCE_PRODUCT_QUERY = `*[_id == $id][0]{
    ${toasterFragment}
    ${crumbsFragment}
   title, shortTitle, image, body[]{
   ...,
   markDefs[]{ 
       ..., 
       _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
       },
  },description, "pageType":_type,
  cta{
    ctaText,
    ctaUrl
  },
  prosCons{
    pros[],
    cons[]
  },
  companyLogo,
  productRatingMotivation,
  ratingParameters{
    priceAndDeductible,
    compensationAndCoverage,
    limitations,
    service,
    adaptability,
  },
  productOffering[]{
    subProduct{
      subProductTitle,
      subProductDescription,
      subProductOffer[]{
        offer{
          title,
          description,
          value
        }
      }
    }
  },
  productRating, petType, aboutCompany, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const BEST_OF_PAGE = `*[_id == $id][0]{
    ${toasterFragment}
    ${crumbsFragment}
   title, shortTitle, image, body[]{
   ...,
   markDefs[]{ 
       ..., 
       _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
       },
  },description, "pageType":_type,
  comparionsHeadline,
  comparisonTableHeadline,
  bestProduct{
    title,
    text,
    reference->{
      _id,
      image,
      price,
      discountedPrice,
      title,
    },
    pros[],
    ctaUrl{
      url,
      text
    }
  },
  bestProductTableHeaders[]{
    title,
    description
  },
  bestProducts[]{
    title,
    intro,
    reference->{
      _id,
      image,
      companyLogo,
      price,
      discountedPrice,
    },
    text,
    ctaUrl{
      url,
      text
    },
    pros[],
    tableValues[]{
      tableValue,
      tableValueRating
    }
  },
  metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const INSURANCE_COMPANY_QUERY = `*[_id == $id][0]{
    ${toasterFragment}
    ${crumbsFragment}
   title, shortTitle, image, body[]{
   ...,
   markDefs[]{ 
       ..., 
       _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
       },
  },description, "pageType":_type,
  prosCons{
    pros[],
    cons[]
  },
  companyLogo,
  companyCircleLogo,
  companyAbout {
    aboutHeadline,
    aboutDesc[]{
    ...,
    markDefs[]{ 
        ..., 
        _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
        },
    },
  },
  companyRating,
  contactInfo{
    phone,
    contactEmail,
    contactDesc,
    openingHours,
    orgNr,
    address,
  },
  companyProducts[]{
    title,
    description,
    productLink->
  },
  ratingMotivation[]{
    ...,
    markDefs[]{ 
        ..., 
        _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
        },
    },
  ratingParameters{
    customerSatisfaction,
    customerSupport,
    claimsProcess,
    ux,
  },
  metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 )}`;

const PAGES_QUERY = `*[defined(slug.current)
]|order(_updatedAt desc){_id,_updatedAt}`;
const PAGE_META_BY_ID = `
*[_id == $id][0]{
_type,
  "path": "/" + array::join(
    array::compact([
      parent->parent->parent->parent->slug.current,
      parent->parent->parent->slug.current,
      parent->parent->slug.current,
      parent->slug.current,
      slug.current
    ]),
    "/"
)}
`;
const PAGE_META_BY_PATH = `*[
  "/" + array::join(
    array::compact([
      parent->parent->parent->parent->slug.current,
      parent->parent->parent->slug.current,
      parent->parent->slug.current,
      parent->slug.current,
      slug.current
    ]),
    "/"
  ) == $path
][0] {
  _id,
  _type,
  "path": "/" + array::join(
    array::compact([
      parent->parent->parent->parent->slug.current,
      parent->parent->parent->slug.current,
      parent->parent->slug.current,
      parent->slug.current,
      slug.current
    ]),
    "/"
  )
}
`;
const DISCOUNT_PAGE_QUERY = `*[_id == $id][0]{
  ${toasterFragment}
  ${crumbsFragment}
  "discountTable": {
    "columns": discountTable.columns,
    "rows": discountTable.rows[]{
      "cells": cells[]{
        "text": text,
        "url": url
      }
    }
  },
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;
export {
  POST_QUERY,
  NAV_QUERY,
  POSTS_CATS_QUERY,
  SEARCH_QUERY,
  LATEST_CATS_QUERY,
  CAT_QUERY,
  AUTHOR_QUERY,
  ALL_PRODUCT_PAGES_QUERY,
  PRODUCT_CAT_QUERY,
  PRODUCT_QUERY,
  PROMOTED_PRODUCTS_QUERY,
  INSURANCE_PRODUCT_QUERY,
  INSURANCE_COMPANY_QUERY,
  PAGES_QUERY,
  DISCOUNT_PAGE_QUERY,
  PAGE_META_BY_ID,
  PAGE_META_BY_PATH,
  BEST_OF_PAGE,
};
