/** @format */

import {
  IBestProduct,
  ITableHeader,
} from "@/app/[...slug]/_pageTypes/bestOf/bestOf";
import Table from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/table/table";
import BaseTd from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/td/base/baseTd";
import BaseTh from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/th/base/baseTh";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
import Image from "next/image";
import Link from "next/link";
interface IInsuranceComparison {
  headers: ITableHeader[];
  bestProducts: IBestProduct[];
  comparisonTableHeadline: string;
}

export default function InsuranceComparison({
  bestProducts,
  headers,
  comparisonTableHeadline,
}: IInsuranceComparison) {
  return (
    <Table>
      <thead>
        <tr>
          <th
            scope="row"
            className="text-left sticky pl-4 border border-djungleBlack-50 md:text-xl w-[40vw] lg:w-[15vw] left-0 bg-djungleBeige"
          >
            {comparisonTableHeadline}
          </th>
          {bestProducts.map(async ({ title, reference }, i) => {
            const prodImg = sanityImageBuilder(
              reference.companyLogo ? reference.companyLogo : reference.image,
              1200,
              630,
              Boolean(reference.companyLogo)
            );
            const prodData = await tryCatchFetch(
              `${process.env.BASE_URL}/api/page/metaData/id/${reference._id}`
            );
            const prod = await prodData?.json();
            return (
              <th
                scope="col"
                className="text-center w-[70vw] lg:w-[20%] align-top border border-djungleBlack-50 bg-djungleGreen-50 px-8 py-6"
                key={i}
              >
                <div className="flex gap-2 items-center justify-center">
                  <div className="-mb-1">
                    {prodImg && (
                      <Image
                        src={prodImg}
                        width={100}
                        height={100}
                        alt={""}
                        className={`${!reference.companyLogo ? "rounded-lg" : "rounded-none"} mb-2 mx-auto`}
                      />
                    )}
                    <Link
                      href={prod.path}
                      className="underline text-djungleBlue hover:text-djungleBlue/80 duration-200"
                    >
                      {title}
                    </Link>
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {headers.map(({ title, description }, i) => {
          return (
            <tr key={i} className="even:bg-djungleGreen-50/30">
              <BaseTh isSticky title={title} description={description} />
              {bestProducts.map(({ tableValues }, y) => {
                return (
                  <BaseTd key={y}>
                    <div>{tableValues[i].tableValue}</div>
                  </BaseTd>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
