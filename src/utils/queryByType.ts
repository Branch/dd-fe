/** @format */

import {
  AUTHOR_QUERY,
  CAT_QUERY,
  DISCOUNT_PAGE_QUERY,
  INSURANCE_COMPANY_QUERY,
  INSURANCE_PRODUCT_QUERY,
  POST_QUERY,
  PRODUCT_CAT_QUERY,
  PRODUCT_QUERY,
  BEST_OF_PAGE,
} from "@/sanity/queries/queries";

export const getQueryByType = (type: string) => {
  return type === "post"
    ? POST_QUERY
    : type === "category"
      ? CAT_QUERY
      : type === "author"
        ? AUTHOR_QUERY
        : type === "productCategory"
          ? PRODUCT_CAT_QUERY
          : type === "product"
            ? PRODUCT_QUERY
            : type === "insuranceCompanyProductPage"
              ? INSURANCE_PRODUCT_QUERY
              : type === "insuranceCompanyPage"
                ? INSURANCE_COMPANY_QUERY
                : type === "discountPage"
                  ? DISCOUNT_PAGE_QUERY
                  : type === "bestOfPage"
                    ? BEST_OF_PAGE
                    : POST_QUERY;
};
