/** @format */

import {
  IProductOffer,
  IProductOffering,
  ISubProduct,
} from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceProduct";
import Table from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/table/table";
import BaseTd from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/td/base/baseTd";
import BaseTh from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/th/base/baseTh";
import { Shield, ShieldBan, ShieldPlus } from "lucide-react";

interface InsuranceTableProps {
  productOffering: IProductOffering[];
}

export default function InsuranceTable({
  productOffering,
}: InsuranceTableProps) {
  const insuranceProductTiers = productOffering.length > 1;
  // Extract all subProductTitles (assumed to be the same across items)
  const subProducts = productOffering.map((po) => po.subProduct);
  const subProductTitles: { title: string; description: string }[] = Array.from(
    new Map(
      subProducts.map((sp) => [
        sp.subProductTitle,
        { title: sp.subProductTitle, description: sp.subProductDescription },
      ])
    ).values()
  );

  const productOfferTitles: { title: string; description: string }[] =
    Array.from(
      new Map(
        subProducts.flatMap((sp) =>
          sp.subProductOffer.map((o) => [
            o.offer.title, // Key (ensures uniqueness)
            { title: o.offer.title, description: o.offer.description }, // Value
          ])
        )
      ).values()
    );
  return insuranceProductTiers ? (
    <Table>
      <thead>
        <tr>
          <th
            scope="row"
            className="sticky text-left pl-4 border border-djungleBlack-50 md:text-xl w-[23%] md:w-auto left-0 bg-djungleBeige"
          >
            Försäkringsnivå
          </th>
          {subProductTitles.map(({ title, description }, i) => {
            return (
              <th
                scope="col"
                className="text-center align-top border border-djungleBlack-50 bg-djungleGreen-50 px-8 py-6"
                key={i}
              >
                <div className="flex gap-2 items-center justify-center mb-2">
                  <div className="-mb-1">{title}</div>
                  {i === 0 ? (
                    <ShieldBan />
                  ) : i === 1 ? (
                    <Shield />
                  ) : (
                    <ShieldPlus />
                  )}
                </div>
                <div className="font-normal text-sm italic">{description}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {productOfferTitles.map(({ title, description }, i) => {
          return (
            <tr key={i} className="even:bg-djungleGreen-50/30">
              <BaseTh isSticky title={title} description={description} />
              {subProductTitles.map(({ title: subTitle }, y) => {
                // Find matching subProduct
                const subProduct = subProducts.find(
                  (sp) => sp.subProductTitle === subTitle
                );
                // Find matching offer
                const offer = subProduct?.subProductOffer.find(
                  (o) => o.offer.title === title
                );
                return <BaseTd key={y}>{offer?.offer?.value || "-"}</BaseTd>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  ) : (
    <Table>
      <tbody>
        {productOffering.map(({ subProduct }: { subProduct: ISubProduct }) => {
          return subProduct.subProductOffer.map(
            ({ offer }: { offer: IProductOffer }, i: number) => {
              return (
                <tr key={i} className="odd:bg-djungleGreen-50/60">
                  <BaseTh title={offer.title} description={offer.description} />
                  <BaseTd>{offer.value}</BaseTd>
                </tr>
              );
            }
          );
        })}
      </tbody>
    </Table>
  );
}
