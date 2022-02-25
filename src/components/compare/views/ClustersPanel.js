import React, { useEffect, useMemo, useState } from "react";
import { useSigma } from "react-sigma-v2";
import { sortBy, values, keyBy, mapValues } from "lodash";

import { MdGroupWork } from "react-icons/md";
import Panel from "./Panel";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/all";

const ClustersPanel = ({ clusters, filters, toggleCluster, setClusters }) => {
  const sigma = useSigma();
  const graph = sigma.getGraph();

  const nodesPerCluster = useMemo(() => {
    const index = {};
    graph.forEachNode((_, { cluster }) => (index[cluster] = (index[cluster] || 0) + 1));
    return index;
  }, [graph]);

  const maxNodesPerCluster = useMemo(() => Math.max(...values(nodesPerCluster)), [nodesPerCluster]);
  const visibleClustersCount = useMemo(() => Object.keys(filters.clusters).length, [filters]);

  const [visibleNodesPerCluster, setVisibleNodesPerCluster] = useState(nodesPerCluster);
  useEffect(() => {
    // To ensure the graphology instance has up to data "hidden" values for
    // nodes, we wait for next frame before reindexing. This won't matter in the
    // UX, because of the visible nodes bar width transition.
    requestAnimationFrame(() => {
      const index = {};
      graph.forEachNode((_, { cluster, hidden }) => !hidden && (index[cluster] = (index[cluster] || 0) + 1));
      setVisibleNodesPerCluster(index);
    });
  }, [filters, graph]);

  const sortedClusters = useMemo(
    () => sortBy(clusters, (cluster) => -nodesPerCluster[cluster.key]),
    [clusters, nodesPerCluster],
  );

  return (
    <Panel
      title={
        <>
          <MdGroupWork className="text-muted" /> Clusters
          {visibleClustersCount < clusters.length ? (
            <span className="text-muted text-small">
              {" "}
              ({visibleClustersCount} / {clusters.length})
            </span>
          ) : (
            ""
          )}
        </>
      }
    >
      <p className="buttons">
        <button className="btn" onClick={() => setClusters(mapValues(keyBy(clusters, "key"), () => true))}>
          <AiOutlineCheckCircle /> Check all
        </button>{" "}
        <button className="btn" onClick={() => setClusters({})}>
          <AiOutlineCloseCircle /> Uncheck all
        </button>
      </p>
      <ul>
        {sortedClusters.map((cluster) => {
          const nodesCount = nodesPerCluster[cluster.key];
          const visibleNodesCount = visibleNodesPerCluster[cluster.key] || 0;
          return (
            <li
              className="caption-row"
              key={cluster.key}
              title={`${nodesCount} page${nodesCount > 1 ? "s" : ""}${
                visibleNodesCount !== nodesCount ? ` (only ${visibleNodesCount} visible)` : ""
              }`}
            >
              <input
                type="checkbox"
                checked={filters.clusters[cluster.key] || false}
                onChange={() => toggleCluster(cluster.key)}
                id={`cluster-${cluster.key}`}
              />
              <label htmlFor={`cluster-${cluster.key}`}>
                <span className="circle" style={{ background: cluster.color, borderColor: cluster.color }} />{" "}
                <div className="node-label">
                  <span>{cluster.clusterLabel}</span>
                  <div className="bar" style={{ width: (100 * nodesCount) / maxNodesPerCluster + "%" }}>
                    <div
                      className="inside-bar"
                      style={{
                        width: (100 * visibleNodesCount) / nodesCount + "%",
                      }}
                    />
                  </div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default ClustersPanel;
