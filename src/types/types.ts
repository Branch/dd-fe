import { Graph } from "schema-dts";

export interface IAuthor {
  _id: string;
  fullName: string;
  headshot: string;
  slug?: {
    current: string;
  };
}
export interface ILink {
  text: string;
  url: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface ICard {
  _id?: string;
  title: string;
  image: string;
  slug: string;
  description: string;
}

export interface IBaseDocument {
  title: string;
  description: string;
  imgUrl?: string | null;
  authors: IAuthor[];
  categoryPath?: string;
  parentTitle: string;
  readingTime: string;
  updatedAt: string;
  tocHeadings: IHeading[];
  body: any[];
  faq: IFaq[];
  graph: Graph;
}

export interface IToc {
  headings: IHeading[];
  styles?: string;
}
export interface IHeadingChild {
  _type?: string;
  text?: string;
  marks?: string[];
}

export interface IHeading {
  _type: "block";
  style: string;
  _key?: string;
  markDefs: any[];
  children: IHeadingChild[];
}

// not used
export interface IDocument {
  breadcrumb: {
    items: [
      {
        _id: string;
        _type: string;
        title: string;
        slug: string;
      },
    ];
  };
  title: string;
  image?: string;
  body: any[];
  description?: string;
  pageType: string;
  metaTitle: string;
  metaDescription: string;
  parent: any;
  _createdAt: string;
  _updatedAt: string;
  estimatedReadingTime: string;
  headings: any[];
  authors: any[];
  faq?: {
    question: string;
    answer: string;
  }[];
}
