import { Graph } from "schema-dts";

interface IGraph {
  graph: Graph;
}
export default function JsonLd({ graph }: IGraph) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
