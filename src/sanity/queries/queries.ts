/** @format */

const crumbsFragment = `"breadcrumb": {
   "items": [
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
  ${crumbsFragment}
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, _updatedAt, authors[]->, popular[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const PRODUCT_CAT_QUERY = `*[_id == $id][0]{
  ${crumbsFragment}
 title, shortTitle, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, _updatedAt, authors[]->, popularProducts[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const AUTHOR_QUERY = `*[_id == $id][0]{
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
    _type in ["post", "category", "product", "productCategory", "dogYearCalculator"]
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
  ]|order(_updatedAt desc){_id,parent{_ref},title,shortTitle,slug,description,price,rating,brand,image,_updatedAt, _type}`;

const PRODUCT_QUERY = `*[_id == $id][0]{
    ${crumbsFragment}
   title, shortTitle, image, body[]{
   ...,
   markDefs[]{ 
       ..., 
       _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
       },
  },description, "pageType":_type, price, brand, rating, inStock, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

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
};
