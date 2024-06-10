import EdgeAlgorithm from "./Edge.class";

export default function calculatePrim(nodes: string[], edges: EdgeAlgorithm[]) {
    const mst = []; // El arreglo de aristas del MST
    const visited = new Set(); // Conjunto de nodos visitados
    const edgesQueue = []; // Cola de prioridad (arreglo simple aquí)

    // Inicializar con un nodo arbitrario (aquí el primer nodo del arreglo)
    visited.add(nodes[0]);
    for (let edge of edges) {
        if (edge.start === nodes[0] || edge.end === nodes[0]) {
            edgesQueue.push(edge);
        }
    }

    while (mst.length < nodes.length - 1) {
        // Ordenar las aristas por peso (cola de prioridad)
        edgesQueue.sort((a, b) => a.weight - b.weight);

        // Tomar la arista con el menor peso
        const smallestEdge = edgesQueue.shift();

        // Determinar el nuevo nodo a agregar al MST
        const newNode = visited.has(smallestEdge.start) ? smallestEdge.end : smallestEdge.start;

        if (!visited.has(newNode)) {
            visited.add(newNode);
            mst.push(smallestEdge);

            // Agregar nuevas aristas al conjunto de candidatos
            for (let edge of edges) {
                if ((edge.start === newNode && !visited.has(edge.end)) || 
                    (edge.end === newNode && !visited.has(edge.start))) {
                edgesQueue.push(edge);
                }
            }
        }
    }
    return mst;
}