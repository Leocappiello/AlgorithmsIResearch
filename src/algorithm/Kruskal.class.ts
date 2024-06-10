import EdgeAlgorithm from "./Edge.class";

class DisjointSet {
    constructor(nodes) {
      this.parent = {};
      this.rank = {};
  
      nodes.forEach(node => {
        this.parent[node] = node;
        this.rank[node] = 0;
      });
    }
  
    find(node) {
      if (this.parent[node] !== node) {
        this.parent[node] = this.find(this.parent[node]);
      }
      return this.parent[node];
    }
  
    union(start, end) {
      const root1 = this.find(start);
      const root2 = this.find(end);
  
      if (root1 !== root2) {
        if (this.rank[root1] > this.rank[root2]) {
          this.parent[root2] = root1;
        } else if (this.rank[root1] < this.rank[root2]) {
          this.parent[root1] = root2;
        } else {
          this.parent[root2] = root1;
          this.rank[root1]++;
        }
      }
    }
}

export default function calculateKruskal(nodes: string[], edges: EdgeAlgorithm[]) {
    const mst = [];
    const disjointSet = new DisjointSet(nodes);

    edges.sort((a, b) => a.weight - b.weight);

    for (const edge of edges) {
        if (disjointSet.find(edge.start) !== disjointSet.find(edge.end)) {
        mst.push(edge);
        disjointSet.union(edge.start, edge.end);
        }
    }

    return mst;
}