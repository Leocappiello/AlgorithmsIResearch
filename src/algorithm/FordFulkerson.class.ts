import Graph from "./Graph.class";


function bfs(residualGraph: Map<string, Map<string, number>>, source: string, sink: string, parent: Map<string, string>): boolean {
    let visited = new Set<string>();
    let queue: string[] = [source];
    visited.add(source);

    while (queue.length > 0) {
        let u = queue.shift()!;

        for (let [v, capacity] of residualGraph.get(u)!) {
            if (!visited.has(v) && capacity > 0) {
                queue.push(v);
                visited.add(v);
                parent.set(v, u);
                if (v === sink) {
                    return true;
                }
            }
        }
    }

    return false;
}

export function fordFulkerson(graph: Graph, source: string, sink: string): number {
    let residualGraph = new Map<string, Map<string, number>>();
    for (let [u, neighbors] of graph.getAdjacencyList()) {
        residualGraph.set(u, new Map(neighbors));
    }

    let parent = new Map<string, string>();
    let maxFlow = 0;

    while (bfs(residualGraph, source, sink, parent)) {
        let pathFlow = Infinity;
        for (let v = sink; v !== source; v = parent.get(v)!) {
            let u = parent.get(v)!;
            pathFlow = Math.min(pathFlow, residualGraph.get(u)!.get(v)!);
        }

        for (let v = sink; v !== source; v = parent.get(v)!) {
            let u = parent.get(v)!;
            residualGraph.get(u)!.set(v, residualGraph.get(u)!.get(v)! - pathFlow);
            if (!residualGraph.get(v)!.has(u)) {
                residualGraph.get(v)!.set(u, 0);
            }
            residualGraph.get(v)!.set(u, residualGraph.get(v)!.get(u)! + pathFlow);
        }

        maxFlow += pathFlow;
    }

    return maxFlow;
}
