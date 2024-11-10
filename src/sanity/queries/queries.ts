const POST_QUERY = `*[_id == $id][0]{
  "breadcrumb": {
   "items": [
     select(defined(parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->title,
       "slug": parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->) => {
       "_id": parent->parent->parent->_id,
       "_type": parent->parent->parent->_type,
       "title": parent->parent->parent->title,
       "slug": parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->) => {
       "_id": parent->parent->_id,
       "_type": parent->parent->_type,
       "title": parent->parent->title,
       "slug": parent->parent->slug.current
     }),
     select(defined(parent) => {
       "_id": parent->_id,
       "_type": parent->_type,
       "title": parent->title,
       "slug": parent->slug.current
     }),
     {
       _id,
       _type,
       title,
       "slug": slug.current
     },
   ],
 },
 title, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, modifiedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;
// Reading time estimate: https://www.sanity.io/schemas/word-count-and-reading-time-estimation-for-groq-and-portable-text-7470eab7

const CAT_QUERY = `*[_id == $id][0]{
  "breadcrumb": {
   "items": [
     select(defined(parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->title,
       "slug": parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->) => {
       "_id": parent->parent->parent->_id,
       "_type": parent->parent->parent->_type,
       "title": parent->parent->parent->title,
       "slug": parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->) => {
       "_id": parent->parent->_id,
       "_type": parent->parent->_type,
       "title": parent->parent->title,
       "slug": parent->parent->slug.current
     }),
     select(defined(parent) => {
       "_id": parent->_id,
       "_type": parent->_type,
       "title": parent->title,
       "slug": parent->slug.current
     }),
     {
       _id,
       _type,
       title,
       "slug": slug.current
     },
   ],
 },
 title, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, faq, _createdAt, _updatedAt, modifiedAt, authors[]->, popular[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const AUTHOR_QUERY = `*[_id == $id][0]{
  "breadcrumb": {
   "items": [
     select(defined(parent->parent->parent->parent->) => {
       "_id": parent->parent->parent->parent->_id,
       "_type": parent->parent->parent->parent->_type,
       "title": parent->parent->parent->parent->title,
       "slug": parent->parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->parent->) => {
       "_id": parent->parent->parent->_id,
       "_type": parent->parent->parent->_type,
       "title": parent->parent->parent->title,
       "slug": parent->parent->parent->slug.current
     }),
     select(defined(parent->parent->) => {
       "_id": parent->parent->_id,
       "_type": parent->parent->_type,
       "title": parent->parent->title,
       "slug": parent->parent->slug.current
     }),
     select(defined(parent) => {
       "_id": parent->_id,
       "_type": parent->_type,
       "title": parent->title,
       "slug": parent->slug.current
     }),
     {
       _id,
       _type,
       title,
       "slug": slug.current
     },
   ],
 },
 "posts": *[_type in ["post", "category"] && $id in authors[]._ref]|order(modifiedAt desc)[0..2]{
    parent->,
    _id,
    title,
    description,
    image,
    modifiedAt
  },
 title, image, body[]{
 ...,
 markDefs[]{ 
     ..., 
     _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
     },
},description, "pageType":_type, metaTitle, metaDescription, parent->, _createdAt, _updatedAt, modifiedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;

const NAV_QUERY = `
*[_id == 'nav' && name == 'headerNav'][0] {
 ...,
 sections[]{
   ...,
   target->{title, slug, _id, image},
   links[]{
     ...,
     target->{title, slug, _id, image, modifiedAt, image, parent->, authors[]->, description},
   }
 }
}
`;

const LATEST_CATS_QUERY = `*[
  _type in ["category"]
  && defined(slug.current)
]|order(modifiedAt desc)[0...10]{_id, title, image, description}`;

const POSTS_CATS_QUERY = `*[
    _type in ["post", "category"]
    && defined(slug.current)
  ]|order(modifiedAt desc)[0...10]{_id, title, slug, modifiedAt, description, image, parent->, authors[]->}`;

const SEARCH_QUERY = `*[
          _type in ["post", 'author', 'category']
          && (
              title match $queryString + '*' ||
              pt::text(body) match $queryString + '*'
          )
          ]|order(modifiedAt desc){_id, title, slug, modifiedAt, description, image, parent->, authors[]->}
  `;

const ALL_PAGES_QUERY = `*[defined(slug.current)
]|order(modifiedAt desc){_id,modifiedAt}`;

export {
  POST_QUERY,
  NAV_QUERY,
  POSTS_CATS_QUERY,
  SEARCH_QUERY,
  ALL_PAGES_QUERY,
  LATEST_CATS_QUERY,
  CAT_QUERY,
  AUTHOR_QUERY,
};
