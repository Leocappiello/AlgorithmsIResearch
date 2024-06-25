export default class Graph {
    nodes: string[];
    edges: any;
    adjacencyList: Map<string, Map<string, number>>;

    constructor(nodes: string[], edges: any) {
        this.nodes = nodes;
        this.edges = edges;
        this.adjacencyList = new Map();

        // Initialize adjacency list
        for (const node of nodes) {
            this.adjacencyList.set(node, new Map());
        }

        // Populate adjacency list
        for (const edge of edges) {
            this.adjacencyList.get(edge.start)!.set(edge.end, edge.weight);
        }
    }

    getAdjacencyList(): Map<string, Map<string, number>> {
        return this.adjacencyList;
    }
}
