export interface NodeData {
  key: string;
  label: string;
  cluster: string;
  x: number;
  y: number;
  tag: string;
}

export interface Cluster {
  key: string;
  color: string;
  clusterLabel: string;
}

export interface Tag {
  key: string;
  image: string;
}

export interface Dataset {
  nodes: NodeData[];
  edges: [string, string, number][];
  clusters: Cluster[];
}

export interface FiltersState {
  clusters: Record<string, boolean>;
}
