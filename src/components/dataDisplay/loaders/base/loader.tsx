/** @format */

import bounce from "./assets/bounce.svg";
import Image from "next/image";
export default function Loader() {
  return <Image width={20} height={20} src={bounce} alt="Loader" />;
}
