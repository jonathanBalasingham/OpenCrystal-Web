import { useSigma } from "react-sigma-v2";
import { FC, useEffect } from "react";
import { keyBy, omit } from "lodash";

import { Dataset, FiltersState } from "../types";
import {useSelector} from "react-redux";
import {getType} from "@reduxjs/toolkit";

const GraphDataController: FC<{ dataset: Dataset; filters: FiltersState }> = ({ dataset, filters, children }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  useEffect(() => {
    if (!graph || !dataset) return;

    const clusters = keyBy(dataset.clusters, "key");

    dataset.nodes.forEach((node) => {
      if (!graph.nodes().includes(node.key))
          graph.addNode(node.key, {
            ...node,
            ...omit(clusters[node.cluster], "key"),
          })
        },
    );
    dataset.edges.forEach(([source, target, weight]) => {
      console.log(graph.edges())
      if (!graph.hasEdge(source, target))
        graph.addEdge(source, target, {size: weight})
    });

    // Use degrees as node sizes:
    const scores = graph.nodes().map((node) => graph.getNodeAttribute(node, "score"));
    const minDegree = Math.min(...scores);
    const maxDegree = Math.max(...scores);
    const MIN_NODE_SIZE = 20;
    const MAX_NODE_SIZE = 30;
    graph.forEachNode((node) =>
      graph.setNodeAttribute(
        node,
        "size",
        15
        //((graph.getNodeAttribute(node, "score") - minDegree) / (maxDegree - minDegree)) *
        //  (MAX_NODE_SIZE - MIN_NODE_SIZE) +
        //  MIN_NODE_SIZE,
      ),
    );

    return () => graph.clear();
  }, [graph, dataset]);

  /**
   * Apply filters to graphology:
   */
  useEffect(() => {
    const { clusters } = filters;
    graph.forEachNode((node, { cluster }) =>
      graph.setNodeAttribute(node, "hidden", !clusters[cluster] ),
    );
  }, [graph, filters]);

  return <>{children}</>;
};

export default GraphDataController;
