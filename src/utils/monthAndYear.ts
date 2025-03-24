/** @format */

export default function MonthAndYear() {
  return `${new Date().toLocaleDateString("sv-SE", { month: "long", year: "numeric" })}`;
}
